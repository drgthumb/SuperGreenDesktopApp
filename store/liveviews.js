/*
 * Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
