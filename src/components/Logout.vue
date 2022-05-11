<template>
  <div>

  </div>
</template>

<script>
export default {
name: "Logout-Component",
created(){
    this.$store.dispatch('logout')
      .then(()=>{
        this.$router.push({
          name:'login'
        })
      }).catch(err=>{
        console.log(err)
      })
}
}
</script>

<style>

</style>