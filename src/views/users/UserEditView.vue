<template>
  <div class="container">
    <form
      action=""
      @submit.prevent="updateUser()"
      class="col-md-6 mx-auto my-3"
    >
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
      <div class="mb-3">
        <label for="" class="form-label">password</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password"
          id="password"
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
import toastr from "toastr";
export default {
  name: "UserEditView",

  data: () => ({
    user: {
      name: "",
      email: "",
      password:""
    },
  }),
  mounted() {
    this.editUser();
  },
  methods: {
    clearForm() {
      (this.user.name = ""), (this.user.email = ""), (this.user.password = "");
    },
    editUser() {
      let id = this.$route.params.id;
      if (id) {
        this.$store.dispatch("editUser", id).then((res) => {
          this.user.name = res.data.name;
          this.user.email = res.data.email;
          this.user.password = res.data.password
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
          this.$router.push({
            name: "userlist",
          });
        })
        .catch((err) => {
          for (const [k, v] of Object.entries(err.response.data.errors)) {
            toastr.error(v);
            console.log(k);
          }
        });
    },
  },
};
</script>

<style>
</style>