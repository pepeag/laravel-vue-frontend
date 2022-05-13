import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    posts: []
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    myPosts(state) {
      console.log(state.posts);
      return state.posts
    }
  },

  mutations: {
    // state payload
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    setPosts(state, posts) {
      state.posts = posts
    }
  },

  actions: {
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/login', {
          email: credentials.email,
          password: credentials.password
        }).then(res => {
          localStorage.setItem('accessToken', res.data.data.access_token)
          context.commit('setToken', res.data.data.access_token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    register(context, formData) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },

    logout(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/logout').then(res => {
          localStorage.removeItem('accessToken')
          context.commit('removeToken')
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    getPosts(context, page) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/posts?page=' + page)
          .then((response) => {
            context.commit("setPosts", response.data.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error)
          });
      });
    },

    createPost(context, posts) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/posts', {
          title: posts.title,
          description: posts.description,
        }).then(res => {
          console.log(context)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    deletePost(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.delete('http://localhost:8000/api/posts/' + id)
          .then(res => {
            console.log(context)
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
      })
    },

    searchPosts(context, search) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/posts?search=' + search).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },

    editPost(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/posts/' + id).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },

    updatePost(context, { id, posts }) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:8000/api/posts/' + id, {
          title: posts.title,
          description: posts.description
        }).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  modules: {
  }
})
