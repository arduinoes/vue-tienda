<script setup lang="ts">
import Nav from './components/Nav.vue';
import { usePersistCart } from './composables/usePersistCart';
import { useProductStore } from './stores/products';

const productStore = useProductStore();

productStore.obtenerDatos();

usePersistCart();
</script>

<template>
  <Nav />
  <router-view></router-view>
</template>
