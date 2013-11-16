/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

//creates model for shopping cart
function createCartModel(config) {
	var model = createListModel(config);

	// getTotalPrice function that adds up the prices in the cart
	model.getTotalPrice = function() {
		var idx;
		var totalPrice = 0;
		// loops through the items in the cart
		for (idx = 0; idx < this.items.length; idx++) {
			totalPrice += this.items[idx].price;
		}
		return totalPrice.toFixed(2);
	};

	// toJSON returns a JSON representation of the cart items
	model.toJSON = function() {
		return JSON.stringify(this.items);
	};

	return model;
} //createCartModel()