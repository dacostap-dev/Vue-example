import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    notes: [],
    noteSelected: "",
  },
  mutations: {
    NotesList(state, notes){
      state.notes = notes
    },
    NoteDelete(state, note){
      const index = state.notes.findIndex(item => item._id === note._id); //obtenemos el index del elemento que coincide con el que eliminamos
      state.notes.splice(index, 1);
    },
  },
  actions: {
    async getNotes(context) {
      try {
        const res = await axios.get("/notas")
        context.commit('NotesList', res.data)
        console.log(res.data)
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
    async deleteNotes(context, params){
      try {
        const res = await axios
          .delete("/nota/" + params._id)
        context.commit('NoteDelete', res.data._id)
      }
      catch (e) {
        console.log(e.response)
      }
    }
  },
  modules: {
  }
})
