const {when, Then, Given} = require("@cucumber/cucumber");
Given('a login ecommerce website with username {string} and password {string}' ,function(username, password){
    return 'pending';
});
when('add {string} is disaplyed in the cart', function(product){
    return 'pending';
});
when('click on the place order button', function(){
    return 'pending';
});
Then('verify order is present in the order history with order id {string}', function(orderid){
    return 'pending';
});
