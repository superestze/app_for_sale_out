<template>
  <div id="app">
   <v-header></v-header>


    <div id="tab">
      <div class="tab-item">
         <router-link to='/goods' class='item'>商品</router-link>
       </div>
       <div class="tab-item">
           <router-link to='/ratings' class='item'>评论</router-link>
       </div>
       <div class="tab-item">
           <router-link to='sellers' class='item'>商家</router-link>
       </div>
    </div>
    
    <div>
     <router-view></router-view>
    </div>
  
  </div>
</template>

<script>
import header from './components/header/Header.vue'
import {mapGetters, mapActions, } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },

  created(){
      this.$store.dispatch('getSeller');
    },

  computed:mapGetters([
        'seller'
    ]),

  methods:mapActions([
    
    ]),

   components:{
    'v-header':header
   }

}
</script>

<style lang='less'>
  #tab{
    display: flex;
    width: 100%;
    line-height: 40px;
    left:0;
    bottom: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item{
      flex:1;
      text-align:center;
      .item{
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-active{
         color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
