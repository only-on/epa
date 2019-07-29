<template>
<div id="body">
  <Row style="height:65px">
    <Col span="3" style="line-height: 65px;display: flex;align-items: center">
      <div class="avatar"></div>
      <span class="titleText" style="font-size: 20px">西安市生态环境局</span>
    </Col>
    <Col span="18" class="titleBar">
      <span>西安市流动污染监管平台</span>
    </Col>
    <Col span="3">
      <Row  type="flex" justify="end" style="height: 65px;display: flex;align-items: center">
        <span class="titleText" style="font-size: 14px;margin-right: 20px">{{currentTime}}</span>
        <div class="exitBtn common" @click="logout">
          <Icon type="ios-power" size="16"/>
          退出
        </div>
      </Row>
    </Col>
  </Row>
 <div style="width: 100%">
   <Row type="flex" justify="start" :gutter="24" style="width: 100%">
     <!--左侧-->
     <Col span="6" class="leftBox">
       <div class="common">
          <Row type="flex" justify="start" class="itemTitle">加油站运营状况统计</Row>
          <div style="display: flex;flex-direction: column;justify-content: space-between;height:65%">
            <Row>
              <Col span="8">
              <Row :gutter="16">
                <Col span="8">
                <img src="../../assets/img/allGasStation.png" alt="" class="gasItemImg">
                </Col>
                <Col span="16">
                <Row type="flex" justify="start">
                  <span class="itemVal">111345</span>
                  <span class="itemUnit">（个）</span>
                </Row>
                <Row type="flex" justify="start" class="itemUnit">全市加油站</Row>
                </Col>
              </Row>
              </Col>
              <Col span="8">
              <Row :gutter="16">
                <Col span="8">
                <img src="../../assets/img/normalIcon.png" alt="" class="gasItemImg">
                </Col>
                <Col span="16">
                <Row type="flex" justify="start">
                  <span class="itemVal">110142</span>
                  <span class="itemUnit">（个）</span>
                </Row>
                <Row type="flex" justify="start" class="itemUnit">正常加油站</Row>
                </Col>
              </Row>
              </Col>
              <Col span="8">
              <Row :gutter="16">
                <Col span="8">
                <img src="../../assets/img/oliAmount.png" alt="" class="gasItemImg">
                </Col>
                <Col span="16">
                <Row type="flex" justify="start">
                  <span class="itemVal">583</span>
                  <span class="itemUnit">（L）</span>
                </Row>
                <Row type="flex" justify="start" class="itemUnit">今日加油量</Row>
                </Col>
              </Row>
              </Col>
            </Row>
            <Row>
              <Col span="8">
              <Row :gutter="16">
                <Col span="8">
                <img src="../../assets/img/warnIcon.png" alt="" class="gasItemImg">
                </Col>
                <Col span="16">
                <Row type="flex" justify="start">
                  <span class="itemVal">77</span>
                  <span class="itemUnit">（个）</span>
                </Row>
                <Row type="flex" justify="start" class="itemUnit">当前预警油站</Row>
                </Col>
              </Row>
              </Col>
              <Col span="8">
              <Row :gutter="16">
                <Col span="8">
                <img src="../../assets/img/redIcon.png" alt="" class="gasItemImg">
                </Col>
                <Col span="16">
                <Row type="flex" justify="start">
                  <span class="itemVal">77</span>
                  <span class="itemUnit">（个）</span>
                </Row>
                <Row type="flex" justify="start" class="itemUnit">当前告警油站</Row>
                </Col>
              </Row>
              </Col>
              <Col span="8">
              <Row :gutter="16">
                <Col span="8">
                <img src="../../assets/img/equipIcon.png" alt="" class="gasItemImg">
                </Col>
                <Col span="16">
                <Row type="flex" justify="start">
                  <span class="itemVal">34</span>
                  <span class="itemUnit">（个）</span>
                </Row>
                <Row type="flex" justify="start" class="itemUnit">设备故障油站</Row>
                </Col>
              </Row>
              </Col>
            </Row>
          </div>
       </div>
       <div class="common" style="position: relative">
         <Row type="flex" justify="start" class="itemTitle">各品牌油站数量统计</Row>
          <div id="gasNumber"></div>
       </div>
       <div class="common">
         <Row type="flex" justify="start" class="itemTitle">辖区告警数量趋势</Row>
         <div id="alarmTrend"></div>
       </div>
     </Col>
     <!--中间-->
     <Col span="12">
     <div style="width: 100%;height: 56vh;margin-bottom: 20px" class="common mapBox">
        <div id="map"></div>
     </div>
     <Row style="width: 100%;height: 28vh;">
       <div style="height: 100%;width: 73%;float: left;padding:10px 15px;position: relative " class="common">
         <Row type="flex" justify="start" class="itemTitle">各区油站数量统计</Row>
         <div id="areaCount"></div>
       </div>
       <div style="height: 100%;width:25%;float: right;padding:10px 15px;" class="common">
         <Row type="flex" justify="start" class="itemTitle">油气浓度占比</Row>
         <div id="gasContent"></div>
       </div>
     </Row>
     </Col>
     <!--右侧-->
     <Col span="6" class="rightBox">
       <div  class="common" style="position: relative">
         <Row type="flex" justify="start" class="itemTitle">工单处理情况统计</Row>
         <div id="repairOrder"></div>
       </div>
       <div  class="common" style="position: relative">
         <Row type="flex" justify="start" class="itemTitle">告警分类统计</Row>
          <div id="customBar"></div>
       </div>
       <div class="common">
         <Row type="flex" justify="start" class="itemTitle">本月气液比告警数量</Row>
          <div id="monthAlarm"></div>
       </div>
     </Col>
   </Row>
 </div>
  <Row style="padding: 10px 0;">
    <span class="titleText">CopyRight © 西安通尚电子科技有限公司 .All Rights Reserved 2019</span>
  </Row>
</div>
</template>

<script>
  import echarts from 'echarts'
  import infoBox from '@/utils/InfoBox.min.js'
  import styleJson from '@/utils/custom_map_config.json'
  export default {
    data () {
      return {
        dateTimer: null,
        currentTime: '',
        map: '',
        list: [],
        lastInfoWindow: null,
        openFlag: true
      }
    },
    methods: {
      formatDate (date) {
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        let minute = date.getMinutes()
        let seconds = date.getSeconds()
        minute = minute < 10 ? ('0' + minute) : minute
        seconds = seconds < 10 ? ('0' + seconds) : seconds
        let newDate = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds
        return newDate
      },
      // 各品牌油站数量统计
      drawBar (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let option = {
          grid: {
            bottom: "15%",
            left:'10%',
            right: '15%',
            top: '30%',
            containLabel: true
          },
          tooltip: {
            trigger: "axis",
            textStyle: {
              align: 'left'
            },
            axisPointer: {
              type: "line",
              label: {
                // show: true
              }
            }
          },
          legend: {
            data: ["加油站数量","加油量" ],
            top: "2%",
            left: '45%',
            textStyle: {
              color: "#9E9E9E"
            }
          },
          xAxis: {
            data: [
              "中石化",
              "中石油",
              "延长壳牌",
              "中海油",
              "道达尔"

            ],
            axisTick: {
              show: true //隐藏X轴刻度
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#9E9E9E" //X轴文字颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#9E9E9E'
              }
            },
          },
          yAxis: [{
            type: "value",
            name: "数量（个)",
            nameTextStyle: {
              color: "#9E9E9E"
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle:{
                color: '#9E9E9E'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#9E9E9E"
              }
            }
          },
            {
              type: "value",
              name: "加油量（L)",
              nameTextStyle: {
                color: "#9E9E9E"
              },
              position: "right",
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle:{
                  color: '#9E9E9E'
                }
              },
              axisLabel: {
                show: true,
                // formatter: "{value} %", //右侧Y轴文字显示
                textStyle: {
                  color: "#9E9E9E"
                }
              }
            },
            {
              type: "value",
              gridIndex: 0,
              min: 0,
              max: 10000000,
              splitNumber: 5,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#353E5F'
                }
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              }
            }
          ],
          series: [{
            name: "加油量",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "emptyCircle", //标记的图形为实心圆
            symbolSize: 8, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#FFC534"
            },
            lineStyle: {
              color: "#FFC534"
            },
            data: [12, 3.8, 4.8, 3.5, 2.9]
          },
            {
              name: "加油站数量",
              type: "bar",
              barWidth: 12,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#C032FF"
                  },
                    {
                      offset: 1,
                      color: "#6D45FC"
                    }
                  ])
                },
                barBorderRadius: 8,
              },
              data: [4.2, 3.8, 4.8, 3.5, 2.9]
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      // 辖区告警数量趋势
      drawLine (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var data = [2220, 1682, 2791, 3000, 4090, 3230, 2910];
        var xdata = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var option = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            left: "5%",
            right: '10%',
            top: '10%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xdata,
            triggerEvent: true,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#9E9E9E'
              }
            },
            axisTick: {
              show: true,
              alignWithLabel: true,
              lineStyle: {
                color: '#9E9E9E'
              }
            },
            axisLabel: {
              color: '#9E9E9E',
              fontSize: 14
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#9E9E9E',
              fontSize: 14
            }
          },
          series: [{
            data: data,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              color: "#D04E55"
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 14,
              }
            },
            areaStyle: {
              color: 'rgba(208, 78, 85, 0.2)'
            }
          }]
        }
        vm['chart'][id].setOption(option)
      },
      // 各区油站数量统计
      drawStackBar (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: "5%",
            right: '10%',
            top: '25%',
            bottom: '10%',
            containLabel: true
          },
          color: ["#FF6767", "#B15EDF","#86F4AA"],
          legend: {
            right:'10%',
            top: '5%',
            data:  ["报警", "故障","正常"],
            textStyle: {
              color: '#9E9E9E'
            }
          },
          xAxis: [{
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#9E9E9E" //X轴文字颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#9E9E9E'
              }
            },
            data: ["碑林区", "雁塔区", "未央区", "莲湖区", "新城区", "长安区"]
          }],
          yAxis: [{
            type: "value",
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#9E9E9E" //X轴文字颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#9E9E9E'
              }
            },
          }],
          series: [{
            data: [2, 5, 7, 5, 6, 5],
            name: "报警",
            stack: "one",
            type: "bar",
            barWidth: 15,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 14,
              }
            },
          }, {
            data: [5, 7, 5, 6, 5, 2],
            name: "故障",
            stack: "one",
            type: "bar",
            barWidth: 15,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 14,
              }
            },
            // label: {
            //   show: true
            // }
          },{
            data: [5, 2, 5, 7, 5, 6],
            name: "正常",
            stack: "one",
            type: "bar",
            barWidth: 15,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 14,
              }
            },
          }, ]
        }
        vm['chart'][id].setOption(option)
      },
      // 油气浓度占比
      drawPie (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let data = [
          {
            name: '<1000ppm',
            value: 60
          },
          {
            name: '2000-4000ppm',
            value: 25
          },
          {
            name: '>4000ppm',
            value: 15
          }
        ]
        var option = {
          legend: {
            orient: 'vertical',
            left:'2%',
            bottom: '20%',
            align:'left',
            textStyle: {
              color:'#4D94A6'
            },
            itemWidth: 10,
            itemHeight: 10,
            data:data
          },
          color: ['#85E3C3', '#FCBF59', '#FF7070'],
          series: [
            {
              name:'标题',
              type:'pie',
              center: ['50%', '25%'],
              radius: ['30%', '50%'],
              clockwise: false, //饼图的扇区是否是顺时针排布
              hoverAnimation: false,
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outter',
                  formatter:function (parms){
                    return parms.data.value + '%'
                  }
                }
              },
              labelLine: {
                normal: {
                  length:5,
                  length2:3,
                  smooth:true,
                }
              },
              data:data
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      // 工单处理情况统计
      drawLine1 (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var option = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          legend: {
            color: ["#F58080", "#47D8BE", "#F9A589"],
            data: ['工单总量', '解决数量'],
            top: '2%',
            right: '10%',
            textStyle: {
              color: "#9E9E9E"
            }
          },
          grid: {
            top: '25%',
            left: '3%',
            right: '10%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: [100,200,20,30,60,89],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#9E9E9E" //X轴文字颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#353E5F'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: "#9E9E9E"
              },
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#353E5F'
              }
            },
            nameTextStyle: {
              color: "#9E9E9E"
            }
          },
          series: [{
            name: '工单总量',
            type: 'line',
            symbolSize: 8,
            data: [800,900,220,130,660,289],
            color: "#FF5353",
            smooth: true
          },
            {
              name: '解决数量',
              type: 'line',
              symbolSize: 8,
              data: [123,568,111,222,123,56],
              color: "#36F9C6",
              smooth: true
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      // 告警分类统计
      drawCustomBar (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let data = [[14,10,5],[15,10,11]]
        let nameList = ['报警', '预警']
        let offsetArr = [[-15,0], [15,0]]
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          grid: {
            left: '5%',
            right: '10%',
            bottom: '10%',
            containLabel: true
          },
          legend: {
            data: ['报警', '预警'],
            top: '2%',
            right: '10%',
            textStyle: {
              color: "#9E9E9E"
            }
          },
          color: ['#873A4E', '#866D4E'],
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#9E9E9E'
              }
            },
            axisLine: {
              show: false
            },
            data: ['油罐', '气液比', '油气浓度'],
          }],
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: '#9E9E9E'
              }
            },
            splitLine:{
              show: false
            },
            axisTick:{
              show: false
            },
            axisLine:{
              show: false
            }
          },
          series: (function () {
            let result = []
            data.forEach(function (item,index) {
              result.push(
                {
                  name: nameList[index],
                  type: 'pictorialBar',
                  symbol: 'path://M1519,579 C1520.72171,590.413866 1522.40297,598.289987 1524.0438,602.62836 C1525.68463,606.966734 1528.3367,609.75728 1532,611 L1506,611 C1509.62627,609.75728 1512.24715,606.966734 1513.86263,602.62836 C1515.47811,598.289987 1517.19057,590.413866 1519,579 Z',
                  barWidth: 30,
                  symbolOffset: offsetArr[index],
                  data: item
                }
              )
            })
            return result
          })()
        }
        vm['chart'][id].setOption(option)
      },
      // 本月气液比告警数量
      drawCurrentMoth (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let option = {
          tooltip:{
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          grid: {
            top: '5%',
            left: '5%',
            bottom: '10%',
            right: '5%',
            containLabel: true
          },
          xAxis: [{
            show: false,
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            offset: '10',
            axisLabel: {
              textStyle: {
                color: '#9E9E9E',
                fontSize: '14',
              }
            },
            data: ['碑林区','雁塔区','未央区','莲湖区','新城区','灞桥区','长安区', '临潼区']
          },
            {
              axisTick: 'none',
              axisLine: 'none',
              type: 'category',
              axisLabel: {
                formatter:function(value){
                  if (value.includes('90%') ) {
                    return '{a|' + value + '}'
                  } else if (value === '0%') {
                    return '{c|' + value + '}'
                  }
                  return '{b|' + value + '}'
                },
                rich: {
                  a: {
                    color: '#46F6AD'
                  },
                  b: {
                    color: '#FF2F2F'
                  },
                  c: {
                    color: '#999'
                  }
                },
                textStyle: {
                  fontSize: 18,
                }
              },
              data: ['90% ↑', '25% ↓','40% ↓','0%','30% ↓','50% ↓','60% ↓','20% ↓'],
            },
          ],
          series: [{
            name: '', // blue bar
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    {offset: 0, color: '#FFA866'},
                    {offset: 1, color: '#FF5959'},                   //柱图渐变色
                  ]
                )
              },
            },
            data: [56,30,45,36,27,40,30,90],
            label: {
              normal: {
                show: false,
              }
            },
            animationEasing: 'elasticOut',
          }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      // 地图加载
      loadmap () {
        const map = new BMap.Map('map', { enableMapClick: false })
        this.map = map
        // 设置地图中心坐标
        map.centerAndZoom('西安',11)
        // 设置地图鼠标滚轮放大缩小
        map.enableScrollWheelZoom()
        map.setMapStyle({style:'googlelite'})
        this.getDistribution()
      },
      getDistribution () {
        this.list = [
          {
            companyName: '北新集团建材股份有限公司',
            address: '陕西西安雁塔区',
            warningNum: 3,
            CallNum: 2,
            address_x: 108.892252,
            address_y: 34.198946
          },
          {
            companyName: 'xxxxxxxx有限公司',
            address: '陕西西安未央区',
            warningNum: 1,
            CallNum: 3,
            address_x: 108.949376,
            address_y: 34.301295
          },
          {
            companyName: 'xxxxxxxx有限公司',
            address: '陕西西安西咸新区秦汉新城',
            warningNum: 1,
            CallNum: 3,
            address_x: 108.552585,
            address_y: 34.360466
          }
        ]
        let pointArr = []
        for (let i = 0; i < this.list.length; i++) {
          let s = {}
          s.companyName = this.list[i].companyName
          s.warningNum = this.list[i].warningNum
          s.CallNum = this.list[i].CallNum
          s.address = this.list[i].address
          let gpsX = this.list[i].address_x
          let gpsY = this.list[i].address_y
          s.point = new BMap.Point(gpsX, gpsY)
          pointArr.push(s.point)
          let map = this.map
          this.addMarker(map, s, pointArr)
        }
      },
      addMarker (map, s, pointArr) {
        let thi = this
        let marker
        let iconImg = ''
        if (s.CallNum > 2) {
          iconImg = require('@/assets/img/wlocation.png')
        } else {
          iconImg = require('@/assets/img/nlocation.png')
        }
        let myIcon = new BMap.Icon(iconImg, new BMap.Size(40, 55), {anchor: new BMap.Size(14, 25), infoWindowAnchor: new BMap.Size(10, -20)})
        marker = new BMap.Marker(s.point, {icon: myIcon})
        map.addOverlay(marker)
        map.setViewport(pointArr)
        let sContent = '<div style="position: relative">' +
          "<div style='line-height:30px;font-size:16px;margin-bottom: 10px'>" + s.companyName + '</div>' +
          "<div style='height:25px;'>地址：&nbsp;" + s.address + '</div>' +
          "<div style='height:25px;'>预警数量：&nbsp;" + s.warningNum + '</div>' +
          "<div style='height:25px;'>报警数量：&nbsp;" + s.CallNum + '</div>' +
          "<div style='position: absolute;bottom:-40px;left:0;right:0;margin-left: auto;margin-right: auto;width:0;height: 0;border-top:20px solid rgba(77, 157, 232, 0.8);border-left:10px solid transparent;border-right:10px solid transparent'>" + '</div>' +
          '</div>'
        let opts = {
          boxStyle: {
            width: '300px',
            // height: '240px',
            background: 'rgba(77, 157, 232, 0.8)',
            borderRadius: '8px',
            padding: '10px 20px 20px',
            color: '#fff',
            fontSize: '14px'
          },
          enableAutoPan: true,
          align: 1,
          // closeIconUrl: require('@/assets/close.png'),
          // closeIconMargin: '3px 10px',
          // closeIconZIndex: 1,
          // closeIconWidth: '15px'
        }
        let infoWindow =  new BMapLib.InfoBox(map, sContent, opts)// 创建信息窗口对象
        // 默认打开第一个信息窗体
        if (thi.openFlag === true) {
          infoWindow.open(marker)
          thi.openFlag = false
        }
        marker.addEventListener('mouseover', function (e) {
          marker.setTop(true)
          // marker.enableDragging() // 标注可拖拽
          if (thi.lastInfoWindow) {
            // 判断上一个窗体是否存在，若存在则执行close
            thi.lastInfoWindow.close()
          }
          thi.lastInfoWindow = infoWindow
          infoWindow.open(marker)
        })
        marker.addEventListener('mouseout', function (e) {
          marker.setTop(false)
          thi.lastInfoWindow.close()
          // infoWindow.close(marker)
          // this.closeInfoWindow(infoWindow)
        })
        marker.addEventListener('click', function (e) {
          infoWindow.open(marker)
        })
      },
      logout () {
        this.$router.push({path:'/'})
      },
    },
    mounted:function () {
      let th = this
      th.drawBar('gasNumber')
      th.drawLine('alarmTrend')
      th.drawStackBar('areaCount')
      th.drawPie('gasContent')
      th.drawLine1('repairOrder')
      th.drawCustomBar('customBar')
      th.drawCurrentMoth('monthAlarm')
      th.loadmap()
      th.dateTimer = setInterval(() => {
        th.currentTime = th.formatDate(new Date())
      }, 1000)
    },
    beforeDestroy () {
      window.clearInterval(this.dateTimer)
    },
    created:function () {
    }
  }
</script>

<style  scoped>
  #body{
    background: #050F3A;
    padding: 0 30px;
    height: 100vh;
    width: 100%;
    color: #fff;
    overflow: auto;
  }
  .titleBar{
    height: 100%;
    background: url("../../assets/img/titleBack.png") no-repeat;
    background-size: 100% 90%;
  }
  .titleBar>span{
    color:#64E0F4;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 60px;
  }
  .avatar{
    width: 40px;
    height: 40px;
    background:rgba(216,216,216,0.4);
    border-radius: 50%;
    float: left;
    margin-right: 10px;
  }
  .titleText{
    color:#5CCEE4;
  }
  .exitBtn{
    color: #5CCEE4;
    float: left;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    cursor: pointer;
  }
  .common{
    border: 1px solid rgba(167,241,255,0.38);
    position: relative;
  }
  .common:before{
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-left: 2px solid #4CBCFF;
    border-top: 2px solid #4CBCFF;
    position: absolute;
    left: -1px;
    top:-1px;
  }
  .common:after{
    content: '';
    display: block;
    width: 9px;
    height: 10px;
    border-right: 2px solid #4CBCFF;
    border-bottom: 2px solid #4CBCFF;
    position: absolute;
    right: -1px;
    bottom:-1px;
  }

  .leftBox>div{
    width: 100%;
    margin-bottom: 20px;
    padding:10px 15px ;
  }
  .leftBox>div:first-child{
    height: 22vh;
  }
  .leftBox>div:nth-child(2){
    height: 32vh;
  }
  .leftBox>div:last-child{
    height: 28vh;
  }
  .itemTitle{
    font-size: 16px;
    margin-bottom: 20px;
  }
  .gasItemImg{
    width: 40px;height: 40px
  }
  .itemVal{
    font-size: 14px;
    font-weight: bold;
  }
  .leftBox .itemUnit{
    color: #9E9E9E;
  }
  #gasNumber{
    width: 100%;
    height: 100%;
    position: absolute;
    top:5px;
    left: 0;
  }
  #alarmTrend{
    width: 100%;
    height:90%;
  }
  #map{
    width: 100%;
    height: 100%;
  }
  #areaCount{
    width: 100%;
    height: 100%;
    position: absolute;
    top:5px;
    left: 0;
  }
  #gasContent{
    width: 100%;
    height: 95%;
  }
  .rightBox > div{
    width: 100%;
    margin-bottom: 20px;
    padding:10px 15px ;
  }
  .rightBox>div:first-child{
    height: 22vh;
  }
  .rightBox>div:nth-child(2){
    height: 28vh;
  }
  .rightBox>div:last-child{
    height: 32vh;
  }
  #repairOrder{
    width: 100%;
    height: 100%;
    position: absolute;
    top:5px;
    left: 0;
  }
  #customBar{
    width: 100%;
    height: 100%;
    position: absolute;
    top:5px;
    left: 0;
  }
  #monthAlarm{
    width: 100%;
    height:90%;
  }
</style>
