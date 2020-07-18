// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables Array
// =============================================================
var Tables = [
    {

        customerName: "Yoda",
        phoneNumber: "7604445555",
        customerEmail: "yoda@force.com",
        customerID: 2000
    },

];



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


app.get("/api/tables", function (req, res) {
    return res.json(Tables.slice(0, 5));
});
app.get("/api/waitlist", function (req, res) {
    if (Tables.length < 5) {
        return res.json("");
    }
    else {
        return res.json(Tables.slice(5, 15))
    }
});

// Displays a single character, or returns false


// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // console.log(req.body)
    if (Tables.length < 5) {
        var newTable = req.body;


        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html



        Tables.push(newTable);



        return res.json(true);

    } else {
        var newTable = req.body;


        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

        console.log(newTable);

        Tables.push(newTable);
        console.log(Tables)


        return res.json(false);
    }


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});