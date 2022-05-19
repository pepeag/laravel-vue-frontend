<template>
  <div></div>
</template>

<script>
import toastr from "toastr";
export default {
  name: "Logout-Component",
  created() {
    this.$store
      .dispatch("logout")
      .then((res) => {
        toastr.success(res.message);
        this.$router.push({
          name: "login",
        });
        location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>