import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      selAddress: {}, // 选中的地址对象
      inAddressList: [], // 登录用户地址列表
      dicTreeList: {}, // 数据字典
      saleCountry: [], // 国家列表
      homePageData: {bannerImages: [], productImages: {leftImges: {}, imagesList: []}, socialMediaImages: []}, // 首页数据
      categoryList: [], // 产品分类
      categoryData: {}, // 产品首页数据分类信息---按分类ID保存，避免重复请求
      language: 'l_en', // 当前地区/语言
      token: '', // token
      accountData: {isLogin: false, emailAddress: ''}, // 账户信息
      productDetail: {overviewData: {}, specs: {}, support: {proDownload: {}, proFaq: {}}, buynow: {}}, // 产品详情
      searchProduct: {records: []}, // 产品搜索结果
      userManual: {}, // UserManual产品列表
      blogData: {bannerData: [], labelData: [], homeData: []}, // blog首页数据
      blogDetailData: {},
      searchBlog: {records: []}, // blog搜索结果
      mediaDevices: false, // 设备类型 true为移动端
      shoppingCart: {totalNum: 0, shoppingCartId: '', totalAmount: '', productList: []} // 购物车
    },
    actions,
    mutations,
    getters
  })
}
