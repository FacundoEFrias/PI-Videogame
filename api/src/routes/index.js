const { Router } = require('express');
const genreRoute = require ("./genre")
const videogameRoute = require("./videogame")
const postRoute = require("./post.js")
const getPlatforms = require("./platforms.js")


const router = Router();

router.use("/videogame", videogameRoute)
router.use("/genre", genreRoute)
router.use("/post", postRoute)
router.use("/platforms",getPlatforms)


module.exports = router;
