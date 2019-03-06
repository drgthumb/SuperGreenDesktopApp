export const state = () => ({
  sources: {}, // will move to flatten state later if needed performance wise
})

export const mutations = {
  add_source(state, { id, url }) {
    state.sources = Object.assign({}, state.sources, {
      [id]: {
        id,
        url,
      }
    })
  },
  remove_source(state, { id }) {
    const keys = Object.keys(state.sources).filter((k) => k != id) 
    state.sources = keys.reduce((acc, k) => {acc[k] = state.sources[k]; return acc}, {})
  },
}

export const getters = {
  sources: (state) => (prefix) => {
    const keys = Object.keys(state.sources).filter((k) => k.indexOf(prefix) == 0) 
    return keys.map((k) => state.sources[k])
  },
}
