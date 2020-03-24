<template>
  <tr>
    <th scope="row">{{ nota._id }}</th>
    <td>{{ nota.nombre }}</td>
    <td>{{ nota.descripcion }}</td>
    <td>
      <!--      <b-button @click="alerta">Accion</b-button> -->
      <b-button @click="activarEdicion(nota._id)" class="btn-warning btn-sm mx-2">Editar</b-button>
      <b-button @click="eliminarNota(nota._id)" class="btn-danger btn-sm">Eliminar</b-button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["nota"],
  data() {
    return {};
  },
  created() {
    console.log("test");
  },
  methods: {
    eliminarNota(id) {
      console.log(this.nota);
      this.$store.dispatch('deleteNotes', this.nota)
        .then(res => {
          this.mensaje.color = "success";
          this.mensaje.texto = "Nota eliminada";
          this.showAlert();
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  }
};
</script>

<style>
</style>