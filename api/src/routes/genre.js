require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db.js');



const router = Router();

//Obtiene todos los generos de la api y los guarda
router.get("/", async (req, res , next)=>{
try {
    const generosApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    generosApi.data.results.forEach(e=>{
        Genre.findOrCreate({
            where:{name: e.name}
        })
    })
    const generosDb = await Genre.findAll()
    generosDb.sort((a, b) => a.name.localeCompare(b.name));
    
    res.send(generosDb)

   
} catch (error) {
    next(error)
}
})



module.exports = router;