// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateList:{},
    open: true,
    selectDay: {},
  },

  
  onLoad: function (options) {
    let now = new Date()
    let selectDay = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      dateString: this.formatTime(now, "Y-M-D")
    }
    this.setData({
      selectDay
    })
    console.log(this.data.selectDay)
    this.dateInit(selectDay.year, selectDay.month)
  },

  // picker设置月份
  editMonth(e){
    // split 分割字符串为数组
    // console.log(e.detail.value.split("-"))
    const arr = e.detail.value.split("-")
    const year = parseInt(arr[0])
    const month = parseInt(arr[1])
    this.setMonth(year, month)
  },

  // 上个月切换按钮点击
  lastMonth(){
    const lastMonth = new Date(this.data.selectDay.year, this.data.selectDay.month - 2)
    const year = lastMonth.getFullYear()
    const month = lastMonth.getMonth() + 1
    this.setMonth(year, month)
  },

  // 下个月切换按钮点击
  nextMonth(){
    const lastMonth = new Date(this.data.selectDay.year, this.data.selectDay.month)
    const year = lastMonth.getFullYear()
    const month = lastMonth.getMonth() + 1
    this.setMonth(year, month)
  },

  // 设置月份方法
  setMonth(setYear, setMonth, setDay){
    if(this.data.selectDay.year !== setYear || this.data.selectDay.month !== setMonth) {
      // Date对象月份参数是从 0 开始，日期从 1 开始
      // 如果日期为 0 表示获取对象的前一天  假设 setMonth 为 8
      // new Date(setYear, setMonth, 0).getDate() 判断当前8月有多少天
      // new Date(setYear, setMonth, 0) 返回9月1号的前一天，也就是8月的最后一天
      // new Date(setYear, setMonth, 1) 返回9月的第一天
      // 当前月份最大日期和选中日期，选最小
      const day = Math.min(new Date(setYear, setMonth, 0).getDate(), this.data.selectDay.day)
      const time = new Date(setYear, setMonth - 1, setDay ? setDay : day)
      const data = {
        selectDay: {
          year: setYear,
          month: setMonth,
          day: setDay ? setDay : day,
          dateString: this.formatTime(time, "Y-M-D")
        }
      }
      if (!setDay) {
        data.open = true
      }
      this.setData(data)
      this.dateInit(setYear, setMonth)
    }
  },

  // 展开收起按钮
  openChange(){
    this.setData({
      open: !this.data.open
    })
    this.dateInit()
  },

  /**
     * 时间戳转化为年 月 日 时 分 秒
     * time: 需要被格式化的时间，可以被new Date()解析即可
     * format：格式化之后返回的格式，年月日时分秒分别为Y, M, D, h, m, s，这个参数不填的话则显示多久前
     */
  formatTime(time, format) {
    // 补零
    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    
    // 格式化时间
    function getDate(time, format){
      const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
      const returnArr = []
      const date = new Date(time)
      returnArr.push(date.getFullYear())
      returnArr.push(formatNumber(date.getMonth() + 1))
      returnArr.push(formatNumber(date.getDate()))
      returnArr.push(formatNumber(date.getHours()))
      returnArr.push(formatNumber(date.getHours()))
      returnArr.push(formatNumber(date.getMinutes()))
      returnArr.push(formatNumber(date.getSeconds()))
      for ( const i in returnArr) {
        // format = "Y-M-D"
        format = format.replace(formatArr[i], returnArr[i])
        // format = "2021-M-D"
      }
      return format
    }
    return getDate(time, format)
  },

  // 日历主体的渲染方法
  dateInit(setYear = this.data.selectDay.year, setMonth = this.data.selectDay.month){
    let dateList = [] //需要遍历的日历数组数据
    let now = new Date(setYear, setMonth - 1) // 当前月份的1号
    let startWeek = now.getDay(); // 当前月份1号对应的星期
    let dayNum = new Date(setYear, setMonth, 0).getDate() // 当前月有多少天
    let forNum = Math.ceil((startWeek + dayNum) / 7) * 7 // 当前月跨越的周数 35 or 42
    if(this.data.open){                                  // ceil 向上取整，如有小数，放回整数 + 1
      // 展开状态，需要渲染完整月份
      for(let i = 0; i < forNum; i++){
        const now2 = new Date(now)
        now2.setDate(i - startWeek + 1)
        let obj = {};
        obj = {
            day: now2.getDate(),
            month: now2.getMonth() + 1,
            year: now2.getFullYear(),
            dateString: this.formatTime(now2, "Y-M-D")
          };
          dateList[i] = obj;
      }
    } else {
      // 非展开状态，只需要渲染当前周
      for(let i = 0; i < 7; i++){
        const now2 = new Date(now)
        // 当前周的7天
        now2.setDate(Math.ceil((this.data.selectDay.day + startWeek) / 7) * 7 - 6 - startWeek + i)
        let obj = {};
        obj = {
          day: now2.getDate(),
          month: now2.getMonth() + 1,
          year: now2.getFullYear(),
          dateString: this.formatTime(now2, "Y-M-D")
        };
        dateList[i] = obj;
      }
    }
    this.setData({
      dateList
    })
  },

  // 日期点击事件
  selectDayChange(e){
    const year = e.currentTarget.dataset.year
    const month = e.currentTarget.dataset.month
    const day = e.currentTarget.dataset.day
    const dateString = e.currentTarget.dataset.dateString
    const selectDay = {
      year,
      month,
      day,
      dateString
    }
    if(this.data.selectDay.year !== year || this.data.selectDay.month !== month) {
      this.setMonth(year, month, day)
    } else if (this.data.selectDay.day !== day){
      this.setData({
        selectDay
      })
    }
    console.log(year+"年"+month+"月"+day+"日")
  }
})