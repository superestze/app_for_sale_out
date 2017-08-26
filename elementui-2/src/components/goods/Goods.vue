<template>
	<div id="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for='(item, index) in goods' class='menu-item' :class="{'current':currentIndex ===index }" @click='selectMenu(index)'>
					<span class="text">
						<span v-show='item.type>0'
						class="icon" :class='classMap[item.type]'></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodsWrapper'>
			<ul>
				<li v-for='item in goods' class='food-list food-list-hook'>
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for='food in item.foods' class='food-item'>
							<div class="icon">
								<img :src="food.icon" alt="">
							</div>
							<div class='content'>
								<h2 class="name">
									{{food.name}}
								</h2>
								<p class='desc'>
									{{food.description}}
								</p>
								<div class="extra">
									<span class='count'>月售{{food.count}}份</span><span>
										好评率{{food.rating}}
									</span>
								</div>
								<div class="price">
									<span class='now'>￥{{food.price}}</span>
									<span v-show='food.oldPrice' class='old'> 
										￥{{food.oldPrice}}
									</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add='addFood' :food='food'></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref='shopcart' :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcart>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartcontrol from '../cartcotrol/cartcontrol.vue'
import axios from 'axios'

	export default{

		created(){
		    this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee']; 
	

			 axios.get('../../static/data.json').then((res)=>{   
			 	this.seller=res.data.seller;
		        this.goods=res.data.goods;
		        this.$nextTick(()=>{
		        	this._initScroll();
		        	this._computedHeight();
		        })
		    }).catch((err)=>{
		      console.log(err);
		    });		 

		},
		

		data(){
			return {
				seller:{},
				goods:{},
				listHeight:[],
				scrollY:0
			}
		},

		computed:{
			currentIndex(){
				for(let i =0; i<this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if (!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},

			selectFoods(){
				let foods=[];
				this.goods.forEach(good=>{
					good.foods.forEach(food=>{
						if(food.count){
							foods.push(food);
						}
					})
				})		
				return foods;
			}
		},



		methods:{
			selectMenu(index){
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el=foodList[index];
				this.foodScroll.scrollToElement(el, 300)
			},

			addFood(target){
				this.$nextTick(()=>{
					this.$refs.shopcart.drop(target);
				});
			},

			_initScroll(){

				this.menuScroll = new BScroll(this.$refs.menuWrapper ,{
					click: true
				})

			     this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
			     	 click: true,
			     	 probeType:3
			     });

			     this.foodScroll.on('scroll', (pos)=>{
			     	this.scrollY = Math.abs(Math.round(pos.y));
			     })
			},

			_computedHeight(){
					let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
					let height = 0;
					this.listHeight.push(height);
					for(let i=0; i<foodList.length; i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			

			}
		},

		components:{
			shopcart,
			cartcontrol
		}
	}
</script>

<style lang='less'>
 #goods{
 	display: flex;
 	position:absolute;
 	width: 100%;
 	top: 190px;
    
 	bottom: 46px;
 	overflow: hidden;
 	.menu-wrapper{
 		ul{
 			padding: 0 12px;
 		}
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
		.menu-item{
			list-style: none;
			display: table;
			
			height: 54px;
			width: 56px;
			line-height: 14px;
			&.current{
				position:relative;
				margin-top: 1px;
				z-index: -1px;
				background: #fff;
				font-weight: 700;
				.text{
					border: 0px solid black;
				}
			}
			.icon{
                display:inline-block;
                vertical-align: middle;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                background-size: 12px;
                background-repeat: no-repeat;
                &.decrease{
                  background-image: url('../../../resource/img/decrease_1@3x.png');
                }
                &.discount{
                  background-image: url('../../../resource/img/discount_1@3x.png');
                }
                &.guarantee{
                  background-image: url('../../../resource/img/guarantee_1@3x.png');
                }
                &.invoice{
                  background-image:url('../../../resource/img/invoice_1@3x.png');
                }
                &.special{
                  background-image:url('../../../resource/img/special_1@3x.png');
                }
            }
            .text{
            	display:table-cell;
            	width: 56px;
            	vertical-align: middle;
            	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            	font-size: 12px;
            }
		}

 	}

 	.foods-wrapper{	

		flex:1;
		ul{
			padding-left: 0px;
			margin-top: 0px;
			li{
				list-style: none;
			}
		}
		.title{
			list-style: none;
			padding-left: 14px;
			height: 26px;
			line-height: 26px;
			border-left: 2px solid #d9dde1;
			font-size: 12px;
			color: rgb(147, 153, 159);
			background: #f3f5f7;
			margin: 0;

		}
		.food-item{
			display: flex;
			margin: 18px;
			padding-bottom: 18px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			&:last-child{
				&:after{
					display: none;
				}
				margin-bottom: 0;
			}
			.icon{
				flex: 0 0 57px;
				margin-right: 10px;

			}
			.content{
				flex: 1;
				.name{
					margin: 2px 0 8px 0;
					height:14px;
					line-height: 14px;
					font-size: 14px;
					color:rgb(7, 17, 27);
				}
				.desc{
					margin-bottom: 8px;
					line-height: 10px;
					font-size: 10px;
					color: rgb(147 ,153, 150);
				}
				.extra{
					&.count{
						margin-right: 12px;
					}
				}
				.price{
					font-weight: 700;
					line-height: 24px;
					.now{
						margin-right: 8px;
						font-size: 14px;
						color: rgb(240, 20,20);
					}
					.old{
						text-decoration: line-through;
						color: rgb(147, 153, 159);
					}
				}
				.cartcontrol-wrapper{
					position:absolute;
					right:14px;
					// bottom: 12px;
				}
			}

		}

 	}

 }
	
</style>