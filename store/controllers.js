import axios from 'axios'
import version_config from '../version_config.json'

const controller_defaults = {
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
    config_key: key,
  }
}

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
    controller_defaults[key.name] = new_loadable_key(key.name)
  }
}

export const state = () => ({
  searching_ap: false,
  search_ap_failed: false,
  found_ap_controller: null,
  controllers: [],
  selected: '',
})

const getById = function(state, id) {
  const controllers = state.controllers
  return controllers.find((c) => c.mqtt_client_id == id)
}

export const getters = {
  getSelected(state) {
    const selected = state.selected
    return getById(state, selected)
  },
}

export const mutations = {
  start_search_ap_controller(state) {
    state.searching_ap = true
  },
  end_search_ap_controller(state, controller, error) {
    state.searching_ap = false
    state.search_ap_failed = !!error 
    state.found_ap_controller = controller
  },
  add_controller(state, controller) {
    state.controllers.push(controller)
  },
  set_selected(state, id) {
    state.selected = id
  },
}

export const actions = {
  search_ap_controller(context) {
    let controller = Object.assign({}, controller_defaults)
    context.commit('start_search_ap_controller')
    setTimeout(() => {
      controller.device_name.value = 'Office'
      controller.device_name.loaded = true
      context.commit('end_search_ap_controller', controller, null)
      setTimeout(() => {
        controller = Object.assign({}, controller, {loaded: true})
        context.commit('end_search_ap_controller', controller, null)
        context.commit('add_controller', controller)
        context.commit('set_selected', controller.mqtt_client_id)
      }, 3000)
    }, 3000)
  }
}
