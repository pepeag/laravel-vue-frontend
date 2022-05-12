<template>
  <div class="container">
    <form action="" @submit.prevent="createPost" class="col-md-6 mx-auto my-3">
      <div class="mb-3">
        <label for="" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          v-model="posts.title"
          id="title"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="" class="form-label">Description</label>
        <input
          type="text"
          class="form-control"
          v-model="posts.description"
          id="description"
          aria-describedby="emailHelp"
        />
      </div>

      <button type="button" class="btn btn-dark text-whit me-3" @click="clearForm" >Clear</button>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";
export default {
  name: "PostCreateView",

  data: () => ({
    posts: {
      title: "",
      description: "",
    },
  }),

  methods: {
    createPost() {
      this.$store
        .dispatch("createPost", this.posts)
        .then((res) => {
          console.log(res);
          toastr.success(res.message)
          this.$router.push({ name: "postlist" });
        })
        .catch((error) => {
          for (const [k, v] of Object.entries(error.response.data.errors)) {
            toastr.error(v);
            console.log(k);
          }
        });
    },
    clearForm(){
      this.posts.title = "",
      this.posts.description = ""
    }
  },
};
</script>

<style>
</style>