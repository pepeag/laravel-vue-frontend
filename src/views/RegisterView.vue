<template>
 <div class="container">
  <form action="" @submit.prevent="register" class="col-md-6 mx-auto my-3">
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" v-model="formData.name" id="name" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" v-model="formData.email" id="email" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" v-model="formData.password" id="password">
  </div>
  <button type="submit" class="btn btn-primary">Register</button>
</form>
  </div>
</template>

<script>
import toastr from 'toastr';
export default {
name: "RegisterView",
data() {
    return {
      formData: {
        name:"",
        email: "",
        password: "",
      },
    };
  },
  methods:{
    register(){
      this.$store.dispatch('register',this.formData)
      .then(res=>{
        console.log(res.data)
        toastr.success(res.message)
        this.$router.push({
          name:'login'
        })
      }).catch(err=>{
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