<template>
<div class="box">
    <div id="stickyTop" :class="{'is_fixed' : topdata.isFixed}">
      <h1>顶部测试{{topdata.isFixed}}-{{topdata.offsetTop}}</h1>
    </div>

  </div>
</template>

<script>
   export default {
    data(){
      return {
        topdata:{
            isFixed: false,
            offsetTop:0
        }
      }
    },
    mounted(){
      window.addEventListener('scroll',this.initHeight);
      this.$nextTick( () => {
        this.offsetTop = document.getElementById('stickyTop').offsetTop;
      });
    },
    methods:{
      initHeight () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.topdata.isFixed = scrollTop > this.topdata.offsetTop ? true : false;
        //console.log(scrollTop + "~~" + this.offsetTop);
        //onsole.log(this.topdata);
      },
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
  }
</script>

<style>
  .is_fixed{
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -250px;
    z-index: 99;
  }

</style>
