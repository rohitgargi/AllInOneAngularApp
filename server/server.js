const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');


const cors = require('cors');
app.use(cors());

// app.use(cors({
//     origin: 'https://www.ups.com/'
// }));

var bodyParser = require('body-parser');  
app.use(bodyParser.json())


app.get('/get/products/:productId/:userId',async(req,res)=>{
    const data ={
        productId: req.params.productId,
        userId: req.params.userId
    }

    await fs.readFile('./server/db/products/index.get.json',"utf-8",(err,jsonString)=>{
        if (err) {
            console.log("File read failed:", err);
            return;
        }

       const productList = JSON.parse(jsonString);
       console.log("Productlist", productList)


       const product = productList.find(val => parseInt(val.productId) === parseInt(data.productId));

       console.log(product)

       if(product){
        res.status(200).json(product);
       }else{
        res.status(400).json({"status":400, isError:true, message:"Enter wrong Input"})

       }
       
    })
});

app.get('/get/stocks/:productId/:userId/:locId',async(req,res)=>{
    const data ={
        productId: req.params.productId,
        userId: req.params.userId,
        locId:req.params.locId
    }

    await fs.readFile('./server/db/stocks/index.get.json',"utf-8",(err,jsonString)=>{
        if (err) {
            console.log("File read failed:", err);
            return;
        }

       const stockList = JSON.parse(jsonString);
       console.log("stockList", stockList)


       const stockInfo = stockList.find(val => (parseInt(val.productId) === parseInt(data.productId) && (data.locId ===val.locId) && (parseInt(data.userId) === parseInt(val.userId))));

       console.log(stockInfo)

       if(stockInfo){
        res.status(200).json(stockInfo);
       }else{
        res.status(400).json({"isError":true, "status":400, "message":"Wrong input!"});
       }

      
    })
});


app.post('/postPlaceOrder',(req,res)=>{
    console.log(req.body);
    const userIds = [1,2,3];
    if(userIds.includes(parseInt(req.body.userId))){
        res.status(200).json({"status":200,"message":"Order Placed Successfuly!"})
    }else{
        res.status(400).json({"status":400, isError:true, message:"Enter wrong Input"})
    }  
});


app.get('/get/rewards/:userId',async(req,res)=>{
    const data ={
        userId: req.params.userId
    }

    await fs.readFile('./server/db/rewards/index.get.json',"utf-8",(err,jsonString)=>{
        if (err) {
            console.log("File read failed:", err);
            return;
        }

       const rewardsList = JSON.parse(jsonString);
       console.log("Productlist", rewardsList)


       const reward = rewardsList.find(val => parseInt(val.userId) === parseInt(data.userId));

       console.log(reward)

       if(reward){
        res.status(200).json(reward);
       }else{
        res.status(400).json({'isError':true, 'message':"Wrong Input"});
       }
      
    })
});


app.get('/session/v6',async(req,res)=>{
    // const data ={
    //     userId: req.params.userId
    // }

    await fs.readFile('./server/db/session.json',"utf-8",(err,jsonString)=>{
        if (err) {
            console.log("File read failed:", err);
            return;
        }

       const response = JSON.parse(jsonString);


       if(response){
        res.status(200).json(response);
       }else{
        res.status(400).json({'isError':true, 'message':"Wrong Input"});
       }
      
    })
});

app.get('/session/v6/:appName/:sessionId',async(req,res)=>{
    // const data ={
    //     userId: req.params.userId
    // }

    await fs.readFile('./server/db/sessionData.json',"utf-8",(err,jsonString)=>{
        if (err) {
            console.log("File read failed:", err);
            return;
        }

       const response = JSON.parse(jsonString);


       if(response){
        res.status(200).json(response);
       }else{
        res.status(400).json({'isError':true, 'message':"Wrong Input"});
       }
      
    })
});


app.post('/session/v6',(req,res)=>{
    console.log(req.body);

    const response = {
        "sessionId": "9dba91e2e2d9497c98a6fee03e19c04e",
        "appname": "usstest",
        "sessionData": '{"zipCode":10001,"isPreferred":true,"locationId":11221,"searchType":"z","addressLine":"ABC PLAZAA"}',
        "maxInactiveInterval": 1000
    }
        res.status(200).json(response);
        
    // if(userIds.includes(parseInt(req.body.userId))){
    //     res.status(200).json({"status":200,"message":"Order Placed Successfuly!"})
    // }else{
    //     res.status(400).json({"status":400, isError:true, message:"Enter wrong Input"})
    // }  
});






// app.post('/products', (req, res) => {
//     res.send('Post Request')
// });

app.listen(port, ()=>{
    console.log(`My Demo App listening on ${port} port`);
})
