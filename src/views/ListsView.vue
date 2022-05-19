<template>
  <div class="container" id="app">
    <div class="row">
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
        <button
          class="btn btn-success mt-3 me-3 float-end my-3"
          @click="importModal"
        >
          Import Posts
        </button>
        <download-excel
          class="btn btn-success float-start mt-3"
          :data="posts.data"
          type="csv"
          :fields="json_fields"
          name="posts.csv"
          >Download CSV</download-excel
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
                <router-link
                  class="btn btn-sm btn-info me-3"
                  :to="{ name: 'postedit', params: { id: post.id } }"
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
        <div class="float-end">
          <LaravelVuePagination
            :data="posts"
            :show-disabled="true"
            @pagination-change-page="getPosts"
          />
        </div>
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
      <div id="importModal" tabindex="-1" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="formModalLabel">Import Post Data</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card-body">
                <form enctype="multipart/form-data">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept=".csv"
                    class="form-control"
                    ref="file"
                    required
                  />
                  <small v-show="show" class="text-danger"
                    ><span class="my-2">{{ importErr }}</span></small
                  >
                  <br />
                  <button
                    class="btn btn-success float-end"
                    @click.prevent="importPosts"
                  >
                    Import Data
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import LaravelVuePagination from "laravel-vue-pagination";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
import $ from "jquery";
import toastr from "toastr";
export default {
  name: "ListsView",
  components: {
    LaravelVuePagination,
  },
  data: () => ({
    id: "",
    show: false,
    posts: {},
    search: "",
    json_fields: {
      ID: "id",
      Title: "title",
      Description: "description",
    },
    importErr: "",
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
        location.reload();
      });
    },

    getPosts(page = 1) {
      this.$store.dispatch("getPosts", page).then((res) => {
        this.posts = res.data;
      });
    },

    searchPosts() {
      this.$store
        .dispatch("searchPosts", this.search)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    importModal() {
      $("#importModal").modal("show");
    },

    importPosts() {
      let formData = new FormData();
      formData.append("file", document.getElementById("file").files[0]);
      console.log(formData);
      this.$store
        .dispatch("importPosts", formData)
        .then((res) => {
          toastr.success(res.message, { fadeAway: 2000 });
          $("#importModal").modal("hide");
          location.reload();
        })
        .catch((err) => {
          this.importErr = "* please choose csv file";
          this.show = true;
          console.log("error " + err);
        });
    },
  },
};
</script>

<style>
</style>