import { escapeHtml } from '../utils/utils.js';
import { SliderStarterValue } from '../utils/utils.js';
import { layzLoad } from '../utils/utils.js';
import { leftButton, rightButton } from '../utils/utils.js';

/*********** VARIABLES ************/
let left = document.getElementById('left');
let right = document.getElementById('right');
let sliderSection = document.getElementById('sliderSection');
let categoryListGroup = document.getElementById('categorylistGroup');
let listItem = document.getElementsByClassName('list-group-item');
let cargo;// >>>   FOR -> SHIPPINGFEE ITEM

/*************  PRODUCT SLIDER STARTER VALUE ************/
SliderStarterValue(sliderSection);

/************** LEFT - RIGTH BUTTONS *******************/
leftButton(left,sliderSection);
rightButton(right,sliderSection);

/******************* GET CATEGORIES LIST FROM DATABASE **************************/
async function getCategories(){

	const getCategories = await fetch('./db/db.json')
	.then(res=> res.json())
	.then((data)=>{

		const categories = data.responses[0][0].params.userCategories;

		/****************** SET LIST ITEM FIRST STYLE VALUE FUNCTION AFTER CLICK TARGET **********/

		const listItemFirstStyleValue = ()=>{

			for (var x = 0; x < listItem.length ; x++) {
				listItem[x].style.color=""
				listItem[x].style.backgroundColor="";
				listItem[x].style.borderLeft="";
				listItem[x].style.borderLeftRadius="0";
				listItem[x].style.borderBottom="";
			}
		}

		/********************* DISPLAY CATEGORIES ON LIST ********************/

		for(var i =0; i < categories.length; i++){

			/********** CREATE LI ELEMENT *******/
			let listItem = document.createElement('li');

			listItem.innerHTML = categories[i];

			listItem.classList.add('list-group-item');
			
			/******* CLICK EVENT FOR A LIST ITEM *******/

			listItem.addEventListener('click',(e)=>{

				/* RUN FIRST STYLE VALUE FUNCTION AFTER CLICK TARGET */

				listItemFirstStyleValue()

				const target = e.target;

				/**************** SET STYLE VALUES A LISTITEM *************/

				if(window.innerWidth > 768){
					target.style.transition=".2s"
					target.style.color='#265a88';
					target.style.backgroundColor="#DAEEF8";
					target.style.borderLeft="4px solid #265a88";
					target.style.borderLeftRadius="0";
				}

				/***** SET STYLE VALUES A LISTITEM FOR MOBIL DEVICE *******/

				else if(window.innerWidth <= 768){
					target.style.transition=".2s"
					target.style.color='black';
					target.style.borderBottom="4px solid #265a88";
					target.style.borderLeftRadius="0";
					target.style.fontWeight="bold"
				}

				
				let listItemValue = e.target.innerHTML

				getProductFromApiByClickEvent(listItemValue);
				
			})

			categoryListGroup.appendChild(listItem)	
		}

	})
	.catch((err)=>{
		console.log(err)
	})

}

/******** RUN CATEGORIES FETC API ***********/
getCategories();
/********************************************/

/******** GET PRODUCTS FORM API BY CLICK EVENT ***************/
function getProductFromApiByClickEvent(listItemValue){

//console.log(sliderSection.clientWidth)

/******** GET REQUEST FROM API FOR PRODUCT *********/
async function getProductsFromCategories(){

	/******* DELETE OLD CATEGORY PRODUCT WHEN CLICK NEW CATEGORY *********/
	sliderSection.innerHTML=``;
	/**********************************************/

	const getCategories = await fetch('./db/db.json')
	.then(res=> res.json())
	.then((data)=>{

		/****************** GET ALL PRODUCTS HERE ****************/

		const products = data.responses[0][0].params.recommendedProducts

		/****************** GET PRODUCT BY CATEGORY NAMES *********/
		
		let categoryProduct = products[String(escapeHtml(listItemValue))]

		/**************** DISPLAY CATEGORY PRODUCT ******************/
		categoryProduct.forEach(data=>{		

			/***************** SHIPPINGFEE FREE **********************/

			if(data.params.shippingFee == 'FREE'){


				cargo = 'Ücretsiz Kargo'
			}
			else if(data.params.shippingFee == 'NON-FREE'){

				cargo ="Kargo Hizmeti Yok"
			}
			/***********************************************************/

			let div = document.createElement('div');
			div.classList.add('cardSection');
			div.innerHTML=``;
			div.innerHTML=`

			<img class="layzImg" data-src="${data.image}">
			<div class="cardBody">
			<div class="cardTitle">
			${data.name}
			</div>
			<div class="cardPrice">
			${ data.price.toFixed(2)} TL

			</div>
			<div class="cardInfo"><i class="fas fa-truck cargo"></i><i class="fas fa-circle dot"></i>  ${ cargo }</div>
			<button class="btn btn-primary addCard">Sepete Ekle</button>
			</div>

			`
			sliderSection.appendChild(div);

		})

		/************** SEND IMG TO LAYZ LOAD FUNCTION TO UTILS **************/

		layzLoad(document.querySelectorAll('.layzImg'))

		/*******************CREATE POPUP ***************************/

		let addCard =document.querySelectorAll('.addCard');
		addCard.forEach(item=>{
			item.addEventListener('click',(e)=>{

				if(window.innerWidth >768){

					let div =document.createElement('div');

					div.innerHTML=`
					<div class="alert alert-primary" role="alert">
					<i style="font-size:20px; color:green;" class="fas fa-check-circle"></i>
					<h6 class="ps-3">
					Ürün Sepete Eklendi.<br>
					<span style="font-size:13px; color:grey">Sepete Git</span>
					</h6>

					<i style="color:white; font-size:20px" class="fas fa-times ps-5"></i>
					</div>

					`;

					document.querySelector('.container').insertBefore(div,document.querySelector('.container').childNodes[0])

					/**********Delete Alert Popup *********/
					setInterval(function del(){
						div.innerHTML=``;
					},2000)

				}
				else{ 
					alert('Ürün Sepete Eklendi')
				}
				
			})

		})
	})
}

	getProductsFromCategories();

}

