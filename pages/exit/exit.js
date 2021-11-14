// pages/exit/exit.js
Page({
  data: {

  },
  logout: function () {
    wx.removeStorageSync('access_token');
    this.access_token = null;
  },
  
})