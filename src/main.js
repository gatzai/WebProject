// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import commonjs from './common.js'

import Map from './map'
import hello from './Hello'
import Shop from './shop'
import echarts from 'echarts'
//引入中国地图依赖
import 'echarts/map/js/china'

console.log(echarts.version);

//data area
var num_bitcoin = 0.0;
var num_card_data = {num:0};
var increasement = 0;
var exrate = {
    bitcoin: 90000
};

var er_list = [1,2,3,4,5,6,7,8,9,10];

var area_data = {
    elec: 0,
    temperature:0
}

var account_data = {
    "bitcoin":{icon:"monetization_on",      data:0.0},
    "cash":{icon:"account_balance_wallet",  data:0}

};

var card_info = [
    {name:"9800GT",    heat: 0.01,  speed: 0.0001,  space:1, powercs: "",  prize:500 },
    {name:"GTX1060",   heat: 0.01,  speed: 0.001,   space:1, powercs: "",  prize:1000},
    {name:"GTX1070",   heat: 0.01,  speed: 0.005,   space:1, powercs: "",  prize:2000},
    {name:"RTX280Ti",  heat: 0.01,  speed: 0.009,   space:1, powercs: "",  prize:4000},
    {name:"Titan RTX", heat: 0.01,  speed: 0.015,   space:1, powercs: "",  prize:8000},
    {name:"RX460",     heat: 0.01,  speed: 0.03,    space:1, powercs: "",  prize:600 },
    {name:"RX470",     heat: 0.01,  speed: 0.05,    space:1, powercs: "",  prize:2000},
    {name:"RX570",     heat: 0.01,  speed: 0.08,    space:1, powercs: "",  prize:3000},
    {name:"R9",        heat: 0.01,  speed: 0.1,     space:1, powercs: "",  prize:9000}
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
    increasement -= card.speed;
    --num_card_data.num;
}
/**/

//test
var test_index = 10;

new Vue({
    el: '#content',
    data:
    {
        numcard:num_card_data,
        accountdata:account_data,
        shopinfo:shop_info,
        erlist:er_list,
        window:0,
        /*region data*/
        showingregion: showingRegion,
        /**/
    },
    methods:
    {

        addcard:function(card)
        {
            if(account_data.cash.data >= card.prize)
            {

                if(!addcardInRack(card))
                {
                    account_data.cash.data -= card.prize;            
                    increasement += card.speed;
                    //
                    ++num_card_data.num;
                }
            }
        },
        mousework:function()
        {
            account_data.cash.data += 10000;
        },
        btc2Cash:function()
        {
            var money = account_data.bitcoin.data * .2 * exrate.bitcoin;
            account_data.bitcoin.data = 0;
            account_data.cash.data += money
        },
        racktest:function(rack)
        {
            rack.items.push({name:++test_index});
            //console.log(i.name);
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
            showingRegion[0] = regions[0][commonjs.selectedRegion];

        }
    }
})


new Vue(
{
	el:'#pagefoot'
})


//模拟数据波动
setInterval(function()
{
    account_data.bitcoin.data += increasement;
},1000);

setInterval(function()
{
    er_list.push(Math.random()*10);
    if(er_list.length>=50)
    {  
        er_list.shift();
    }
},500);
