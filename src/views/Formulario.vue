<script setup lang="ts">
import BaseInput from "../components/formulario/BaseInput.vue"
import { onMounted } from 'vue';
import { memoria } from '../stores/formulario'

const datos = memoria()

onMounted(() => {
  datos.obtenerDatos()
})
</script>

<template>
  <div>
    <Navbar/>
  <div class="container my-4">
  <form>
    <BaseInput
      v-model="datos.producto.title"
      type="text"
      label="Producto"
    />
    <BaseInput
      v-model="datos.producto.price"
      type="text"
      label="Precio"
    />
    <BaseInput
      v-model="datos.producto.description"
      type="text"
      label="Descripción"
    />
    <BaseInput
      v-model="datos.producto.image"
      type="text"
      label="Imagen"
    />
    <div class="input-group my-3">
      <input type="file" @change="datos.buscarImagen($event)">
    </div>

      <div class="mt-3">  
    <button v-show="datos.editar === true" 
      @click.prevent="datos.actualizarDato(id)" 
      class="btn btn-primary">
      Actualizar
    </button>
    <button v-show="datos.editar === false" 
      @click.prevent="datos.agregarDato()" 
      class="btn btn-primary">
      Guardar
    </button>
    <div class="mt-4">
      <img :src="datos.datoImagen">
    </div>

    </div>
  </form>
  </div>
<!-- ////////// tabla ////////// -->
  <table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Editar</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in datos.productos" :key="index">
        <th scope="row">{{index}}</th>
        <td>{{item.title}}</td>
        <td>{{item.price}}</td> 
        <td>
          <button @click.prevent="datos.obtenerDatoID( item.id );this.datos.editar = !this.datos.editar;" 
            class="btn btn-primary">Editar
          </button>
        </td>

        <td>
          <button @click.prevent="datos.eliminarDato(item.id)" 
            class="btn btn-danger">Eliminar
          </button>
      </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

