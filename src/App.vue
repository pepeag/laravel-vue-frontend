<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
 <footer-component></footer-component>
  </div>
</template>
<script>
import FooterComponent from './components/FooterComponent.vue';
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar, FooterComponent },
};
</script>
<style>
</style>
