<template>
  <div class="container">
  <form action="" @submit.prevent="login" class="col-md-6 mx-auto my-3">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" v-model="credentials.email" id="email" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" v-model="credentials.password" id="password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
export default {
name: "LoginView",
data() {
    return {
      credentials: {
        email: "phyo@gmail.com",
        password: "12345678",
      },
    };
  },
  methods:{
    login(){
      this.$store.dispatch('login',this.credentials)
      .then(()=>{
        this.$router.push({
          name:'home'
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>