<template>
  <div>
    <div class="container" id="app">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <form action="" @submit.prevent="searchUsers">
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
              <tr v-for="user in users.data" :key="user.id" class="text-center">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <router-link
                    class="btn btn-sm btn-info me-3"
                    :to="{ name: 'useredit', params: { id: user.id } }"
                    >Edit</router-link
                  >
                  <button
                    id="delete-btn"
                    class="btn btn-sm btn-danger"
                    @click.prevent="confirmDelete(user.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <LaravelVuePagination
            class="float-end"
            :data="users"
            :show-disabled="true"
            @pagination-change-page="getUsers"
          />
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
                <p v-if="deleteId != loginUser">Are You Sure Want to Delete?</p>
                <p v-else>
                  <span class="text-danger">{{ msg }}</span> Are You Sure Want
                  to Delete?
                </p>
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
                  @click.prevent="deleteUser(deleteId)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import LaravelVuePagination from "laravel-vue-pagination";
import toastr from "toastr";
export default {
  name: "UserListView",
  
  components: {
    LaravelVuePagination,
  },

  data: () => ({
    users: {},
    loginUser: "",
    deleteId: "",
    search: "",
    msg: "You Are Now Login ! ",
  }),

  computed: {
    myUsers() {
      return this.$store.getters.myPosts;
    },
  },

  mounted() {
    this.getUsers();
    this.getLoginUser();
  },

  methods: {
    getUsers(page = 1) {
      this.$store.dispatch("getUsers", page).then((res) => {
        this.users = res.data;
      });
    },

    searchUsers() {
      this.$store
        .dispatch("searchUsers", this.search)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getLoginUser() {
      this.$store.dispatch("getLoginUser").then((res) => {
        this.loginUser = res.data.id;
      });
    },

    confirmDelete(id) {
      $("#modalDelete").modal("show");
      this.deleteId = id;
      if (this.deleteId == this.loginUser) {
        $("#modalDelete").modal("show");
      }
    },

    deleteUser(deleteId) {
      this.$store
        .dispatch("deleteUser", { id: deleteId, loginId: this.loginUser })
        .then((res) => {
          if (this.loginUser) {
            toastr.success(res.message, { fadeAway: 2000 });
            $("#modalDelete").modal("hide");
            location.reload();
          }
          toastr.success(res.message, { fadeAway: 4000 });
          this.$router.push({
            name: "login",
          });
        });
    },
  },
};
</script>

<style>
</style>