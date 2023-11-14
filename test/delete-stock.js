const axios = require("axios");

 axios
 .delete("http://localhost:3000/api/stocks/655328ef592f3cd617f013bf")
 .then((res) => {
    console.log(res.data);
 }).catch(console.log);