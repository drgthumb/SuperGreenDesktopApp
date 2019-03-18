const defaultState = {
  first_start: true,
}
const storage = JSON.parse(window.localStorage.getItem('app') || JSON.stringify(defaultState))

export const state = () => Object.assign({}, storage)

const storeState = (state) => {
  return window.localStorage.setItem('app', JSON.stringify(state))
}

export const mutations = {
  first_start(state) {
    state.first_start = false
    storeState(state)
  },
}
