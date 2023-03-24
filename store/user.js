export const state = () => ({
  username: '',
  loggedIn: false
})

export const getters = {
  username: (state) => {
    return state.username
  },
  loggedIn: (state) => {
    return state.loggedIn
  }
}

export const mutations = {
  logOut (state) {
    state.username = ''
    state.loggedIn = false
  },
  logIn (state, user) {
    state.loggedIn = true
    state.username = user.user_metadata.name
  }
}

export const actions = {
  logOut ({ commit }) {
    commit('logOut')
    this.$router.push({
      path: '/'
    })
  }
}
