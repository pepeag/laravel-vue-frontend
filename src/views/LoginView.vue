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
import toastr from 'toastr';
export default {
name: "LoginView",
data() {
    return {
      credentials: {
        email: "pepeag@gmail.com",
        password: "password",
      },
    };
  },
  methods:{
    login(){
      this.$store.dispatch('login',this.credentials)
      .then(res=>{
        console.log(res.data)
        toastr.success(res.data.message,{ fadeAway: 10000 })
        this.$router.push({
          name:'home'
        })
        location.reload()
      }).catch(err=>{
        console.log(err.response.data.message)
        if(!err.response.data.status){
          toastr.error(err.response.data.message)
        }
        for(const[k,v] of Object.entries(err.response.data.errors)){
          toastr.error(v);
          console.log(k);
        }
      })
    }
  }
}
</script>

<style>

</style>