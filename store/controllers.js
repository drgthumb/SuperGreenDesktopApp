import axios from 'axios'
import dummy_config from '../dummy_config.json'

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
    let controller = {
      loaded: false,
      device_name: 'Dummy',
      boxes: [],
      leds: [],
    }
    context.commit('start_search_ap_controller')
    setTimeout(() => {
      context.commit('end_search_ap_controller', controller, null)
      setTimeout(() => {
        controller = Object.assign({}, controller, {loaded: true, mqtt_client_id: 'fd2flkjdf32r_' + parseInt(Math.random()*10000)})
        context.commit('end_search_ap_controller', controller, null)
        context.commit('add_controller', controller)
        context.commit('set_selected', controller.mqtt_client_id)
      }, 3000)
    }, 3000)
  }
}
