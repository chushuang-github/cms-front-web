import { Module } from 'vuex'
import type { IRootState } from '@/store/types'
import { IDashboardState } from './types'
import {
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategorySale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      const categorySaleResult = await getCategoryGoodsSale()
      const categoryFavorResult = await getCategoryGoodsFavor()
      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeCategoryCount', categoryCountResult.data)
      commit('changeCategorySale', categorySaleResult.data)
      commit('changeCategoryFavor', categoryFavorResult.data)
      commit('changeAddressSale', addressGoodsResult.data)
    }
  }
}

export default dashboardModule
