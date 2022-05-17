<template>
  <div id="app">
    <navbar></navbar>
   <div class="row">
     <div class="col-md-3">
       <div class="col-md-2 ms-5 my-3">
         <a href="" v-if="username" class="btn btn-sm btn-dark text-center ms-5">{{username}}</a>
       </div>
     </div>
   </div>
    <router-view />
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
</style>
