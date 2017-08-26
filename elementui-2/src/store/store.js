import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import BScroll from 'better-scroll'

Vue.use(Vuex);

var state={
	seller:{},
	goods:{},
	detailShow:false,

}

const mutations={
	getSeller(state){
	    axios.get('../../static/data.json').then((res)=>{
	        state.seller=res.data.seller
	        state.goods=res.data.goods;
	    }).catch((err)=>{
	      console.log(err);
	    })
	},

	showDetail(state){
		state.detailShow=true;
	},

	hideDetail(state){
		state.detailShow=false;
	}
}

const actions={
	getSeller:({commit})=>{
		commit('getSeller');
	},

	showDetail:({commit})=>{
		commit('showDetail');
	},

	hideDetail:({commit})=>{
		commit('hideDetail');
	},

	_initScroll:({commit})=>{
		commit('_initScroll');
	}
}


const getters={
	seller(state){
		return state.seller;
	},

	goods(state){
		return state.goods;
	},
	
	detailShow(state){
		return state.detailShow;
	}
}


export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})