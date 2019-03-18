import axios from 'axios'
import version_config from '../version_config.json'

const controller_defaults = {
  discovery_url: '',
  loaded: false,
  i2c: [],
  leds: [],
  boxes: [],
}

const new_loadable_key = function(key) {
  const def = key.integer ? (key.default || 0) : key.default || ''
  return {
    value: def,
    loaded: false,
    loading: false,
    config_key: key,
  }
}

const schedule_promise = (n) => {
  let loading_param_promise = Promise.resolve(),
      promises = []
  return function(req_func) {
    let resolve, reject
    const p = new Promise((res, rej) => {resolve = res; reject = rej})
    loading_param_promise.then(async () => {
      try {
        resolve(await req_func())
      } catch(e) {
        reject(e)
      }
    })
    promises.push(p)
    if (promises.length >= n) {
      loading_param_promise = Promise.all(promises)
      promises = []
    }

    return p
  }
}

const controller_chain = schedule_promise(3)

for (let i in version_config.keys) {
  const key = version_config.keys[i]
  if (key.led) {
    if (!controller_defaults.leds[key.led.index]) {
      controller_defaults.leds[key.led.index] = {}
    }
    controller_defaults.leds[key.led.index][key.led.param] = new_loadable_key(key)
  } else if (key.box) {
    if (!controller_defaults.boxes[key.box.index]) {
      controller_defaults.boxes[key.box.index] = {}
    }
    controller_defaults.boxes[key.box.index][key.box.param] = new_loadable_key(key)
  } else if (key.i2c) {
    if (!controller_defaults.i2c[key.i2c.index]) {
      controller_defaults.i2c[key.i2c.index] = {}
    }
    controller_defaults.i2c[key.i2c.index][key.i2c.param] = new_loadable_key(key)
  } else {
    controller_defaults[key.name] = new_loadable_key(key)
  }
}

export const state = () => ({
  searching_ap: false,
  search_ap_is_sta: false,
  search_ap_failed: false,
  search_ap_failed_reason: null,
  search_ap_url: '192.168.4.1',
  search_n_tries: 0,
  found_ap_controller: null,
  controllers: [],
  selected: '',
})

const getById = function(state, id) {
  const controllers = state.controllers
  return controllers.find((c) => c.broker_clientid.value == id)
}

const setById = function(state, id, controller) {
  const i = state.controllers.findIndex((c) => c.broker_clientid.value == id)
  state.controllers = Object.assign([], state.controllers, { [i]: controller }) // TODO is this useful ? i think not..
}

export const getters = {
  getById: (state) => (id) => getById(state, id),
  getSelected(state) {
    const selected = state.selected
    return getById(state, selected)
  },
}

export const mutations = {
  configure_search_ap_controller(state, { url, is_sta }) {
    state.search_ap_url = url
    state.search_ap_is_sta = is_sta
  },
  start_search_ap_controller(state) {
    state.searching_ap = true
    state.search_n_tries = 0
  },
  end_search_ap_controller(state, { controller, error }) {
    state.searching_ap = false
    state.found_ap_controller = controller
    state.search_ap_failed = !!error 
    state.search_ap_failed_reason = error 
  },
  search_try(state) {
    state.search_n_tries++
  },
  add_controller(state, controller) {
    state.controllers.push(controller)
  },
  set_selected(state, id) {
    state.selected = id
  },
  set_loaded(state, id) {
    let controller = getById(state, id)
    controller.loaded = true
    setById(state, id, controller)
  },
  loading_controller_param(state, { id, key }) {
    let controller = getById(state, id)
    controller[key] = Object.assign({}, controller[key], {loading: true})
    setById(state, id, controller)
  },
  loading_box_param(state, { id, i, key }) {
    let controller = getById(state, id)
    controller.boxes[i][key] = Object.assign({}, controller.boxes[i][key], {loading: true})
    setById(state, id, controller)
  },
  loading_led_param(state, { id, i, key }) {
    let controller = getById(state, id)
    controller.leds[i][key] = Object.assign({}, controller.leds[i][key], {loading: true})
    setById(state, id, controller)
  },
  loading_i2c_param(state, { id, i, key }) {
    let controller = getById(state, id)
    controller.i2c[i][key] = Object.assign({}, controller.i2c[i][key], {loading: true})
    setById(state, id, controller)
  },
  loaded_controller_param(state, { id, key, value }) {
    let controller = getById(state, id)
    controller[key] = Object.assign({}, controller[key], {value, loaded: true, loading: false})
    setById(state, id, controller)
  },
  loaded_box_param(state, { id, i, key, value }) {
    let controller = getById(state, id)
    controller.boxes[i][key] = Object.assign({}, controller.boxes[i][key], {value, loaded: true, loading: false})
    setById(state, id, controller)
  },
  loaded_led_param(state, { id, i, key, value }) {
    let controller = getById(state, id)
    controller.leds[i][key] = Object.assign({}, controller.leds[i][key], {value, loaded: true, loading: false})
    setById(state, id, controller)
  },
  loaded_i2c_param(state, { id, i, key, value }) {
    let controller = getById(state, id)
    controller.i2c[i][key] = Object.assign({}, controller.i2c[i][key], {value, loaded: true, loading: false})
    setById(state, id, controller)
  },
}

const wait_for_controller = async function (url, onTry) {
  for (let i = 0; i < 5; ++i) {
    onTry()
    try {
      const { data: name } = await axios.get(`http://${url}/s?k=DEVICE_NAME`, {timeout: 5000})
      return name
    } catch(e) {
      console.log(e)
    }
  }
  return false
}

export const actions = {
  // find controller at 192.168.4.1 and load device_name + broker_clientid
  async search_ap_controller(context) {
    let name, url = context.state.search_ap_url;
    context.commit('start_search_ap_controller')
    if ((name = await wait_for_controller(url, () => context.commit('search_try'))) == false) {
      context.commit('end_search_ap_controller', {controller: null, error: 'No controller found'})
      return
    }
    let controller = Object.assign({}, controller_defaults, {
      discovery_url: url,
      device_name: Object.assign({}, controller_defaults.device_name, {value: name, loaded: true}),
    })
    context.commit('end_search_ap_controller', {controller, error: null})
    setTimeout(async () => {
      const { data: broker_clientid } = await controller_chain(async () => axios.get(`http://${url}/s?k=BROKER_CLIENTID`, {timeout: 5000})),
            { data: state } = await controller_chain(async () => axios.get(`http://${url}/i?k=STATE`, {timeout: 5000}))
      controller = Object.assign({}, controller, {
        loaded: true,
        broker_clientid: Object.assign({}, controller.broker_clientid, {
          value: broker_clientid, loaded: true
        }),
        state: Object.assign({}, controller.state, {
          value: state, loaded: true
        }),
      })
      context.commit('add_controller', controller)
      context.commit('set_selected', broker_clientid)
      context.commit('set_loaded', broker_clientid)
      context.commit('end_search_ap_controller', {controller, error: null})
    }, 500)
  },
  async load_controller_param(context, { id, key }) {
    const controller = getById(context.state, id),
          config = controller[key].config_key
    context.commit('loading_controller_param', {id, key})
    const { data: value } = await controller_chain(async () => axios.get(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=${key.toUpperCase()}`, {timeout: 5000}))
    context.commit('loaded_controller_param', {id, key, value: config.integer ? parseInt(value) : value})
  },
  async load_box_param(context, { id, i, key }) {
    const controller = getById(context.state, id),
          config = controller.boxes[i][key].config_key
    context.commit('loading_box_param', {id, i, key})
    const { data: value } = await controller_chain(async () => axios.get(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=BOX_${i}_${key.toUpperCase()}`, {timeout: 5000}))
    context.commit('loaded_box_param', {id, i, key, value: config.integer ? parseInt(value) : value})
  },
  async load_led_param(context, { id, i, key }) {
    const controller = getById(context.state, id),
          config = controller.leds[i][key].config_key
    context.commit('loading_led_param', {id, i, key})
    const { data: value } = await controller_chain(async () => axios.get(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=LED_${i}_${key.toUpperCase()}`, {timeout: 5000}))
    context.commit('loaded_led_param', {id, i, key, value: config.integer ? parseInt(value) : value})
  },
  async load_i2c_param(context, { id, i, key }) {
    let controller = getById(context.state, id),
      config = controller.i2c[i][key].config_key
    context.commit('loading_i2c_param', id, i, key)
    const { data: value } = await controller_chain(async () => axios.get(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=I2C_${i}_${key.toUpperCase()}`, {timeout: 5000}))
    context.commit('loaded_i2c_param', {id, i, key, value: config.integer ? parseInt(value) : value})
  },
  async set_controller_param(context, { id, key, value }) {
    const controller = getById(context.state, id),
          config = controller[key].config_key
    context.commit('loading_controller_param', {id, key})
    await controller_chain(async () => await axios.post(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=${key.toUpperCase()}&v=${value}`, {timeout: 5000}))
    await context.dispatch('load_controller_param', {id, key})
  },
  async set_box_param(context, { id, i, key, value }) {
    const controller = getById(context.state, id),
          config = controller.boxes[i][key].config_key
    context.commit('loading_box_param', {id, i, key})
    await controller_chain(async () => await axios.post(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=BOX_${i}_${key.toUpperCase()}&v=${value}`, {timeout: 5000}))
    await context.dispatch('load_box_param', {id, i, key})
  },
  async set_led_param(context, { id, i, key, value }) {
    const controller = getById(context.state, id),
          config = controller.leds[i][key].config_key
    context.commit('loading_led_param', {id, i, key})
    await controller_chain(async () => await axios.post(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=LED_${i}_${key.toUpperCase()}&v=${value}`, {timeout: 5000}))
    await context.dispatch('load_led_param', {id, i, key})
  },
  async set_i2c_param(context, { id, i, key }) {
    let controller = getById(context.state, id),
        config = controller.i2c[i][key].config_key
    context.commit('loading_i2c_param', id, i, key)
    await controller_chain(async () => await axios.post(`http://${controller.discovery_url}/${config.integer ? 'i' : 's'}?k=I2C_${i}_${key.toUpperCase()}&v=${value}`, {timeout: 5000}))
    await context.dispatch('load_i2c_param', {id, i, key})
  },
}
