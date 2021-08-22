Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 返回日期数组
    daylist: [],
    // 存储日期
    year: 2021,
    month: 8,
    day: 1,
    // 当月总天数
    days: 0,
    // 存储当前上一个月最后一个星期一
    lastmonthlastmon: 0,
    open: false
  },

  onLoad: function (options) {

    this.getDate(this.data.time)
    
  },

  getDate(time=new Date){
    console.log(time)
    // 获取时间对象
    const date = new Date(time)
    // 获取年月日星期
    const year = date.getFullYear()
    const month = date.getMonth()  // 返回的是0~11 对应 1~12月
    const day = date.getDate()
    const week = date.getDay()


    // 月份第一天是星期几       month 传参也是0-11对应1~12月
    const firstweek = new Date(year, month, 1).getDay() // 0是星期日
    // 月份有几天
    const days = new Date(year, month+1, -1).getDate()+1
    // 月份最后一天是星期几
    const lastweek = new Date(year, month, days).getDay()
    // 月末缺少的部分
    const fewday = 7 - lastweek
    
    // 上个月的总天数
    let lastmonth =  new Date(year, month, -1).getDate()+1
    // 上个月最后一天是星期几
    const lastmonthlastday = new Date(year, month-1, lastmonth).getDay()
    // 上个月最后一个星期一是几号
    const lastmonthlastweek = lastmonthlastday ? lastmonth - lastmonthlastday + 1 : lastmonth - lastmonthlastday - 6
    console.log("上个月总天数"+lastmonth+"   上个月的最后一天是星期几："+lastmonthlastday+"  上个月最后一个周一" + lastmonthlastweek)
    // 申明返回数组
    let returnArr = []
    // 判断返回展示一个月还是一周
    let open = this.data.open
    if(open){
      // 前月份与本月相同周的几天
      if(firstweek == 0){
        // 上个月有几天
        // 通过减去week，避免出现 31 30 29 1 2 3 , 因为星期日week接收到的是0，这里手动写成7
        var preday = lastmonth - 5
        for( ; preday <= lastmonth; preday++){
          returnArr.push(preday)
        }
      } else {
        var preday = lastmonth - (firstweek - 2)
        // 是从一到日，如果是星期3前面空出来两天
        for( ; preday <= lastmonth; preday++){
          returnArr.push(preday)
        }
      }
      // 本月天数
      for(var i=1; i <= days; i++){
        returnArr.push(i)
      }
      // 后月相同周的几天
      if(lastweek != 0){
        for(var i=1; i <= fewday; i++){
          returnArr.push(i)
        }
      }

      
    } else {
      // 返回当前周
      let daynum;
      // 一周7天
      var num = 1 // 下个月补全用的
      for(var i=0; i < 7; i++){
        //当天为星期日
        if(week == 0){
          daynum = day - 6 + i
          // 如果小于1说明与上个月同周，前面获取过上个月的总天数，可以通过 lastmonth-- 补上
          if(daynum < 1){
            // unshift 在数组开头添加
            returnArr.unshift(lastmonth--)
          }else if(daynum > days) {
            returnArr.push(num++)
          } else {
            returnArr.push(daynum)
          }
          
        } else {
          daynum = day - week + 1 + i
          if(daynum < 1){
            // unshift 在数组开头添加
            returnArr.unshift(lastmonth--)
          }else if(daynum > days) {
            returnArr.push(num++)
          } else {
            returnArr.push(daynum)
          }
        }
      }
      console.log(returnArr)
    }

    this.setData({
      daylist: returnArr,
      year,
      month: month + 1,
      day,
      days,
      lastmonthlastmon: lastmonthlastweek
    })

    console.log("初始化时间里的——星期："+week+"  日期:"+day+"  全局里的day："+this.data.day+"   全局当前月总天数days："+this.data.days)
    console.log("全局list:" + this.data.daylist)
    console.log("全局的上月最后一个星期一的日期:" + this.data.lastmonthlastmon)
    console.log("=============================================================================================")
  },

  // 上一个月
  lastMonthAndLastWeek(){
    if(this.data.open){
      var time = this.checkTime(this.data.year, this.data.month-1, this.data.day)
    } else {
      console.log(this.data.daylist[0])
      if(this.data.daylist[0]<=8){
        time = this.checkTime(this.data.year, this.data.month-1, this.data.lastmonthlastmon)
      } else {
        time = this.checkTime(this.data.year, this.data.month, this.data.day - 7)
      }
    }
    this.setData({
      time,
      daylist:[]
    })

    this.getDate(this.data.time)
  
  },
  // 下一个月
  nextMonthAndNextWeek(){
    if(this.data.open){
      var time = this.checkTime(this.data.year, this.data.month+1, this.data.day)
    } else {
      var max = Math.max.apply(null,this.data.daylist)
      console.log(max, this.data.days)
      if((this.data.daylist[this.data.daylist.length-1]+7) > this.data.days ){
        var day = 1
        time = this.checkTime(this.data.year, this.data.month+1, day)
        
      } else {
        var day = this.data.day+7
        time = this.checkTime(this.data.year, this.data.month, day)
      }
      this.setData({
        day
      })
    }
    this.setData({
      time,
      daylist:[]
    })
    this.getDate(this.data.time)
  },

  // 判断月份是否超出1月或12月
  checkTime(year, month, day=this.data.day){
    if(month > 12 ){
      year++
      month = 1
    } else if (month < 1){
      year--
      month = 12
    }
    console.log("check里面的——"+ year + "-" + month + "-" + day)
    return year + "-" + month + "-" + day // 页面一加载就会初始化时间并更新日期
  },

  // 显示状态绑定
  openchange(){
    this.setData({
      open: !this.data.open
    })
    this.getDate(this.data.time)
  },

  // 日期点击事件
  changeSelectDay(e){
    var day = e.currentTarget.dataset.datenum
    console.log(e.currentTarget.dataset.datenum)
    this.setData({
      day,
    })
    var time = this.checkTime(this.data.year, this.data.month, day)
    this.setData({
      time,
      daylist:[]
    })
    this.getDate(time)
  }

  
})