import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getState, setState, removeState } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getState() ? getState().name : '',
  avatar: '',
  introduction: '',
  roles: [],
  distCode: getState() ? getState().distCode : ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_DIST_CODE: (state, distCode) => {
    state.distCode = distCode
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)

        const token = response.accessToken;
        commit('SET_TOKEN', token)
        commit('SET_NAME', username.trim())
        // debugger
        // state.settings.sidebarLogo = true;
        // debugger
        setToken(token)
        setState(state)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.name).then(response => {
        // const { data } = response
        //
        // if (!data) {
        //   reject('Verification failed, please Login again.')
        // }
        //
        // const { roles, name, avatar, introduction } = data
        //
        // // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        //
        // commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        // resolve(data)

        const data = response
        if (!data) {
          reject('验证失败,请重新登陆')
        }
        const roles = data.userType == 0 ? ['admin'] : ['editor'];

        commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        commit('SET_AVATAR', data.headImgUrl)
        commit('SET_INTRODUCTION', '1')
        commit('SET_DIST_CODE', data.distCode)

        setState(state)

        resetRouter();

        const resolveData = {
          roles: roles,
          introduction: '1',
          avatar: data.headImgUrl,
          name: state.name
        };
        resolve(resolveData)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        // debugger
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeState()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeState()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    debugger
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
