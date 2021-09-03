// components/myCalendar/myCalendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spot: {
      type: Array,
      value: [["2021-8-29","red"], ["2021-8-28","yellow"], ["2021-8-30","blue"]]
    },
    defaultTime:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weekList: {
      preWeekList:[],
      currWeekList: [],
      nextWeekList:[],
    },
    selectDay: {
      year: '',
      month: '',
      day: '',
      dateString: '',
    },
    // 当天
    today: '', 
    currentNum: 1, // 日历位置
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 转换时间
    formatTime(time, format) {
      function  formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
      }

      function getDate(time, format) {
        const formatArr = ['Y','M','D','h','m','s']
        const returnArr = []
        const date = new Date(time)
        returnArr.push(date.getFullYear())
        returnArr.push(formatNumber(date.getMonth() + 1))
        returnArr.push(formatNumber(date.getDate()))
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

    // num 为 0 获取本周list， 为 -7 获取上周list  为7获取下周list
    getWeekList(num, time, day){
      let weekList = [];
      for (let i=0; i<7; i++){
        const now2 = new Date(time)
        // 从周一到周日
        const currDate = now2.getDay() === 0 ? 6 : now2.getDay() - 1
        now2.setDate(day - currDate + i + num)
        let obj = {};
        obj = {
          day: now2.getDate(),
          month: now2.getMonth() + 1,
          year: now2.getFullYear(),
          dateString: this.formatTime(now2, "Y-M-D"),
        };
        weekList[i] = obj;
      }
      // console.log(weekList)
      return weekList
    },

    dateInit( setDay = this.data.selectDay.day, setYear =  this.data.selectDay.year, setMonth = this.data.selectDay.month){
      // 从周一到周日，三组数据，上周 本周 下周
      let preWeekList = [];
      let nextWeekList = [];
      let currWeekList = [];
      let now = new Date(setYear, setMonth - 1 , setDay)

      preWeekList = this.getWeekList(-7, now, setDay)
      currWeekList = this.getWeekList(0, now, setDay)
      nextWeekList = this.getWeekList(7, now, setDay)
      
      
      this.setData({
        weekList: {
          preWeekList,
          currWeekList,
          nextWeekList,
        }
      })
      
      this.setSpot()
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
        this.dateInit()
      }
      this.setData({
        selectDay
      })
      // console.log(year+"年"+month+"月"+day+"日")

      // 给父组件传参数
      const time = new Date(year,month-1,day)
      const date = this.formatTime(time, "Y-M-D")
      this.triggerEvent('selectDayChange', date)
  },

  // 左右滑动监听
  swiperChange(e){
    const current = e.detail.current
    const currentNum = this.data.currentNum
    this.setData({
      currentNum: current
    })

    // console.log(current)
    if (current - currentNum == 2 || current - currentNum == -1){
      // console.log("手指向左滑")
      this.changeSelectDay(-7)
      const now = new Date(this.data.selectDay.year, this.data.selectDay.month-1, this.data.selectDay.day)
      if(current == 0){
        this.setData({
          weekList:{
            preWeekList: this.data.weekList.preWeekList,
            currWeekList: this.data.weekList.currWeekList,
            nextWeekList: this.getWeekList(-7, now, this.data.selectDay.day)
          }
        })
      } else if (current == 2){
        this.setData({
          weekList: {
            preWeekList: this.data.weekList.preWeekList,
            currWeekList: this.getWeekList(-7, now, this.data.selectDay.day),
            nextWeekList: this.data.weekList.nextWeekList
          }
        })
      } else {
        this.setData({
          weekList: {
            preWeekList: this.getWeekList(-7, now, this.data.selectDay.day),
            currWeekList: this.data.weekList.currWeekList,
            nextWeekList: this.data.weekList.nextWeekList
          }
        })
      }
    } else {
      // console.log("手指向右滑")
      this.changeSelectDay(7)
      const now = new Date(this.data.selectDay.year, this.data.selectDay.month-1, this.data.selectDay.day)
      if(current == 2){
        this.setData({
          weekList: {
            preWeekList: this.getWeekList(7, now, this.data.selectDay.day),
            currWeekList: this.data.weekList.currWeekList,
            nextWeekList: this.data.weekList.nextWeekList
          }
        })
      } else if (current == 0){
        this.setData({
          weekList: {
            preWeekList: this.data.weekList.preWeekList,
            currWeekList: this.getWeekList(7, now, this.data.selectDay.day),
            nextWeekList: this.data.weekList.nextWeekList
          }
        })
      } else {
        this.setData({
          weekList: {
            preWeekList: this.data.weekList.preWeekList,
            currWeekList: this.data.weekList.currWeekList,
            nextWeekList: this.getWeekList(7, now, this.data.selectDay.day)
          }
        })
      }
    }
    
    this.setSpot()
    // console.log(this.data.selectDay)
    // console.log(this.data.weekList)
    
  },

  // 滑动时修改选中日期
  changeSelectDay(num){
    let now = new Date(this.data.selectDay.year, this.data.selectDay.month - 1, this.data.selectDay.day + num)
      let selectDay = {};
      selectDay = {
          day: now.getDate(),
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          dateString: this.formatTime(now, "Y-M-D"),
      };
      this.setData({
        selectDay
      })
      // console.log(selectDay.year+"年"+selectDay.month+"月"+selectDay.day+"日")

      // 给父组件传参
      const time = new Date(selectDay.year,selectDay.month-1,selectDay.day)
      const date = this.formatTime(time, "Y-M-D")
      this.triggerEvent('selectDayChange', date)
  },

  // 设置日历底下是否展示小圆点
  setSpot(){
    let spotArr = this.data.spot
    let weekList = this.data.weekList
    // 使用for...in...遍历对象
    // week 返回字符串 为 weekList 中的所有key 通过obj[key]获取对应value
    for(let week in weekList){
      // 遍历数组使用forEach方法
      weekList[week].forEach(date => {
        spotArr.forEach(item => {
          let tagDate = this.formatTime(item[0],"Y-M-D")
          if(tagDate==date.dateString){
            date.spot = item[1]
          }
        })
      })
    }
    this.setData({
      weekList
    })
  }


  },
  lifetimes: {
    attached() {
      console.log(this.data.defaultTime)
      let now = this.data.defaultTime ? new Date(this.data.defaultTime) : new Date()
      let selectDay = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        dateString: this.formatTime(now, "Y-M-D")
      }
      this.setData({
        selectDay,
        // 初始化基本都是当天
        today: selectDay.dateString
      })
      this.dateInit()
      console.log(this.data.selectDay)
      console.log(this.data.weekList)
    }
  },
  observers: {
    spot: function (spot) {
      this.setSpot()
    }
  }
})
