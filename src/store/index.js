import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

Vue.use(Vuex)
const ModuleA = {
  state: {
    token: "",
    Key: "AIzaSyBW-S_pEaJFyYyUEz5NJoNZCPAC5XqKa5U",
  },
  getters: {
    isAuth(state) {

      return state.token != ""
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    clearToken(state) {
      state.token = '',
        Vue.$cookies.remove('token')
    }
  },
  actions: {
    async ActionLogin(context, payload) {

      return await axios.post(url(payload.isUser) + 'AIzaSyBW-S_pEaJFyYyUEz5NJoNZCPAC5XqKa5U', { email: payload.email, password: payload.password, returnSecureToken: true }).then(res => {
        const { idToken } = res.data
         
          
        context.commit('setToken', idToken)
        Vue.$cookies.set('token', idToken, '15MIN')

        return res
      })

      function url(isUser) {
        if (isUser) {
            Vue.swal.fire("Giriş Yapıldı!", "Butona basın", "success");
          return 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        } else {
          Vue.swal.fire("Kayıt Başarılı!", "Butona basın", "success");
          return 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        }
      }
    },
    actionLogout(contex) {
      contex.commit('clearToken'),
        router.push({ name: 'Home' })
    }
  },
}
const ModuleB = {
  state: {
    posts: {},
    text: ""
  },
  mutations: {
    SetPosts(state, payload) {
      return state.posts = payload
    },
    SetText(state, payload) {
      state.text = payload
      console.log(state.text);
    }
  },
  actions: {
    async ActionSetPost(context, payload) {
      return await axios.post('https://autoho-cb206-default-rtdb.firebaseio.com/posts.json', {
        author: payload.author, content: payload.content, previewText: payload.previewText, thumbnail: payload.thumbnail, title: payload.title, updatedDate: payload.updatedDate
      }).then(res => {
        context.commit('SetPosts', res.data)

        console.log(res);
        return res
      })
    },
    async ActionGetPosts() {
      return await axios.get('https://autoho-cb206-default-rtdb.firebaseio.com/posts.json').then(res => {
        console.log(res.data);

        return res
      }
      )
    },


  },

}
const ModuleC = {
  state: {
    color: {},
    caursel: false
  },

  mutations: {
    MutationColor(state, payload) {
      state.color = payload
    },
    MutationCaursel(state) {
      state.caursel = !state.caursel
      Vue.$cookies.set("caursel", state.caursel)
      console.log("state" + state.caursel);
    },

  },
  actions: {
    async ActionPutColor(context, payload) {
      return await axios.put('https://autoho-cb206-default-rtdb.firebaseio.com/color.json',
        { bgcolor: payload.bgcolor, txcolor: payload.txcolor }).then(res => {
          console.log(res.data)
          context.commit('MutationColor', res.data.color)
          return res
        })
    },
    async ActionGetColor() {
      return await axios.get('https://autoho-cb206-default-rtdb.firebaseio.com/color.json').then(res => {
        return res
      })

    }
  }

}
export default new Vuex.Store({
  modules: {
    ModuleA,
    ModuleB,
    ModuleC,
  }
})
