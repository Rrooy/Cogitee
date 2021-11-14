const app = getApp()


Page({
  data: {
    type_value: "all",
    type_name: "仓库",
    typeList: [{
        "type_name": "我全部的",
        "type_value": "all"
      },
      {
        "type_name": "我创建的",
        "type_value": "owner"
      },
      
      {
        "type_name": "我加入的",
        "type_value": "member"
      },
     
    ],
    
        //分页开始
    page: 1,
    isGetingData: false,
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    });
  },
  /**
   * 页面显示事件
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (result) {
      if (result) {
        that.getList();
      } else {
        app.loginFirst();
      }
    });
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh() {
    this.setData({
      page: 1
    });
    this.getList();
  },
  /**
   * 上拉加载时间
   */
  onReachBottom: function () {
    if (!this.data.isGetingData) {
      this.setData({
        page: this.data.page + 1
      });
      this.getList();
    }
  },
  /**
   * 查询数据
   * @param {object} e 
   */
  search: function (e) {
    this.getList();
  },
  /**
   * 获取数据列表
   */
  getList: function () {
    var that = this;
    if (that.data.isGetingData) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      return;
    }
    that.data.isGetingData = true;
    wx.request({
      url: app.config.apiUrl + "api/v5/user/repos",
      method: "GET",
      data: {
        access_token: app.access_token,
        type: that.data.type_value,
        page: that.data.page,
      },
      success: function (result) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.hasOwnProperty("message")) {
          wx.showModal({
            title: '获取数据失败',
            content: "请尝试重新登陆",
            showCancel: false,
            success(res) {
              wx.navigateBack();
            }
          });
        } else {
          if (that.data.page == 1) {
            that.setData({
              list: result.data
            });
          } else {
            var _list = that.data.list;
            for (var i = 0; i < result.data.length; i++) {
              _list.push(result.data[i]);
            }
            that.setData({
              list: _list
            });
          }
        }
        that.data.isGetingData = false;
      }
    });
  },
  /**
   * 仓库类别选择事件
   * @param {object} e 
   */
  typeChanged: function (e) {
    var that = this;
    var menuList = [];
    for (var i in that.data.typeList) {
      menuList.push(that.data.typeList[i].type_name);
    }
    wx.showActionSheet({
      itemList: menuList,
      success: function (ret) {
        that.setData({
          type_name: that.data.typeList[ret.tapIndex].type_name,
          type_value: that.data.typeList[ret.tapIndex].type_value,
          page: 1,
        });
        that.getList();
      }
    });
  }})
