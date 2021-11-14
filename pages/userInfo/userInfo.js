const app = getApp()
/**
 * 页面的初始数据
 */
Page({
  data: {
    userInfo: {},
    isLogin: false,
    defaultInfo: {
      avatar_url: "http://m.qpic.cn/psc?/V53b6AhA0HpGbV45Hl7U09DkVH0EnDXo/45NBuzDIW489QBoVep5mcRgtxWK4O1Ug5RLPyDpBzDeAT7ligJlCGy4VU26Wbwp7MyHLv5Wn1Rbx9BnMKjZTddRqUkFA398g9xIhi.JuB8g!/b&bo=vAK8AgAAAAABFzA!&rf=viewer_4",//放未登录时的头像
      name: "点击登录",//未登录时的名字
      bio: "登录即可享受更多优质的服务",//未登录时的标语
      followers: 0,
      following: 0,
      stared: 0,
      watched: 0
    }
  },
  // comming: function () {
  //   wx.showToast({
  //     title: '即将上线 敬请期待'
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    });
    // app.loadFont();
    var that = this;
    that.setData({
      userInfo: that.data.defaultInfo
    });
  },
  onShow: function () {
    this.getUserInfo();
  },
  getUserInfo: function () {
    var that = this;
    app.getUserInfo(function (result) {
      wx.hideLoading();
      if (result) {
        that.setData({
          userInfo: app.userInfo,
          isLogin: true
        });
      } else {
        that.setData({
          userInfo: that.data.defaultInfo,
          isLogin: false
        });
      }
    });
  },
  logout: function () {
    wx.removeStorageSync('access_token');
    this.access_token = null;
    wx.navigateTo({
      url: '../login/login'
    })
  },
})