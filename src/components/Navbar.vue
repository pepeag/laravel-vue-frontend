<template>
  <div class="container col-md-10 mx-auto">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand">
          <img src="../assets/logo.png" class="m-25" alt="logo">
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn">
              <router-link class="nav-link" aria-current="page" to="">Post</router-link>
            </li>
            <li class="nav-item" >
              <router-link class="nav-link" aria-current="page" to="/about">About</router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn">
              <router-link class="nav-link" aria-current="page" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn">
              <router-link class="nav-link" aria-current="page" :to="{name:'register'}">Reqister</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn">
              <router-link class="nav-link" aria-current="page" :to="{name:'logout'}">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed:{
  loggedIn(){
    return this.$store.getters.loggedIn
  },
},
};
</script>

<style>
</style>