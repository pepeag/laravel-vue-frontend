import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8000/api';
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    posts: [],
    users: []
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    myPosts(state) {
      console.log(state.posts);
      return state.posts
    },
    myUsers(state) {
      console.log(state.users);
      return state.users
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setUsers(state, users) {
      state.users = users
    }
  },

  actions: {
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
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
        axios.post('/register', {
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
        axios.post('/logout').then(res => {
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
        axios.get('/posts?page=' + page)
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
        axios.post('/posts', {
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
        axios.delete('/posts/' + id)
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
        axios.get('/posts?search=' + search).then(res => {
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
        axios.get('/posts/' + id).then(res => {
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
        axios.put('/posts/' + id, {
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

    importPosts(context, file) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/import/', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // Users
    getUsers(context, page) {
      return new Promise((resolve, reject) => {
        axios.get('/users?page=' + page, {
          headers: {
            'Authorization': 'Bearer ' + context.state.token
          }
        })
          .then((response) => {
            context.commit("setUsers", response.data.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error)
          });
      });
    },

    editUser(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/users/' + id).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },

    updateUser(context, { id, user }) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.put('/users/' + id, {
          name: user.name,
          email: user.email,
          password:user.password
        }).then(res => {
          resolve(res.data)
          console.log(context)
        }).catch(err => {
          reject(err)
        })
      })
    },

    getLoginUser(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/get-user/')
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error)
          });
      });
    },

    deleteUser(context, { id, loginId }) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/delete-user/' + id)
          .then(res => {
            if (id == loginId) {
              localStorage.removeItem('accessToken')
              context.commit('removeToken')
            }
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
      })
    },

    searchUsers(context, search) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/users?search=' + search).then(res => {
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
