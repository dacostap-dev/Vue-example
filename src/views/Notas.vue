<template>
  <div class="container">
    <h1>Notas</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{mensaje.texto}}</b-alert>

    <form @submit.prevent="editarNota(notaEditar)" v-if="editar">
      <h3>Editar Nota</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="notaEditar.nombre" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Descripcion"
        v-model="notaEditar.descripcion"
      />
      <b-button class="btn-warning my-2 btn-block" type="submit">Editar</b-button>
      <b-button class="my-2 btn-block" @click="editar = false">Cancelar</b-button>
    </form>

    <form @submit.prevent="agregarNota()" v-if="!editar">
      <h3>Agregar nueva nota</h3>
      <input type="text" class="form-control my-2" placeholder="Nombre" v-model="nota.nombre" />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Descripcion"
        v-model="nota.descripcion"
      />
      <b-button class="btn-success my-2 btn-block" type="submit">Agregar</b-button>
    </form>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nota, index) in notes" :key="index">
          <th scope="row">{{ nota._id }}</th>
          <td>{{ nota.nombre }}</td>
          <td>{{ nota.descripcion }}</td>
          <td>
       <!--      <b-button @click="alerta">Accion</b-button> -->
            <b-button @click="activarEdicion(nota._id)" class="btn-warning btn-sm mx-2">Editar</b-button>
            <b-button @click="eliminarNota(nota._id)" class="btn-danger btn-sm">Eliminar</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      notas: [],
      nota: { nombre: "", descripcion: "" },
      notaEditar: {_id: "", nombre: "", descripcion: ""},
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
      editar : false,
    };
  },
  created(){ // en mejor que mounted para cargar desde api
    this.$store.dispatch('getNotes')
  },
  computed:{
       ...mapState(['notes']),
  },
  methods: {
    alerta() {
      this.mensaje.color = "success";
      this.mensaje.texto = "Probando alerta";
      this.showAlert();
    },
    agregarNota() {
      this.$store.dispatch('postNotes', this.nota)
        .then(res => {
          this.nota.nombre = "";
          this.nota.descripcion = "";
          this.mensaje.color = "success";
          this.mensaje.texto = "Nota agregada";
          this.showAlert()
        })
        .catch(e => {
          console.log(e.response);
          this.mensaje.color = "danger";
          this.mensaje.texto = e.response.data.mensaje;
          this.showAlert()
        });
    },
    activarEdicion(id){
      this.editar = true;
      console.log(id)
      this.axios.put('/nota/'+id)
      .then(res => {
        console.log(res)
        this.notaEditar._id = res.data._id;
        this.notaEditar.nombre = res.data.nombre;
        this.notaEditar.descripcion = res.data.descripcion;
      }).catch(e => {
        console.log(e.response)
      })
    },
    editarNota(nota){
      this.axios.put('/nota/'+ nota._id, nota)
        .then(res => {
          const index = this.notas.findIndex(n => n._id == res.data._id);
          this.notas[index].nombre = res.data.nombre;
          this.notas[index].descripcion = res.data.descripcion;
          this.mensaje.color = "success";
          this.mensaje.texto = "Nota actualizada";
          this.showAlert();
          this.editar = false;
        })
        .catch(e => {
          console.log(e.response)
        })
    },
    eliminarNota(id){
      console.log(id)
      this.axios.delete('/nota/'+ id).
        then(res => {
          const index = this.notas.findIndex(item => item._id === res.data._id) //obtenemos el index del elemento que coincide con el que eliminamos
          this.notas.splice(index, 1)
          this.mensaje.color = "success";
          this.mensaje.texto = "Nota eliminada";
          this.showAlert()
        })
        .catch(e => {
          console.log(e.response)
        })
    },
    countDownChanged(dismissCountDown) { //propio de alert
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() { //propio de alert
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>