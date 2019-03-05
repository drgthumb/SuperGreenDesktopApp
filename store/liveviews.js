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
}

export const getters = {
  sources: (state) => (prefix) => Object.values(state.sources).filter((s) => s.id.indexOf(prefix) == 0),
}
