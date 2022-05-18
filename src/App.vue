<template>
  <div id="app">
    <navbar></navbar>
   <div class="row">
     <div class="col-md-3 ms-5">
       <div class="col-md-2 ms-5 my-3">
         <a href="" v-if="username" class="btn btn-sm btn-dark text-center ms-5">{{username}}</a>
       </div>
     </div>
   </div>
   <transition name="slide-fade">
    <router-view />
    </transition>
 <footer-component></footer-component>
  </div>
</template>
<script>
import FooterComponent from './components/FooterComponent.vue';
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar, FooterComponent },
  data:()=>({
    username:""
  }),
  mounted(){
    this.getLoginUser();
  },
  methods:{
    getLoginUser(){
      this.$store.dispatch("getLoginUser")
      .then(res=>{
        this.username = res.data.name
      })
    }
  }
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
