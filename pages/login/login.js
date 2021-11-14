const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    user_name: "",
    remember_password: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var user_name = wx.getStorageSync('user_name');
    var user_password = wx.getStorageSync('user_password');
    var personal_token = wx.getStorageSync('personal_token');
    this.setData({
      user_name: user_name,
      personal_token: personal_token,
      user_password: user_password
    });
  },
  formSubmit: function (e) {
    var that = this;
    var postData = e.detail.value;
    wx.showLoading({
      title: '登录中',
    });
    var user_name = postData.username;
    wx.setStorageSync('user_name', user_name);
    if (postData.remember_password.length > 0) {
      wx.setStorageSync('user_password', postData.password);
    } else {
      wx.setStorageSync('user_password', '');
    }
    postData.grant_type = 'password';
    postData.client_id = app.config.client_id;
    postData.client_secret = app.config.client_secret;
    postData.scope = 'user_info projects pull_requests issues notes keys hook groups gists enterprises';
    console.log("1")
    wx.request({
      url: app.config.apiUrl + 'oauth/token',
      method: "POST",
      data: postData,
      success: function (result) {
        wx.hideLoading();
        if (result.data.hasOwnProperty('access_token')) {
          wx.setStorageSync('access_token', result.data.access_token);
          wx.showToast({
            title: "登录成功"
          });
          wx.navigateTo({
            url: '../userInfo/userInfo',
          })
        } else {
          wx.showModal({
            title: '登录失败',
            content: '我们尝试为你登录码云帐号，但可能你的帐号密码错误',
            showCancel: false
          })
        }
      }
    })
  },
})