<template>
  <div> 
	 <div id="map" style="height: 800px; background-color: purple;"></div>
   <v-layout>
     <v-flex sm12>
        <v-btn dark block id="buyregion">购买区域</v-btn>
     </v-flex>
     <v-flex sm12>
        <v-btn dark block id="addline">添加线路</v-btn>
     </v-flex>
     <v-flex sm12>
        <v-btn dark block id="delline">删除线路</v-btn>
     </v-flex>
   </v-layout>
  </div>
</template>


<script>
  var chinaProvinceCoor = {
    "黑龙江": {pos:[127.9688, 45.368],        value: 5 },
    "内蒙古": {pos:[110.3467, 41.4899],       value: 50 },
    "吉林":   {pos:[125.8154, 44.2584],       value: 50 },
    "北京":   {pos:[116.4551, 40.2539],       value: 50 },
    "辽宁":   {pos:[123.1238, 42.1216],       value: 50 },
    "河北":   {pos:[114.4995, 38.1006],       value: 50 },
    "天津":   {pos:[117.4219, 39.4189],       value: 50 },
    "山西":   {pos:[112.3352, 37.9413],       value: 50 },
    "陕西":   {pos:[109.1162, 34.2004],       value: 50 },
    "甘肃":   {pos:[103.5901, 36.3043],       value: 50 },
    "宁夏":   {pos:[106.3586, 38.1775],       value: 50 },
    "青海":   {pos:[101.4038, 36.8207],       value: 50 },
    "新疆":   {pos:[87.9236, 43.5883],        value: 50 },
    "西藏":   {pos:[91.11, 29.97],            value: 50 },
    "四川":   {pos:[103.9526, 30.7617],       value: 50 },
    "重庆":   {pos:[108.384366, 30.439702],   value: 50 },
    "山东":   {pos:[117.1582, 36.8701],       value: 50 },
    "河南":   {pos:[113.4668, 34.6234],       value: 50 },
    "江苏":   {pos:[118.8062, 31.9208],       value: 50 },
    "安徽":   {pos:[117.29, 32.0581],         value: 50 },
    "湖北":   {pos:[114.3896, 30.6628],       value: 50 },
    "浙江":   {pos:[119.5313, 29.8773],       value: 50 },
    "福建":   {pos:[119.4543, 25.9222],       value: 50 },
    "江西":   {pos:[116.0046, 28.6633],       value: 50 },
    "湖南":   {pos:[113.0823, 28.2568],       value: 50 },
    "贵州":   {pos:[106.6992, 26.7682],       value: 50 },
    "云南":   {pos:[102.9199, 25.4663],       value: 50 },
    "广东":   {pos:[113.12244, 23.009505],    value: 300 },
    "广西":   {pos:[108.479, 23.1152],        value: 50 },
    "海南":   {pos:[110.3893, 19.8516],       value: 50 },
    "上海":   {pos:[121.4648, 31.2891],       value: 50 },
    "test":   {pos:[50,50],                   value:200},
  };

  var lineData = [
    {"fromName":"广东", "toName":"福建","coords":name2Pos("广东","福建")},
    {"fromName":"广东", "toName":"北京","coords":name2Pos("广东","北京")},
    {"fromName":"广东", "toName":"上海","coords":name2Pos("广东","上海")},
  ];

	var geoCoordMap = {
    	"武汉":[114.31,30.52],
    	"大庆":[125.03,46.58],
    	"test":[50,50]
	};

  var isdeleting = false;
  var isadding = false;
  var addIndex = 0;
  var addCatch = {
    "fromName":"", "toName":"","coords":[]
  };
  function deleteLine()
  {
    isdeleting = true;
  }
  function addLine()
  {
    addIndex = 0;
    isadding = true;
  }
  function clearCatch()
  {
    addCatch['fromName'] = "";
    addCatch['toName'] = "";
    addCatch['coords'] = [];
  }
  function name2Pos(name1, name2)
  {
    if(name1 == '' || name2 == '')return ['',''];
    return [chinaProvinceCoor[name1].pos, chinaProvinceCoor[name2].pos];
  }

	var convertData = function (data) {
    	var res = [];
    	//for (var i = 0; i < data.length; i++) {
    	//    var geoCoord = chinaProvinceCoor[data[i].name];
    	//    if (geoCoord) {
    	//        res.push(geoCoord.concat(data[i].value));
    	//    }
    	//}

      for(var k in data)
      {
        var geoCoord = data[k].pos;
        geoCoord.push(data[k].value);
        res.push(geoCoord);
      }
    	return res;
	};



  function onPoint()
  {
    console.log(this.position);

  }

  import echarts from 'echarts'
  import commonjs from './common.js'
	export default
	{

		name:'',		
		methods:{
            drawMap(id){
              let myChart = echarts.init(document.getElementById(id))
              myChart.setOption({
    				tooltip: {
    				    trigger: 'item',
                //formatter:function(params){
                //  var name = params.name;
                //  return "<span>" + params.value[2] + params +"</span>";
                //}
    				},
            legend: {
              orient: 'vertical',
              top: 'bottom',
              left: 'right',
              data:['ProvincePoint','line'],
              textStyle: {
                color: '#fff'
              }
            },
            geo: {
        				map: 'china',
        				roam: true,
                scaleLimit:{
                  max:10,min:1
                },
                center: [115,23],
                zoom:7,
        				label: {
        				    emphasis: {
        				        show: false
        				    }
        				},
        				itemStyle: {
        				    normal: {
        				        areaColor: '#323c48',
        				        borderColor: '#111'
        				    },
        				    emphasis: {
        				        areaColor: '#2a333d'
        				    }
        				}
    				},
            visualMap:{
              min:0,
              max:300,
              type: 'piecewise',
              realtime:false,
              splitNumber:5
            },
            series: [
   					    {
   					        name: 'ProvincePoint',
   					        type: 'scatter',
   					        coordinateSystem: 'geo',
   					        data: convertData(chinaProvinceCoor),
   					        symbolSize: 12,
   					        label: {
   					            normal: {
   					                show: false
   					            },
   					            emphasis: {
   					                show: false
   					            }
   					        },
   					        itemStyle: {
   					            emphasis: {
   					                borderColor: '#fff',
   					                borderWidth: 1
   					            }
   					        }
   					    },
                {
                  name:"line",
                  type:'lines',
                  coordinateSystem:'geo',
                  zlevel:2,
                  large:true,
                  effect:{
                    show: true,
                    //constantSpeed: 30,
                    //symbol: 'pin',
                    symbolSize: 5,
                    //trailLength: 0,
                  },
                  lineStyle:{
                    normal:{
                      color: new echarts.graphic.LinearGradient(0,0,0,1,[
                        {offset:0, color:'#58B3CC'},{offset:1,color:'#F58158'}
                        ], false),
                      width: 1,
                      opacity: 0.2,
                       curveness: 0.1
                    }
                  },
                  data:lineData
                }
   					]
               });

             	myChart.on('click',function(param){
                  var pos = [param.event.offsetX,param.event.offsetY];
                  var geopos = myChart.convertFromPixel('geo', pos);
                  chinaProvinceCoor["test"].pos = geopos;
                  console.log(geopos);

                  myChart.setOption({
                    series:[
                      {
                        data: convertData(chinaProvinceCoor)
                      },
                      {
                        data:lineData
                      }
                    ]
                  });

                  //console.log(param);
                  if(isdeleting)
                  {
                    if(param.componentSubType == "lines")
                    for(var i=0; i<lineData.length; ++i)
                    {
                      if(lineData[i]['fromName'] == param.data['fromName'] && lineData[i]['toName'] == param.data['toName'])
                      {
                        lineData.splice(i,1);
                        myChart.setOption({
                          series:[
                            {
                            },
                            {
                              data:lineData
                            }
                          ]
                        });
                        isdeleting = false;
                        break;
                      }
                    }
                  }
                  else
                  {

                  }

                  if(isadding)
                  {
                    if(param.componentSubType == "scatter")
                    {
                      var scatter_name = param.data[2];
                      if(addIndex == 0)
                      {
                        clearCatch();
                        addCatch['fromName'] = scatter_name;
                        addCatch['coords'].push(chinaProvinceCoor[scatter_name].pos);
                        ++addIndex;
                      }
                      else if(addIndex == 1)
                      {
                        addCatch['toName'] = scatter_name;
                        addCatch['coords'].push(chinaProvinceCoor[scatter_name].pos);
                        var newline = {"fromName": addCatch["fromName"], "toName":addCatch["toName"], "coords":addCatch["coords"]};
                        lineData.push(newline);
                        myChart.setOption({
                          series:[
                            {
                            },
                            {
                              data:lineData
                            }
                          ]
                        });
                        clearCatch();
                        isadding = false;
                      }

                    }
                  }
                  else
                  {
                    if(param.componentSubType == "scatter")
                    {
                      commonjs.selectedRegion = param.data[2];
                      console.log(commonjs.selectedRegion);
                    }
                  }
               	});
            }

		},

		mounted()
		{
            this.$nextTick(function() {
                this.drawMap('map');
                var delline = document.getElementById('delline');
                delline.addEventListener('click', deleteLine,false);

                var addline = document.getElementById('addline');
                addline.addEventListener('click', addLine,false);
            })
		}
	}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
