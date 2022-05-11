import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null
  },
  getters: {
    loggedIn(state){
      return state.token !==null
    }
  },
  mutations: {
    // state payload
    setToken(state, token) {
      state.token = token
    },
    removeToken(state){
      state.token = null
    }
  },
  actions: {
    login(context, credentials) {
     return new Promise((resolve,reject)=>{
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
    logout(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer '+context.state.token
      return new Promise((resolve,reject)=>{
       axios.post('http://localhost:8000/api/logout').then(res => {
         localStorage.removeItem('accessToken')
         context.commit('removeToken')
         resolve(res)
       }).catch(err => {
         reject(err)
       })
      })
     }
  },
  modules: {
  }
})
