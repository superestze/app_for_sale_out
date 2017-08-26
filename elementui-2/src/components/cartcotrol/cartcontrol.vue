<template>
	<div class="cartcontrol">
		<div class="cart-decrease" v-show='food.count>0' @click='decreaseCart'>
			<i class="el-icon-minus"></i>
		</div>
		<div class="cart-count" v-show='food.count>0'>
			{{food.count}}
		</div>
		<div class="cart-add" @click='addCart'>
			<i class="el-icon-plus"></i>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

	export default{
		props:{
			food:{
				type:Object
			}
		},

		created(){
			
		},

		methods:{
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,'count', 1);
				}else{
					this.food.count++;
				}

				this.$emit('add', event.target);
			},

			decreaseCart(event){
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang='less'>
 .cartcontrol{
 	font-size:0;
 	.cart-decrease, .cart-add{
 		font-size: 24px;
 		line-height: 24px;
 		display: inline-block;
		padding:6px;
		font-size: 24px;
 		line-height: 24px;
 		color: rgb(0, 160, 220);

 	}
 	.cart-count{
 		display: inline-block;
 		font-size: 20px;
 		vertical-align: top;
 		width: 12px;
 		padding-top: 6px;
 		line-height: 24px;

 	}
 	.cart-add{
 	
 		display: inline-block;
 	}
 }
	
</style>