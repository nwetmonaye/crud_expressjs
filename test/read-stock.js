const axios = require("axios");

 axios.get("http://localhost:3000/api/stocks/655323515def86511fbdba9a").then((res) => {
    console.log(res.data);
 }).catch(console.log);