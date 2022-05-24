<template>
  <div id="app">
    <navbar></navbar>
    <login-user></login-user>
   <transition name="slide-fade">
    <router-view />
    </transition>
 <footer-component></footer-component>
  </div>
</template>
<script>
import FooterComponent from './components/FooterComponent.vue';
import LoginUser from './components/LoginUser.vue';
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar, FooterComponent, LoginUser },
  data:() => ({
    token:""
  })
  
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.8s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
