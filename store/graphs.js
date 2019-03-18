import axios from 'axios'

const storage = {
  sources: JSON.parse(window.localStorage.getItem('graphs') || '{}'),
}

export const state = () => ({
  sources: storage.sources, // will move to flatten state later if needed performance wise
})

const storeState = (state) => {
  window.localStorage.setItem('graphs', JSON.stringify(state.sources))
}

export const mutations = {
  init(state, { id, url }) {
    state.sources = Object.assign({}, state.sources, {
      [id]: Object.assign({metrics: []}, state.sources[id] || {}, {
        url,
        loaded: false,
      })
    })
    storeState(state)
  },
  set_metrics(state, { id, metrics }) {
    state.sources = Object.assign({}, state.sources, {
      [id]: Object.assign({}, state.sources[id], {
        loaded: true,
        metrics,
      })
    })
    storeState(state)
  },
}

export const actions = {
  async load_graph(context, { id, url}) {
    context.commit('init', { id, url })
    const { data: metrics } = await axios.get(url)
    context.commit('set_metrics', {id, metrics: metrics})
  },
}

export const getters = {
  source: (state) => (id) => state.sources[id]
}
