// pages/cutFace/index.js

const WeCropper = require('../../we-cropper/we-cropper.js')

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const system = device.system;
let height = device.windowHeight - 100




Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotateI: 0,
    cropperOpt: {
      id: 'cropper',
      rotateI: 0,
      tranlateX: width / 2,
      tranlateY: height / 2,
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数,
      cut: {
        x: -width / 2,
        y: -(height - (width / 1.4)) / 2,
        width: width,
        height: width / 1.4
      }
    },
    chooseImg: false,
    imgSrc: '',
  },


  onLoad: function (options) {
    const self = this;
    this.setData({
      cuttype: options.cuttype
    })
    const { cropperOpt } = this.data;
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        self.wecropper.updateCanvas(this.data.rotateI)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
    this.chooseImg()

  },

  chooseImg() {
    const self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        if (src) {
          self.wecropper.pushOrign(src)
          self.setData({
            chooseImg: true,
            imgSrc: src,
            rotateI: 0
          })
        };
        wx.hideToast()
      },
      fail(res) {
        wx.hideToast();
        wx.navigateBack()
      }
    })
  },

  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },

  getCropperImage() {
    let that = this;
    if (this.data.chooseImg) {
      this.wecropper.getCropperImage((src) => {
        if (src) {
          if (this.data.cuttype == 1) {
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2]
            prevPage.setData({
              src: src,
              cuttype: this.data.cuttype
            })
          }
          wx.navigateBack()
        } else {
          wx.hideToast()
          wx.showToast({
            title: '获取图片地址失败，请稍后再试！',
          })
        }
      })
    } else {
      wx.showToast({
        title: '您还没选择图片！',
        icon: 'none'
      })
    }

  },

  cancleCropper() {
    wx.hideToast()
    wx.navigateBack()
  },

  // 图片旋转
  rotateImg() {
    const self = this;
    let rotateI = this.data.rotateI + 1;
    this.setData({
      rotateI: rotateI
    })
    self.wecropper.updateCanvas(rotateI)
  }
})