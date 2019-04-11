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
    await new Promise((r) => setTimeout(r, 500))
    const { data: metrics } = await axios.get(url)
    context.commit('set_metrics', {id, metrics: metrics})
  },
}

export const getters = {
  source: (state) => (id) => state.sources[id]
}
