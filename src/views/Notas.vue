<template>
  <div class="container">
    <h1>Notas</h1>

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
          <td>{{ nota.activo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            notas: []
        }
    },
    created(){
        this.listarNotas()
    },
    methods: {
        listarNotas(){
            this.axios.get('/notas')
                .then(res => {
                    console.table(res.data);
                    this.notas = res.data;
                })
                .catch(e => {
                    console.log(e.response);
                })
        }
    }
}
</script>