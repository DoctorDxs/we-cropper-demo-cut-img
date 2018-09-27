//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   src: '',
   cuttype: null
  },
  onShow() {
    if (this.cuttype) {
      console.log(this.data.src)
    }
  },

  chooseIMG() {
    wx.navigateTo({
      url: '/pages/cutFace/index?cuttype=1',
    })
  }
})
