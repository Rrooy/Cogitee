// pages/createRep/createRep.js
const app = getApp();



Page({

  data: {
    repName:"",
    repDescription:"",
    private:"",
    switchIssue:false,
    switchWiki:false,
    switchComment:false,
    switchInit:false,
    switchPrivate:false,
  },
  repNameInput: function (e) {
    this.setData({
    repName: e.detail.value
    })
    },
  repDescriptionInput: function (e) {
    this.setData({
      repDescription: e.detail.value
    })
    },
  createRepository:function(){
  var that = this;
  wx.request({
    url: app.config.apiUrl + "api/v5/user/repos",
    method:"POST",
    data:{
      access_token: app.access_token,
      name:that.data.repName,
      description:that.data.repDescription,
      has_issues:that.data.switchIssue,
      has_wiki:that.data.switchWiki,
      can_comment:that.data.switchComment,
      auto_init:that.data.switchInit,
      private:that.data.switchPublic
    },
    header:{'Content-Type':' application/json;charset=UTF-8'},
    success(res){
      console.log(res)
    }
  })
  },
  switchIssueChange:function(e){
    var status = e.detail.value;
    this.setData({
      switchIssue:(status?true:false),
    })
  },
  switchWikiChange:function(e){
    var status = e.detail.value;
    this.setData({
      switchWiki:(status?true:false),
    })
  },
  switchCommentChange:function(e){
    var status = e.detail.value;
    this.setData({
      switchComment:(status?true:false),
    })
  },
  switchInitChange:function(e){
    var status = e.detail.value;
    this.setData({
      switchInit:(status?true:false),
    })
  },
  switchPrivateChange:function(e){
    var status = e.detail.value;
    this.setData({
      switchPublic:(status?true:false),
    })
  },
})