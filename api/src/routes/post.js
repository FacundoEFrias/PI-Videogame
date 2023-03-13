require("dotenv").config();
const { Router } = require('express');
const {Videogame, Genre} = require ("../db")
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const router = Router();
router.post("/", async(req, res, next) =>{
  const { name, description, released, image, rating, platform, genres } = req.body;
  let platformString = platform.length > 0 ? platform.join(', ') : "Platform not found";
  let imageUrl;
  
  if (image) {
    try {
      // Si se proporcionó una URL de imagen, subirla a Cloudinary y obtener la URL de la imagen
      const result = await cloudinary.uploader.upload(image,{
        public_id: name,
        folder: "Videogames"
      });
      imageUrl = result.secure_url;
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error uploading image to Cloudinary");
    }
  }
  
  let gameCreated = await Videogame.create({
    name,
    description,
    released,
    image: imageUrl ? imageUrl : null,
    rating,
    platforms : platformString 
  });
  
  const genresGame = await Genre.findAll({
    where: { name : genres }
  });
  
  gameCreated.addGenre(genresGame);
  
  res.status(200).json('Your game was created successfully');
});

module.exports = router;