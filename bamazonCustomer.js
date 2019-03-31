var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection to the sql database
var connection = mysql.createConnection({
  host: "localhost",

  port: 8889,

  // username
  user: "root",

  // password
  password: "root",
  database: "bamazon_db"
})
    // function to start the whole process/storefront
function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.log("-----Welcome to Bamazon-----");
        console.log("------------------------------");
        // table for products to show up in console
        for (var i = 0; i < res.length; i++) {
            console.log("Id: " + res[i].item_id +  " | "  +  "Product:  "  + res[i].product_name +  " | "  +  "Department:  "  +  res[i].department_name  +  " | "  +  "Price:  "  +  res[i].price  +  " | "  +  "QTY:  "  + res[i].stock_quantity);
            console.log("--------------------------------------------------------------------------------------------");
        }
        // starts inquirer/question process
    inquirer.prompt([
        {
      type: "input",
      name: "id",
      message: "Which product id would you like to purchase?",
      validate: function(value) {
          if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
              return true;
          } else{
              return false;
          }
      }
    },
    {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
            validate: function(value) {
                if (isNaN(value)) {
                return false;
            } else {
                return true;
            } 
        } 
    }
])
        // function to run the purchase process
    .then(function(purchase) {
        var purchaseid = (purchase.id) - 1;
        var howmanybought = parseInt(purchase.quantity);
                                            // toFixed(2) keeps number result at no more than 2 decimal places
        var totalpurch = parseFloat(((res[purchaseid].price) * howmanybought).toFixed(2));
        var quantityonhand = (res[purchaseid].stock_quantity - howmanybought)
      
        if (res[purchaseid].stock_quantity >= howmanybought) {
               // updates the db quantity number
            connection.query("UPDATE products SET ? WHERE ?", 
                {stock_quantity: quantityonhand},
                {item_id: purchaseid.id},
             function(err, result) {
                if(err) throw err;
                console.log("Order confirmed. Your total is $" + totalpurch.toFixed(2) + "Your item will be shipped to you in 2-6 business days.");
                });
            }
        })
    })
};

    start();
