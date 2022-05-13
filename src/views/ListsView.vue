<template>
  <div class="container">
    <div class="row">
      <Pagination
        :data="posts"
        @pagination-change-page="getPosts"
        :limit="3"
        size="large"
        align="center"
        :showDisabled="false"
      ></Pagination>
      <div class="col-md-6 mx-auto">
        <form action="" @submit.prevent="searchPosts">
          <div class="input-group my-3 float-start">
            <input
              type="text"
              v-model="search"
              class="form-control outline-none"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-none btn-success"
              type="submit"
              id="button-addon2"
            >
              Search
            </button>
          </div>
        </form>
        <router-link
          class="btn btn-primary mt-3 float-end my-3"
          to="/postcreate"
          >Create Post</router-link
        >
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts.data" :key="post.id" class="text-center">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>
                <router-link class="btn btn-sm btn-info me-3" :to="{name: 'postedit', params: { id: post.id } }"
                  >Edit</router-link
                >
                <button
                  class="btn btn-sm btn-danger"
                  @click="confirmDelete(post.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <pagination :data="posts" @pagination-change-page="getResults"></pagination> -->
      </div>
      <div id="modalDelete" tabindex="-1" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Post</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Are You Sure Want to delete?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancle
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="deletePost(id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "shetabit-laravel-vue-pagination";
import $ from "jquery";
import toastr from "toastr";
// import axios from 'axios';
export default {
  components: {
    Pagination: Pagination,
  },
  name: "ListsView",
  data: () => ({
    id: "",
    show: false,
    posts: {},
    search: "",
  }),
  computed: {
    myPosts() {
      return this.$store.getters.myPosts;
    },
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    confirmDelete(id) {
      this.id = id;
      $("#modalDelete").modal("show");
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id).then((res) => {
        $("#modalDelete").modal("hide");
        toastr.success(res.message);
        this.$forceUpdate()
      });
    },
    getPosts(page = 1) {
      this.$store.dispatch("getPosts", page).then((res) => {
        this.posts = res;
      });
    },
    searchPosts() {
      this.$store
        .dispatch("searchPosts", this.search)
        .then((res) => {
          this.posts = res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>