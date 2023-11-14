const axios = require("axios");

 axios.put("http://localhost:3000/api/stocks/655323515def86511fbdba9a",{
    code: "P00001",
    name: "Apple",
    price: 1000,
 }).then((res) => {
    console.log(res);
 }).catch(console.log);