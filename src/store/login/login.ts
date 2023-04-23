import type { Module } from 'vuex'
import type { IRootState } from '../types'
import type { ILoginState } from './types'
import type { IAccount } from '../../service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '../../service/login/login'
import localCache from '../../utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '../../utils/map-menus'
import router from '../../router'

// 泛型类型“Module<S, R>”需要 2 个类型参数
// S表示模块里面state的类型，R表示根store中的state的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 将userMenus映射到router里面
      const routes = mapMenusToRoutes(userMenus)
      // 将router添加到router.main.children里面
      routes.forEach((route) => router.addRoute('main', route))

      // 获取用户按钮权限
      const permissions = mapMenusToPermission(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payolad: IAccount) {
      // 1、登陆
      const loginResult = await accountLoginRequest(payolad)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化请求(获取完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

      // 2、请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3、请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4、跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      userInfo && commit('changeUserInfo', userInfo)
      userMenus && commit('changeUserMenus', userMenus)
    }
  }
}
export default loginModule
