import { createStore } from 'vuex'


export default createStore({
  //用來獲取存在Store資料
  state: {
    myName : "吳樹育",
    count:1
  },
  getters: {
    getMyName:state => state.myName + "哈哈哈",
  },
  //改變store的資料 store.commit
  mutations: {
    updateMyName(state,myName) {
      state.myName = myName
    },
  },
  actions: {
    updateMyNameAction(context,myName){
      context.commit('updateMyName',myName);
    }
  },
  modules: {
  }
})
