<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <router-link class="btn btn-primary mt-3 float-end my-3" to="/postcreate">Create Post</router-link>
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
            <tr v-for="post in $store.getters.myPosts" :key="post.id" class="text-center">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>
                <router-link class="btn btn-sm btn-info me-3" to="postedit"
                  >Edit</router-link
                >
                <button class="btn btn-sm btn-danger" @click="confirmDelete(post.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  <div id="modalDelete" tabindex="-1" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are You Sure Want to delete?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
        <button type="button" class="btn btn-primary" @click="deletePost(id)">Delete</button>
      </div>
    </div>
  </div>
</div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "ListsView",
  data:()=>({
    id:'',
    show: false,
  }),
  computed: {
    myPosts() {
      return this.$store.getters.myPosts;
    },
  },
  created() {
    this.$store.dispatch("getPosts");
  },
  methods:{
    confirmDelete(id) {
      this.id = id
       $('#modalDelete').modal('show')
    },
    deletePost(id){
      this.$store.dispatch("deletePost",id)
    }
  }
};
</script>

<style>
</style>