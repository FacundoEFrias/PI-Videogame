require("dotenv").config();
const { Router } = require('express');

const {Videogame, Genre} = require ("../db")

const router = Router();

router.post("/", async(req, res, next) =>{
    const { name, description, released, image, rating, platform, genres } = req.body;
    let platformString = platform.join(', ')
     
  
    let gameCreated = await Videogame.create({
      name,
      description,
      released,
      image,
      rating,
      platform : platformString,
    })
  
    const genresGame = await Genre.findAll({
      where: { name : genres}
    })
       gameCreated.addGenre(genresGame)
    
      res.send('Your game was created successfully')
 
})


module.exports = router;