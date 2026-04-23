Feature: Shopping cart

    Scenario: placing the order
    Given  a login ecommerce website with username "abhijeetmore" and password "temp1234"    
    When add "zara coat 3" is displayed in the cart
    and click on the place order button
    Then verify order is present in  the order history with order id "123345"