const storage = {
  sources: JSON.parse(window.localStorage.getItem('liveviews') || '{}'),
}

export const state = () => ({
  sources: storage.sources, // will move to flatten state later if needed performance wise
})

const storeState = (state) => {
  window.localStorage.setItem('liveviews', JSON.stringify(state.sources))
}

export const mutations = {
  add_source(state, { id, url }) {
    state.sources = Object.assign({}, state.sources, {
      [id]: {
        id,
        url,
      }
    })
    storeState(state)
  },
  remove_source(state, { id }) {
    const keys = Object.keys(state.sources).filter((k) => k != id) 
    state.sources = keys.reduce((acc, k) => {acc[k] = state.sources[k]; return acc}, {})
    storeState(state)
  },
}

export const getters = {
  sources: (state) => (prefix) => {
    const keys = Object.keys(state.sources).filter((k) => k.indexOf(prefix) == 0) 
    return keys.map((k) => state.sources[k])
  },
}
