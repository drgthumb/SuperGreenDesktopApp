const getBool = (key, def) => {
  const v = window.localStorage.getItem(key)
  console.log(key, v, def)
  if (typeof v === 'undefined' || v === null) {
    window.localStorage.setItem(key, def)
    return def
  }
  return v == 'true'
}

export const state = () => ({
  first_start: getBool('first_start', true),
})

export const mutations = {
  first_start(state) {
    window.localStorage.setItem('first_start', false)
    state.first_start = false
  },
}
