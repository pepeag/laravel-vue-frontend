<template>
  <div class="container col-md-10 mx-auto">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
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
              <router-link class="nav-link" aria-current="page" :class="{active: $route.name==='home'}" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn">
              <router-link class="nav-link" aria-current="page" to="/postlist" :class="{active: $route.name==='postlist'}">Posts</router-link>
            </li>
            <li class="nav-item" v-if="loggedIn">
              <router-link class="nav-link" aria-current="page" to="/userlist" :class="{active: $route.name==='userlist'}">Users</router-link>
            </li>
            <li class="nav-item" >
              <router-link class="nav-link" aria-current="page" to="/about" :class="{active: $route.name==='about'}">About</router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn">
              <router-link class="nav-link" aria-current="page" to="/login" :class="{active: $route.name==='login'}">Login</router-link>
            </li>
            <li class="nav-item" v-if="!loggedIn">
              <router-link class="nav-link" aria-current="page" :to="{name:'register'}" :class="{active: $route.name==='register'}">Register</router-link>
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