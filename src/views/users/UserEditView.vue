<template>
    <div class="container">
    <form action="" @submit.prevent="updateUser()" class="col-md-6 mx-auto my-3">
      <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="user.name"
          id="name"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="" class="form-label">email</label>
        <input
          type="text"
          class="form-control"
          v-model="user.email"
          id="email"
          aria-describedby="emailHelp"
        />
      </div>

      <button
        type="button"
        class="btn btn-dark text-whit me-3"
        @click="clearForm"
      >
        Clear
      </button>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
import toastr from 'toastr';
export default {
name: "UserEditView",
data:()=>({
  user:{
    name:"",
    email:"",
  }
}),
mounted() {
    this.editUser();
  },
methods:{
  clearForm(){
    this.user.name = "",
    this.user.email = ""
  },
  editUser(){
      let id = this.$route.params.id;
      if (id) {
        this.$store.dispatch("editUser", id).then((res) => {
          this.user.name = res.data.name;
          this.user.email = res.data.email;
        });
      } else {
        this.$router.push({
          name: "userlist",
        });
      }
  },

   updateUser() {
      let id = this.$route.params.id;
      this.$store
        .dispatch("updateUser", { id, user: this.user })
        .then((res) => {
          toastr.success(res.message);
          this.$router
            .push({
              name: "userlist",
            })
            .catch(err => {
              console.log(err);
            });
        });
    },
}
}
</script>

<style>

</style>