$(document).ready(function() {
    // Pizza menu data (replace with your own data or fetch it from a server)
    var pizzaMenu = [
      { id: 1, name: 'Margherita', price: 10, image: 'image 14.png' },
      { id: 2, name: 'Pepperoni', price: 12, image: 'image 14.png' },
      { id: 3, name: 'Classic', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Barbecue Chickrn', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Buffalo Chicken', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' },
      { id: 3, name: 'Vegetarian', price: 11, image: 'image 14.png' }
    ];
  
    // Cart items
    var cartItems = [];

    
    // Generate pizza menu
    function generatePizzaMenu() {
      var menuList = $('#menu-list');
      menuList.empty();
  
      pizzaMenu.forEach(function(pizza) {
        var listItem = $('<li>');
        var image = $('<img>').attr('src', pizza.image).attr('alt', pizza.name).addClass('pizza-image');
        var name = $('<P>').text(pizza.name);
        var price = $('<P>').text('$' + pizza.price.toFixed(2));
        var addToCartBtn = $('<button>').text('Add to Cart').addClass('add-to-cart-btn').data('pizza-id', pizza.id).addClass('button');
  
        listItem.append(image, name, price, addToCartBtn);
        menuList.append(listItem);
      });
    }
  
    // Update cart
    function updateCart() {
      var cartItemsContainer = $('#cart-items');
      var totalPriceContainer = $('#total-price');
      cartItemsContainer.empty();
      totalPriceContainer.empty();
      var totalQuantity = 0;
      var totalPrice = 0;
      cartItems.forEach(function(cartItem) {
        var item = $('<div>').addClass('cart-item');
        var image = $('<img>').attr('src', pizzaMenu[cartItem.pizzaId - 1].image).attr('alt', pizzaMenu[cartItem.pizzaId - 1].name);
        var name = $('<span>').text(pizzaMenu[cartItem.pizzaId - 1].name);
        var quantity = $('<span>').text('x' + '' + cartItem.quantity).addClass('quantity');
        var removeBtn = $('<button>').text('Remove').addClass('remove-from-cart-btn').data('cart-item-id', cartItem.id).addClass('remove-button');
  
        item.append(image, name, quantity, removeBtn);
        cartItemsContainer.append(item);
  
        totalQuantity += cartItem.quantity;
        totalPrice += pizzaMenu[cartItem.pizzaId - 1].price * cartItem.quantity;
      });
  
      totalPriceContainer.text('Total Price: $' + totalPrice.toFixed(2));
    }
  
    // Add pizza to cart
    function addToCart(pizzaId) {
      var existingCartItem = cartItems.find(function(cartItem) {
        return cartItem.pizzaId === pizzaId;
      });
  
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cartItems.push({ id: cartItems.length + 1, pizzaId: pizzaId, quantity: 1 });
      }
  
      updateCart();
    }
  
    // Remove pizza from cart
    function removeFromCart(cartItemId) {
      var cartItemIndex = cartItems.findIndex(function(cartItem) {
        return cartItem.id === cartItemId;
      });
  
      if (cartItemIndex !== -1) {
        cartItems.splice(cartItemIndex, 1);
      }
  
      updateCart();
    }
  
    // Show order dialog
    function showOrderDialog(orderId) {
      $('#order-id').text('Your order number is: ' + orderId);
      $('#order-dialog').fadeIn(500);
    }
  
    // Hide order dialog
    function hideOrderDialog() {
      $('#order-id').empty();
      $('#order-dialog').fadeOut(500);
    }
  
    // Event listeners
    $(document).on('click', '.add-to-cart-btn', function() {
      var pizzaId = $(this).data('pizza-id');
      addToCart(pizzaId);
    });
  
    $(document).on('click', '.remove-from-cart-btn', function() {
      var cartItemId = $(this).data('cart-item-id');
      removeFromCart(cartItemId);
    });
  
    $(document).on('click', '.pay-button', function() {
      // Place order logic goes here
      var orderId = Math.floor(Math.random() * 1000) + 1;
      showOrderDialog(orderId);
      $('.payment-card').fadeOut(500)

    });
  
    $(document).on('click', '#order-dialog', function() {
      hideOrderDialog();
    });
  
    // Initial setup
    generatePizzaMenu();

    $('.payment-card').hide()

    $(document).on('click', '#checkout-btn', function() {
      // Place order logic goes here
      if(cartItems.length != 0){
        $('.payment-card').fadeIn(500)
      }else{
        alert("The Cart is Empty")
      }
    });

  });
  
