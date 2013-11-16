/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	var formatLabels = {
		dvd: 'DVD',
		bluray: 'Blu-Ray'
	};

	// creates a cart model
	var cartModel = createCartModel();

	// creates a cart view
	var cartView = createCartView({
		model: cartModel,
		template: $('.cart-item-template'),
		container: $('.cart-items-container'),
		totalPrice: $('.total-price')
	});

	// gets previously saved items in the cart
	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
		cartModel.setItems(JSON.parse(cartJSON));
	}

	// creates a movies model
	var moviesModel = createMoviesModel({
		url: 'https://courses.washington.edu/info343/ajax/movies/'
	});

	// creates a movies view
	var moviesView = createMoviesView({
		model: moviesModel,
		template: $('.movie-template'),
		container: $('.movies-container')
	});

	// refreshes to get movies from the server
	moviesModel.refresh();

	// adds new item to the cart when movies
	// view triggers 'addToCart'
	// supplies movieID and format
	moviesView.on('addToCart', function(data){
		var movie = moviesModel.getItem(data.movieID);
		if (!movie) {
			throw 'Invalid movie ID "' + movieID + '"!';
		}

		cartModel.addItem({
			id: movie.id,
			title: movie.title,
			format: data.format,
			formatLabel: formatLabels[data.format],
			price: movie.prices[data.format]
		});
	});

	// when place order button is clicked,
	// it will post the JSON to a web server
	$('.place-order').click(function(){
		$.ajax({
			url: 'https://courses.washington.edu/info343/ajax/movies/orders/',
			type: 'POST',
			data: cartModel.toJSON(),
			contentType: 'application/json',
			success: function(responseData) {
				//if successful it will alert a message
				//and empty the cart
				alert(responseData.message);
				cartModel.setItems([]);
			},
			error: function(jqXHR, status, errorThrown) {
				//alerts user with error
				alert(errorThrown || status);
			}
		});
	});

	cartModel.on('change', function(){
		localStorage.setItem('cart', cartModel.toJSON());
	});
}); //doc ready()

