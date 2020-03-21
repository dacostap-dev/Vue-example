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

    <form @submit.prevent="agregarNota()">
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
        <tr v-for="(nota, index) in notas" :key="index">
          <th scope="row">{{ nota._id }}</th>
          <td>{{ nota.nombre }}</td>
          <td>{{ nota.descripcion }}</td>
          <td>
            <b-button @click="alerta">Accion</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notas: [],
      nota: { nombre: "", descripcion: "" },
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  created() {
    this.listarNotas();
  },
  methods: {
    alerta() {
      this.mensaje.color = "success";
      this.mensaje.texto = "Probando alerta";
      this.showAlert();
    },
    listarNotas() {
      this.axios.get("/notas")
        .then(res => {
          console.table(res.data);
          this.notas = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    agregarNota() {
      this.axios.post("/nueva-nota", this.nota)
        .then(res => {
          console.log(res.data)
          this.notas.push(res.data);
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
    countDownChanged(dismissCountDown) { //propio de alert
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() { //propio de alert
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>