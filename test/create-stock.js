const axios = require("axios");

 axios.post("http://localhost:3000/api/stocks",{
    code: "P00002",
    name: "Water",
    price: 500,
 }).then((res) => {
    console.log(res);
 }).catch(console.log);