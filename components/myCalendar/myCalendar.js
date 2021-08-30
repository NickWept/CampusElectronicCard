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
      value: '2021-8-30'
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
    selectDay: {},
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

    dateInit( setDay = this.data.selectDay.day, setYear =  this.data.selectDay.year, setMonth = this.data.selectDay.month){
      // 从周一到周日，三组数据，上周 本周 下周
      let preWeekList = [];
      let nextWeekList = [];
      let currWeekList = [];
      let now = new Date(setYear, setMonth - 1 , setDay)

      let that = this
      // num 为 0 获取本周list， 为 -7 获取上周list  为7获取下周list
      let getWeekList = function (num, time=now, day = setDay){
        let weekList = [];
        for (let i=0; i<7; i++){
          const now2 = new Date(time)
          // 从周一到周日
          const currDate = now2.getDay() === 0 ? 6 : now2.getDay() - 1
          now2.setDate(day - currDate + i + num)
          // console.log(this.data.selectDay.day, currDate, i)
          // console.log(now2.getFullYear(), now2.getMonth(), now2.getDate())
          let obj = {};
          obj = {
            day: now2.getDate(),
            month: now2.getMonth() + 1,
            year: now2.getFullYear(),
            dateString: that.formatTime(now2, "Y-M-D"),
          };

          weekList[i] = obj;
          
        }
        // console.log(weekList)
        return weekList
      }

      preWeekList = getWeekList(-7)
      currWeekList = getWeekList(0)
      nextWeekList = getWeekList(7)
      
      
      this.setData({
        weekList: {
          preWeekList,
          currWeekList,
          nextWeekList,
        }
      })
      
      // ==========================我是分割线================================
      // 下面是显示周日到周六的代码，只有一个当前周
      // let currWeekList = [];
      // let now = new Date(setYear, setMonth - 1)
      // let startWeek = now.getDay();
      // for(let i=0; i<7; i++){
      //   // 从周日到周六
      //   const now2 = new Date(now) 
      //   now2.setDate(Math.ceil((this.data.selectDay.day + startWeek) / 7) * 7 - 6 - startWeek + i)
      //   let obj = {};
      //     obj = {
      //       day: now2.getDate(),
      //       month: now2.getMonth() + 1,
      //       year: now2.getFullYear(),
      //       dateString: this.formatTime(now2, "Y-M-D")
      //     };
      //     currWeekList[i] = obj;
      // }
      // this.setData({
      //   currWeekList
      // })
          
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
      } else if (this.data.selectDay.day !== day){
        this.setData({
          selectDay
        })
      }
      console.log(year+"年"+month+"月"+day+"日")
  },

  swiperChange(e){

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
        selectDay
      })
      this.dateInit()
    }
  },
  observers: {
    spot: function (spot) {
      this.setSpot()
    }
  }
})
