// requiring all packets needed/used
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
        //call function to start
    start();

    // function to start the whole process/storefront
function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.log("-----Welcome to Bamazon-----");
        // table for products to show up in console
        var table = new Table({
            head: ['ID', "Product Name", "Department", "Price", "Amount in Stock"],
            style: {
                head: ['blue'],
            }
        })
            // pushing info to table
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name,"$"  +  res[i].price, res[i].stock_quantity]
                );
        }

        console.log(table.toString());
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
            // function to run the purchase process
]).then(function(purchase) {
        var purchaseid = (purchase.id) - 1;
        var howmanybought = parseInt(purchase.quantity);
                // toFixed(2) keeps number result at no more than 2 decimal places(found at MDN.com)
        var totalpurch = parseFloat(((res[purchaseid].price) * howmanybought).toFixed(2));
        var quantityonhand = (res[purchaseid].stock_quantity - howmanybought)
        

        if (res[purchaseid].stock_quantity >= howmanybought) {
              // updates the db quantity number
            connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: quantityonhand},
                {item_id: purchase.id}
            ], function(err, result) {
                if(err) throw err;
                console.log("Order confirmed. Your total is $" + totalpurch.toFixed(2) + ". Your item will be shipped to you in 2-6 business days.");
                exit();
            });
            }
                // else statement for insufficient quantity
            else {
                console.log("\nInsufficient Quantity, please choose a different product\n");
                start();
            }
        })
    })
};
    // exit function to end app
    function exit() {
        console.log("Thank you for visiting Bamazon!");
        connection.end();
    }
