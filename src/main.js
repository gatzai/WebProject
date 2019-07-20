// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import commonjs from './common.js'

import Map from './map'
import stickyslot from './stickySlot'
import hello from './Hello'
import Shop from './shop'
import echarts from 'echarts'
//引入中国地图依赖
import 'echarts/map/js/china'

console.log(echarts.version);

//data area
var num_card_data = {num:0};
var exrate = {
    bitcoin: 90000
};

var er_list = [1,2,3,4,5,6,7,8,9,10];

var area_data = {
    elec: 0,
    temperature:0
}

/* money operation*/


function updataAccount(trade)
{
    if(trade.cash)
    {
        commonjs.account.cash.amount += trade.cash;
    }
    if(trade.bitcoin)
    {
        commonjs.account.bitcoin.amount += trade.bitcoin;
    }
    if(trade.othercoin)
    {
        commonjs.account.othercoin.amount += trade.othercoin;
    }
}

function updataIncrease(trade)
{
    if(trade.cash)
    {
        commonjs.account.cash.increase += trade.cash;
    }
    if(trade.bitcoin)
    {
        commonjs.account.bitcoin.increase += trade.bitcoin;
    }
    if(trade.othercoin)
    {
        commonjs.account.othercoin.increase += trade.othercoin;
    }
}

function formatAccount(account)
{
    account.cash.amount = 0;
    return account;
}
/**/

var card_info = [
    {name:"9800GT",    heat: 0.01,  speed: 0.0001,  space:1, powercs: 10,  prize:500 , temp: 20 },
    {name:"GTX1060",   heat: 0.03,  speed: 0.001,   space:1, powercs:  9,  prize:1000, temp: 20 },
    {name:"GTX1070",   heat: 0.05,  speed: 0.005,   space:1, powercs:  8,  prize:2000, temp: 20 },
    {name:"RTX280Ti",  heat: 0.07,  speed: 0.009,   space:1, powercs:  7,  prize:4000, temp: 20 },
    {name:"Titan RTX", heat: 0.09,  speed: 0.015,   space:1, powercs:  6,  prize:8000, temp: 20 },
    {name:"RX460",     heat: 0.10,  speed: 0.03,    space:1, powercs:  5,  prize:600 , temp: 20 },
    {name:"RX470",     heat: 0.15,  speed: 0.05,    space:1, powercs:  4,  prize:2000, temp: 20 },
    {name:"RX570",     heat: 0.18,  speed: 0.08,    space:1, powercs:  3,  prize:3000, temp: 20 },
    {name:"R9",        heat: 0.22,  speed: 0.1,     space:1, powercs:  2,  prize:9000, temp: 20 }
];

var radiator_info = [
    {name:"初级散热器", effect:0, speed:0, space:2, powercs: "", prize:1}
]

var shop_info = [
    {name:"Graphic Card", items:card_info},
    {name:"Radiator",items:radiator_info}
]


/*区域*/
var selectedRegionName = "广东";
var onRackItem = {
    typs:"null",
    name:""

}

var rack = {
    capacity:6,
    occupy:0,
    items:[]
}

var regions=[
    {
        "广东":{
            curren_space: 3,
            max_space: 18,
            racks:[]
        },
        "福建":{
            curren_space: 2,
            max_space: 8,
            racks:[]
        }
    }
];

var showingRegion=[
    {
        curren_space: 4,
        max_space: 18,
        racks:[]
    }
]


//init region
for(var region in regions[0])
{
    for (var i = 0; i < regions[0][region].curren_space; i++)
    {
        var rk= {
        capacity:6,
        occupy:0,
        items:[]
        };

        regions[0][region].racks.push(rk);
    }
}

showingRegion[0] = regions[0][selectedRegionName];

//test
/**/

//对应存档的载入
var load_data = {
    bitcoins:0,
    rmb:0,
    cards:[],


}


Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

new Vue(
{
    el:'#map',
    template:'<Map/>',
    components:{Map},
    data:{
        shopinfo:shop_info
    }
})

//new Vue(
//{
//    el:'#stickyTop',
//    template:'<stickyslot/>',
//    components:{stickyslot},
//})

new Vue(
{
    el:'#shop',
    template:'<Shop/>',
    components:{Shop}
}
)

/*
new Vue(
{
    el:'#hello',
    template:'<hello/>',
    components:{hello}
}
)
*/

/* rack look like */

function lightFlash(light, isunderlimit)
{
    if(isunderlimit)
        light.style.backgroundColor = 'blue';
    else{
        light.style.backgroundColor = 'lightgreen';
    }
}

Vue.component("flashlight",
{
    data:function setdata()
    {
        return{
            deltarate: 0.25,
            bound: 2,
            limitbound:2,
        }
    },
    template:'<div ref="mh1" style=\"border-radius: 10px; background-color: lightgreen; height: 10px; width: 10px; font-size: 10px;\"></div>',
    mounted:function(){
        var testsize = this.size;
        var light = this.$refs.mh1;
        var bound = this.bound;
        var limitbound = this.limitbound;
        var deltarate = this.deltarate;
        var testbool = false;
        setInterval(function()
        {
            testbool = !testbool;

                lightFlash(light,Math.random() > 0.95);

        },100);
    },
}
);


/**/

/*add and remove card*/
function addcardInRack(card)
{
    var isfull = true;
    for (var i = 0; i < regions[0][selectedRegionName].racks.length; i++) {
        if(regions[0][selectedRegionName].racks[i].capacity - regions[0][selectedRegionName].racks[i].occupy >= card.space)
        {
            isfull = false;
            //add card in this rack
            regions[0][selectedRegionName].racks[i].items.push(card);
            regions[0][selectedRegionName].racks[i].occupy+=1;
            break;
        }
        
    }
    return isfull;
}

function removecardInRack(card)
{
    if(num_card_data.num <= 0)
    {
        num_card_data.num = 0;
        return;
    }
    updataIncrease({bitcoin:-card.speed});
    --num_card_data.num;
}
/**/


new Vue({
    el: '#content',
    data:
    {
        numcard:num_card_data,
        accountdata: formatAccount(commonjs.account),
        shopinfo:shop_info,
        erlist:er_list,
        window:0,
        /*region data*/
        regionname: selectedRegionName,
        showingregion: showingRegion,
        /**/
    },
    mounted:function()
    {
        setInterval(function(){

            //console.log(regions);
            for(var region in regions[0])
            {
                for(var i=0; i<regions[0][region].racks.length; ++i)
                {
                    for(var j=0; j<regions[0][region].racks[i].items.length; ++j)
                    {
                        var heat = 1;//regions[0][region].racks[i].items[j].heat;
                        regions[0][region].racks[i].items[j].temp += heat * 10;
                    }
                }
            }
        },1000);
    },
    methods:
    {

        addcard:function(card)
        {
            if(commonjs.account.cash.amount >= card.prize)
            {

                if(!addcardInRack(card))
                {
                    updataAccount({cash:-card.prize});
                    updataIncrease({bitcoin:card.speed});
                    ++num_card_data.num;
                }
            }
        },
        mousework:function()
        {
            var addcash = {cash: 10000};
            updataAccount(addcash);
        },
        btc2Cash:function()
        {
            var money = commonjs.account.bitcoin.amount * .2 * exrate.bitcoin;
            updataAccount({bitcoin: -commonjs.account.bitcoin.amount, cash: money});
        },
        removecard:function(indexcard,card, rack)
        {
            //
            rack.items.splice(indexcard,1);
            rack.occupy -= card.space;         //要换成space
            removecardInRack(card);
        },
        changeregion:function()
        {
            selectedRegionName = commonjs.selectedRegion;
            if(regions[0][selectedRegionName])
                showingRegion[0] = regions[0][selectedRegionName];
            this.regionname = selectedRegionName;
        },

    }
})


new Vue(
{
	el:'#pagefoot'
})


setInterval(function()
{
    updataAccount({bitcoin: commonjs.account.bitcoin.increase});
},1000);


//模拟数据波动
setInterval(function()
{
    er_list.push(Math.random()*10);
    if(er_list.length>=50)
    {  
        er_list.shift();
    }
},500);
