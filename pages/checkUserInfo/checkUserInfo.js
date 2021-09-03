// pages/checkUserInfo/checkUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBankActionsheet: false,
    showStudentActionsheet: false,
    showModal: false,
    stepTwo: false,
    // 表单信息
    formInfo: {
      bank:''
    },
    readRadio: false,

    studentList: [
              {
                  "studentId": 5,
                  "gender": "男",
                  "phone": "13267561213",
                  "birth": null,
                  "jisu": "是",
                  "updatetime": "2021-08-21T02:31:00.000+0000",
                  "createtime": "2021-08-10T02:39:29.000+0000",
                  "remark": null,
                  "className": "2020级3班",
                  "idType": "身份证",
                  "cardSn": null,
                  "idNumber": "432123199812089171",
                  "picLink": null,
                  "outUserId": "T00005",
                  "facePicLink": null,
                  "homeAddress": null,
                  "schoolRollSn": "2018652238",
                  "studentState": "转班",
                  "studenRollSn": "2014987624",
                  "funCode": null,
                  "gradeName": "初一",
                  "studentName": "小林"
              },
              {
                  "studentId": 6,
                  "gender": "男",
                  "phone": "13267561243",
                  "birth": null,
                  "jisu": "是",
                  "updatetime": "2021-08-10T02:41:32.000+0000",
                  "createtime": "2021-08-10T02:41:32.000+0000",
                  "remark": null,
                  "className": "2014级1班",
                  "idType": "身份证",
                  "cardSn": null,
                  "idNumber": "432123199711089171",
                  "picLink": null,
                  "outUserId": "T00006",
                  "facePicLink": null,
                  "homeAddress": null,
                  "schoolRollSn": "2018652233",
                  "studentState": "就读",
                  "studenRollSn": "2014987622",
                  "funCode": null,
                  "gradeName": "初一",
                  "studentName": "小明"
              },
              {
                  "studentId": 7,
                  "gender": "男",
                  "phone": "13234742313",
                  "birth": "1997-11-30T16:00:00.000+0000",
                  "jisu": "是",
                  "updatetime": "2021-08-11T06:32:19.000+0000",
                  "createtime": "2021-08-11T06:32:19.000+0000",
                  "remark": null,
                               "className": "2014级3班",
                  "idType": "身份证",
                  "cardSn": null,
                  "idNumber": "445612199711089171",
                  "picLink": null,
                  "outUserId": "T00006",
                  "facePicLink": null,
                  "homeAddress": null,
                  "schoolRollSn": "2018652233",
                  "studentState": "就读",
                  "studenRollSn": "2014987622",
                  "funCode": null,
                  "gradeName": "初一",
                  "studentName": "小智"
              }
    ],
  },
  showModal:function(){
    this.setData({
      showModal:true
    })
  },
  closeActionSheet: function () {
    this.setData({
      showBankActionsheet: false,
      showStudentActionsheet: false
    })
  },
  // 弹出学生列表
  openStudentActionsheet:function(){
    this.setData({
      showStudentActionsheet:true
    })
  },
  // 弹出银行选择器
  openBankActionsheet:function(){
    this.setData({
      showBankActionsheet:true
    })
  },
  // 返回学生事件
  studentSelect(e){
    // 事件委托
    // console.log(e.target.dataset.student_id)
    const id = e.target.dataset.student_id
    const studentList = this.data.studentList
    studentList.forEach(item => {
      if(item.studentId == id){
        // 获取学生对象
        console.log(item)
        // 关闭选择器
        this.closeActionSheet()
      }
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
  radioChange(){
    this.setData({
      readRadio: !this.data.readRadio
    })
    console.log(this.data.readRadio)
  },

  // 默认1是绿的，2变绿点击事件
  stepTwoActive(){
    this.setData({
      stepTwo: !this.data.stepTwo
    })
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