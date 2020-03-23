import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    NotesList(state, notes){
      state.notes = notes
    },
  },
  actions: {
    async getNotes(context) {
      try {
        const res = await axios.get("/notas")
        context.commit('NotesList', res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    async postNotes(context, params) {
      try {
        const res = await axios.post("/nueva-nota", params)
        this.state.notes.push(res.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
  },
  modules: {
  }
})
