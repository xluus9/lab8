/*
    createCartView()

    Creates a view for the whole shopping cart, using TemplateListView
    as the prototype. It overrides the render() function to update the
    total price, and register click event handlers for the remove item
    buttons.
*/

//creates view for entire shopping cart
function createCartView(config) {
    config.cartModel = config.model;
    config.templateView = createCartItemView(config);
    var view = createTemplateListView(config);

    // afterRender updates the html that contains the total price
    view.afterRender = function() {
    	this.totalPrice.html(this.model.getTotalPrice());
    };
    return view;
} //createCartView()
