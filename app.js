import './utils/$'
App({

  data: {
    host: wx.$.host,
    firstcome: 0,
    lecturerInfo: {
      data: {
        lecturer: {}
      }
    },
    playfirst: true,
    share: false

  },


  onShow: function (opp) {
    if (opp.scene == 1007 || opp.scene == 1008) {
      if (this.data.firstcome == 0) {
        this.data.firstcome = 1;
        this.data.share = true;
      } else {
        return
      };
    };
    if (opp.scene == 1020 || opp.scene == 1012 || opp.scene == 1013 || opp.scene == 1035 || opp.scene == 1058 || opp.scene == 1067 || opp.scene == 1073 || opp.scene == 1074 || opp.scene == 1082 || opp.scene == 1091) {
      this.data.share = true;
    };
  },
  onLaunch: function () {

    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调

    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
  }

})