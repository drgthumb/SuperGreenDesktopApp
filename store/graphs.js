export const state = () => ({
  sources: {},
})

export const mutations = {
  init(state, id) {
    state.sources = Object.assign({}, state.sources, {
      [id]: {
        loaded: false,
        value: 0,
        values: [],
      }
    })
  },
  set_values(state, { id, values }) {
    state.sources = Object.assign({}, state.sources, {
      [id]: {
        loaded: true,
        value: values.length ? values[values.length-1] : 0,
        values: values,
      }
    })
  },
}

export const actions = {
  load_graph(context, id) {
    context.commit('init', id)
    setTimeout(() => {
      let values = []
      if (id.indexOf('temp') !== -1) {
        values = [21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 25, 25, 25, 24, 24, 23, 24, 25,]
      } else if (id.indexOf('humi') !== -1) {
        values = [65, 65, 65, 63, 62, 60, 60, 60, 56, 56, 56, 56, 56, 54, 52, 51, 51, 51, 51, 51,]
      }
      context.commit('set_values', {id, values})
    }, 3000)
  },
}

export const getters = {
  source: (state) => (id) => state.sources[id]
}