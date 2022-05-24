<template>
  <div class="row">
     <div class="col-md-6 ms-5">
       <div class="col-md-6 ms-5 my-3">
         <a href="" v-if="loggedIn" class="btn btn-sm btn-dark text-center ms-5">{{username}}</a>
       </div>
     </div>
   </div>
</template>

<script>
export default {
name: "LoginUser",
data:()=>({
    username:""
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  mounted(){
    if(this.loggedIn){
      this.getLoginUser();
    }
  },
  methods:{
    getLoginUser(){
      this.$store.dispatch("getLoginUser")
      .then(res=>{
        if(res){
          this.username = res.data.name
        }else{
          console.log("login")
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>