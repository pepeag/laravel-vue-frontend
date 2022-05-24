<template>
  <div class="container">
    <form action="" @submit.prevent="editMode==true?updatePost():createPost()" class="col-md-6 mx-auto my-3">
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

      <button
        type="button"
        class="btn btn-dark text-whit me-3"
        @click="clearForm"
      >
        Clear
      </button>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script>
import toastr from "toastr";
export default {
  name: "PostCreateView",

  data: () => ({
    editMode: false,
    posts: {
      title: "",
      description: "",
    },
  }),
  mounted() {
    if (this.$route.params.id) {
      this.editMode = true;
      this.editPost()
    }
  },
  methods: {
    createPost() {
      this.$store
        .dispatch("createPost", this.posts)
        .then((res) => {
          console.log(res);
          toastr.success(res.message);
          this.$router.push({ name: "postlist" });
        })
        .catch((error) => {
          for (const [k, v] of Object.entries(error.response.data.errors)) {
            toastr.error(v);
            console.log(k);
          }
        });
    },

     editPost() {
      let id = this.$route.params.id;
      if (id) {
        this.$store.dispatch("editPost", id).then((res) => {
          this.posts.title = res.data.title;
          this.posts.description = res.data.description;
        });
      } else {
        this.$router.push({
          name: "postlist",
        });
      }
    },

    updatePost() {
      let id = this.$route.params.id;
      this.$store
        .dispatch("updatePost", { id, posts: this.posts })
        .then((res) => {
          toastr.success(res.message);
          this.$router.push({
            name: "postlist",
          });
        })
        .catch((err) => {
          for (const [k, v] of Object.entries(err.response.data.errors)) {
            toastr.error(v);
            console.log(k);
          }
        });
    },

    clearForm() {
      (this.posts.title = ""), (this.posts.description = "");
    },
  },
};
</script>

<style>
</style>