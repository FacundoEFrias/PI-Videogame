require("dotenv").config();
const { Router } = require('express');
const { API_KEY } = process.env;
const axios = require("axios")

const router = Router();

router.get("/", async(req, res, next) =>{
   
try {
    let seacrhPlat = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
    let searchPlatFor = seacrhPlat.data.results.map(x=>x.name)
    res.send(searchPlatFor)
} catch (error) {
    console.log(error)
}
 
})


module.exports = router;