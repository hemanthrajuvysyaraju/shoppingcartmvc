var array = {};
function addtocart(but) {
	if (localStorage.getItem("cart") == null) {
		let json = JSON.stringify(array);
		localStorage.removeItem("cart");
		localStorage.setItem("cart", json);
	}
	array = JSON.parse(localStorage.getItem("cart"));
	var id = $(but).parent().parent().attr('id');
	var name = $(but).parent().parent().find('.desc').children().text();
	var image = $(but).parent().parent().find('.image').children().attr('src');
	var qty = $(but).closest(".btn").find('select').val();
	var price = $(but).closest(".btn").find('#price').val();
	var total = parseFloat(price) * parseInt(qty);
	var prod = [id, name, image, qty, price, total];
	array[id] = prod;
	let json = JSON.stringify(array);
	localStorage.removeItem("cart");
	localStorage.setItem("cart", json);
	$(".itemcounter").html(Object.keys(array).length)
}
function removeitem(but)
{
	var id=$(but).parent().parent().closest('.product').attr('id');
	array = JSON.parse(localStorage.getItem("cart"));
	delete	array[id];
	let json = JSON.stringify(array);
	localStorage.removeItem("cart");
	localStorage.setItem("cart", json);
	$(".itemcounter").html(Object.keys(array).length);
	viewcart();
}
function viewcart()
{
	var prods = JSON.parse(localStorage.getItem("cart"));
			let htmlcd = ``;
			var total = 0;
			$.each(prods, function(i, val) {
				htmlcd += `<div class="product" id="`+val[0]+`">
										<div class="image">
											<img src="`+ val[2] + `"alt="` + val[1] + `" image" />
										</div>
										<div class="desc">
											<p>`+val[1] + `</p>
										</div>
										<div class="btn">
											<p class="price">
												price:`+ val[4] + `$
											</p>
											<p>quantity`+val[4]+`</p>
											<b>total:`+ val[5] + `</b>
											<button onclick="removeitem(this)">remove</button>
										</div>
									</div>`;
				total += val[5];
			})
			htmlcd += `<h2>grand total of your cart is::` + total + `<button onclick="checkout()" >checkout</button>`;
			$("#cartprods").html(htmlcd);
			$("#cartprods").show();
			$("#all").hide();
			$("#categorywise").hide();
}
function loading() {
	array = JSON.parse(localStorage.getItem("cart"));
	$(".itemcounter").html(Object.keys(array).length)
	$(document).ready(function() {
		$("#cart").on('click', function () {
			var prods = JSON.parse(localStorage.getItem("cart"));
			let htmlcd = ``;
			var total = 0;
			$.each(prods, function(i, val) {
				htmlcd += `<div class="product" id="`+val[0]+`">
										<div class="image">
											<img src="`+ val[2] + `"alt="` + val[1] + `" image" />
										</div>
										<div class="desc">
											<p>`+ val[1] + `</p>
										</div>
										<div class="btn">
											<p class="price">
												price:`+ val[4] + `$
											</p>
											<b>total:`+ val[5] + `
											<button onclick="removeitem(this)">remove</button>
										</div>
									</div>`;
				total += val[5];
			})
			htmlcd += `<h2>grand total of your cart is::$` + total + `<p style="color:rgb(0,0,0,0.5)">taxes applicable</p></h2>` +`<button type="submit">checkout</button>`;
			$("#cartprods").html(htmlcd);
			$("#cartprods").show();
			$("#all").hide();
			$("#categorywise").hide();
		}),
			$("#home").on('click', function() {

				$("#all").show();
				$("#categorywise").hide();
				$("#cartprods").hide();
			}),
			$("#category").on('change', function() {
				$.ajax(
					{
						url: 'http://localhost:8080/shoppingcartmvc/getcategoryproducts',
						type: 'POST',
						data:
						{
							categoryid: $('#category').val()
						},
						success: function(result) {
							$("#all").hide();
							$("#cartprods").hide();
							let htmlopt = ``;
							$.each(result.product_id, function(i, val) {
								htmlopt += `<div class="product" id="` + val + `">
									<div class="image">
										<img src="`+ result.product_image[i] + `"
											alt="`+ result.product_name[i] + `"+" image" />
									</div>
									<div class="desc">
										<p>`+ result.product_name[i] + `</p>
									</div>
									<div class="btn">
									<input type="text" id="price" value="`+ result.product_price[i] + `" hidden>
										<p class="price">
											price:`+ result.product_price[i] + `$
										</p>
										<select name="quantity">
										<option value=1>1</option>
										<option value=2>2</option>
										<option value=3>3</option>
										<option value=4>4</option>
										<option value=5>5</option>
										</select>
										<button onclick="addtocart(this)">add to cart</button>
									</div>
								</div>`;
							});
							$("#categorywise").html(htmlopt);
							$("#categorywise").show();
							$("#cartprods").hide();
							$('#all').hide();
						}
					}
				)

			});
	});
}
function checkout()
{
	alert("checkingout");
	$.ajax(
		{
			url:"http://localhost:8080/shoppingcartmvc/checkout",
			type:"POST",
			data:
			{
				cart:localStorage.getItem("cart"),
				id:$('#custid').val(),
			},
			success:function (result)
			{
				console.log(result);
			}
		}
	)
}
/*function addtocart(bu) {
	var id = $(bu).parent().parent().attr('id');
	console.log($(bu).closest(`.desc`));
	var name;
	var price;
	var img;
	$(bu).parent().each(function(i) {
		if (i == 0) {
			console.log($(this).text());

		}
		console.log($(this).text());

	})
	$(bu).parent().parent().each(function(i) {

		console.log(i + "==>" + $(this).children().text());

	})
	$(bu).parent().parent().each(function(j){
		
		if($(this).children().children().is('img'))
		{
			img=$(this).children().children().attr('src');
		}
		else if($(this).children().attr('class')=="desc")
		{
			console.log(true)
			name=$(this).children().children().text();
		}
		else
		{
			price=name=$(this).children().children().text();
		}
	})
	console.log(id,name,price,img);
	
	
	$(bu).parent().parent().each(function(i)
	{
		console.log($(this).text());
		console.log($(this).attr('src'));	
		console.log($(this).id);
	})
}*/
