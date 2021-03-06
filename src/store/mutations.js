import Vue from 'vue'
import VueCookies from 'vue-cookies'
export default {
  setCategoryList (state, data) {
    state.categoryList = data
  },
  setCategoryData (state, data) {
    state.categoryData[data.cId] = data
  },
  setSearchProduct (state, data) {
    state.searchProduct = data
  },
  setLanguage (state, data) {
    state.language = data
  },
  setToken (state, data) {
    state.token = data
    if (typeof window !== 'undefined') VueCookies.set('token', data)
  },
  setAccountData (state, data, isSession = true) {
    if (!isSession) {
      if (typeof window !== 'undefined' && window && window.localStorage) window.localStorage.setItem('accountName', data.emailAddress || '')
      
    }
    if (typeof window !== 'undefined' && window && window.sessionStorage) window.sessionStorage.setItem('accountName', data.emailAddress || '')
    state.accountData = data
  },
  setHomePageData (state, data) {
    data.productImages = data.productImages || []
    let productImages = {leftImges: {}, imagesList: []} // 处理首页中间5张图（后台返回一个list）
    for (let i = 0; i < data.productImages.length; i++) {
      i === 0 ? productImages.leftImges = data.productImages[i] : productImages.imagesList.push(data.productImages[i])
    }
    data.productImages = productImages
    state.homePageData = data
  },
  setProductDetail (state, data) {
    state.productDetail = data
  },
  setDicTreeList (state, data) { // 保存数据字典---全部转换成 key value形式
    let docData = {}
    try {
      for(let i = data.length; i--;) {
        for(let j = data[i].dicItemVos.length; j--;) {
          docData[data[i].dicItemVos[j].dicCode] = data[i].dicItemVos[j].dicValue
        }
      }
      docData.countryList = data.filter(item => item.code === 'DISTRICT_CODE_TYPE')[0].dicItemVos
      state.dicTreeList = docData
    } catch (err) {
      state.dicTreeList = {}
    }
  },
  setUserManual (state, data) {
    state.userManual = data
  },
  setLabelData (state, data) {
    state.blogData.labelData = data
  },
  setBannerData (state, data) {
    state.blogData.bannerData = data
  },
  setBlogDetailData (state, data) {
    state.blogDetailData = data
  },
  setBlogData (state, data) { // blog首页数据
    try {
      let blogData = {
        bannerData: data.bannerData.blogManagerBannerVos,
        labelData: data.labelData.records,
        homeData: data.homeData.records,
      }
      for (let i = 0; i < blogData.homeData.length; i++) {
        Object.assign(blogData.homeData[i], blogData.homeData[i].blogManagerModuleDetailVos.shift()) // blog首页分组数据是一大三小
      }
      state.blogData = blogData
    } catch (err) {
      state.blogData = {bannerData: [], labelData: [], homeData: []}
    }
  },
  setSearchBlog (state, data) {
    state.searchBlog = data
  },
  setSaleCountry (state, data) {
    state.saleCountry = data
  },
  setMediaDevices (state, data) {
    state.mediaDevices = data
  },
  setShoppingCart (state, data) {
    state.shoppingCart = data
  },
  setInAddressList (state, data) {
    state.inAddressList = data
  },
  setSelAddress (state, data) {
    state.selAddress = data
  }
}
