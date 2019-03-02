export const state = () => ({
  searching_ap: false,
  search_ap_failed: false,
  found_ap_box: null,
  boxes: [],
})

export const mutations = {
  start_search_ap_box(state) {
    state.searching_ap = true
  },
  end_search_ap_box(state, box, error) {
    state.searching_ap = false
    state.search_ap_failed = !!error 
    state.found_ap_box = box
  },
  add_box(state, box) {
    state.boxes.push(box)
  }
}

export const actions = {
  search_ap_box(context) {
    let box = {
      loaded: false,
      device_name: 'SuperGreenDummy',
    }
    context.commit('start_search_ap_box')
    setTimeout(() => {
      context.commit('end_search_ap_box', box, null)
      setTimeout(() => {
        box = Object.assign({}, box, {loaded: true})
        context.commit('end_search_ap_box', box, null)
        context.commit('add_box', box)
      }, 3000)
    }, 3000)
  }
}
