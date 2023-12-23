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


//Anytime we restart the process the in memory data is reset . that is why we use databases
var users = [{
    name: "John",
    kidneys: [{
        healthy: false,
        
    }]
}];


app.use(express.json());

//can callback multiple function cb1,cb2, (req,res)
app.get("/", (req,res) => {
    const johnKidneys = users[0].kidneys
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < numberOfKidneys; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        johnKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", (req,res) => {
    //for post request we send data in the body of the request
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})



app.put("/", (req,res) => {
    for( let i = 0; i < users.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "ok   Done!"
    })
})


app.delete("/", (req,res) => {

    // only if atleast one unhealthy kidney is there do this , else return 411
    
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
          if (users[0].kidneys[i].healthy) {
            newKidneys.push({
              healthy: true,
            });
          }
        }
        users[0].kidneys = newKidneys;
        res.json({
          msg: "okay",
        });
    } else {
        res.status(411).json({
            msg: "You dont have any unhealthy kidneys"
        })
    }
});

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (!users[0].kidneys[i].healthy) {
        atleastOneUnhealthyKidney = true;
      }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000)