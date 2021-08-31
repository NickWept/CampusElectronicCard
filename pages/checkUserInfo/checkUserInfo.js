// pages/checkUserInfo/checkUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    showModal: false,
    // 表单信息
    formInfo: {
      bank:''
    }
  },
  showModal:function(){
    this.setData({
      showModal:true
    })
  },
  closeActionSheet: function () {
    this.setData({
      showActionsheet: false
    })
  },
  // 银行选择器事件
  openActionsheet:function(){
    this.setData({
      showActionsheet:true
    })
  },
  // 返回银行事件
  bankSelect:function (e) {
    // 事件委托
    console.log(e.target.dataset.name)
    this.setData({
      // 赋值
      formInfo: {
        bank: e.target.dataset.name
      } 
    })
    // 关闭选择器
    this.closeActionSheet()
  },

  // 已阅读勾选监听
  radioChange(e){
    console.log(e.detail.value)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})