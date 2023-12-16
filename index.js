// creating an http server 
// express 
// express is not a node defailt library 


/*Status Codes
200 - OK
404 - Not Found
500 - Internal Server Error
411 - Input was incorrect
403 - Returning something you dont have the access to */

/*const express = require('express')

const app = express();

const PORT = 3000;*/

/*function sum(n) {
    let ans = 0;
    for (let i = 0; i<=n; i++) {
        ans = ans + i;
    }
    return ans;
} */

// req,res => request and response
/* app.get("/", (req,res) => {
    //catching query parameters
    //const n = req.query.n;
    //const ans = sum(n);
    res.send("Hi your ans is " + ans);
}); */

// we can just do app.listen(3000) and the whole down code plus the code const PORT = 3000 is also not needed
/*app.listen(PORT, (req,res) => {
    console.log(`Server is up and running`)
});*/

const express = require('express')

const app = express();

var users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

app.get("/", (req,res) => {
    const johnKidneys = users[0].kidneys
    const numberOfKidneys = johnKidneys.length;
    console.log(numberOfKidneys)
})

app.listen(3000)