<template>
  <div>
   <div class="container" id="app">
    <div class="row">
      <!-- <Pagination
        :data="posts"
        @pagination-change-page="getPosts"
        :limit="3"
        size="large"
        align="center"
        :showDisabled="false"
      ></Pagination> -->
      <div class="col-md-6 mx-auto">
        <!-- <form action="" @submit.prevent="searchPosts">
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
        </form> -->
        <!-- <button
          class="btn btn-success mt-3 me-3 float-end my-3"
          @click="importModal"
        >
          Import Posts
        </button> -->
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
            <tr v-for="user in users" :key="user.id" class="text-center">
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
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <pagination :data="posts" @pagination-change-page="getResults"></pagination> -->
      </div>
      <!-- <div id="modalDelete" tabindex="-1" class="modal fade" role="dialog">
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
      </div> -->
      <!-- <div id="importModal" tabindex="-1" class="modal fade" role="dialog">
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
                <form id="import-form">
                  <input
                    type="file"
                    :v-model="file"
                    accept=".csv"
                    class="form-control"
                    required
                  />
                  <br />
                  <button class="btn btn-success" @click.prevent="importPosts()">Import Data</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:"UserListView",
data:()=>({
  users:{},
}),
computed: {
    myUsers() {
      return this.$store.getters.myPosts;
    },
  },
  mounted() {
    this.getUsers();
  },
methods:{
  getUsers(){
    this.$store.dispatch("getUsers").then(res=>{
      this.users = res.data
    })
  }
}
}
</script>

<style>

</style>