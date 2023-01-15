require("dotenv").config();
const { Router } = require('express');
const {Op} = require("sequelize")
const {Videogame, Genre} = require ("../db")
const axios = require("axios")
const { API_KEY } = process.env;


const router = Router();

router.get("/", async (req, res , next)=>{
const { name } = req.query
try {
    
    if(name){
        
        let buscarGameDb = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {attributes: [] }
             },
            where:{
                name:{
                    [Op.iLike]: "%" + name +"%"
                }
            }, 
            order: [
                ["name", "DESC"]
            ],

        })
        let dbtotal  = buscarGameDb.map((J) => J.toJSON())
     dbtotal.forEach(e => {
        e.genres = e.genres.map((x) => x.name).filter(p => p != null).join(', ')
      })
  
        
        
        
        let buscarGameApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=100`)
        buscarGameApiTodos = buscarGameApi.data.results.map(e=>{
            var game = {
                id:e.id,
                name: e.name,
                rating: e.rating,
                image: e.background_image ,
                genres: e.genres && e.genres.map(e=> e.name).filter(e=> e != null).join(", ")


            }
            return game

        })
        //Filtro el nombre,si incluye ese nombre en Mayuscula o Minuscula
        let TotalApi2 = buscarGameApiTodos.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
        let TotalApi3 = TotalApi2.sort((a, b) => a.name.localeCompare(b.name))
        let TotalDb3 = dbtotal.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
        let TotalDb4 = TotalDb3.sort((a, b) => a.name.localeCompare(b.name))
        let Total = [...TotalApi3,...TotalDb4]
        res.send(Total.length ? Total : 'Videogame no encontrado')
    }
    else{
        
        let getDb = await Videogame.findAll({include: {
            model: Genre,
            attributes: ['name'],
            through: {attributes: [] }
         },
        
            order: [
            ["name", "DESC"]
        ]
    })
    let Db = getDb.map((J) => J.toJSON())
     Db.forEach(C => {
        C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
      })

        let getApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`)
        let getApi2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`)
        let getApi3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`)

       await Promise.all([getApi,getApi2,getApi3,Db])

       .then((respuesta) => {
        apiresult = respuesta[0].data.results.concat(respuesta[1].data.results).concat(respuesta[2].data.results)
           let FilterApi = apiresult.map(e=>{
               return  {
                 id:e.id,
                name: e.name,
               released: e.released,
               image: e.background_image,
               rating: e.rating,
               platforms: e.platforms && e.platforms.map(e=> e.platform.name).filter(e=>e!= null).join(", "),
               genres: e.genres && e.genres.map(e=> e.name).filter(e=> e!= null).join(", "),
               origin: 'api'
        } })
        //Ordenarlo alfabeticamente 
        let AllvideogameApi =[...FilterApi, ...respuesta[3]]
        let TotalApi4 = AllvideogameApi.sort((a, b) => a.name.localeCompare(b.name));
        

        let Total1 = [...TotalApi4]
        res.send(Total1)
       })
      
        
        
    }
    
    
    
} catch (error) {
    next(error)
}


})

router.get("/:id", async (req, res , next)=>{
 const {id} = req.params
 try {
     if(id.includes("-")){
         let idDb = await Videogame.findByPk(id,{
            include: {
                model: Genre,
                attributes: ['name'],
                through: {attributes: [] }
             },})
            const info = {
                    name: idDb.name,
                    image: idDb.image,
                    rating: idDb.rating,
                    description: idDb.description,
                    released: idDb.released,
                    platforms: idDb.platforms,
                    genres: idDb.genres.map(p => p.name).join(', ')
            }
      res.send(info)

        
     }
     else{
        const idApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        let e = idApi.data
        const informacion = {
            name: e.name,
            description: e.description_raw,
            released: e.released,
            image: e.background_image,
            rating: e.rating,
            platforms: e.platforms && e.platforms.map(e=> e.platform.name).filter(e=>e!= null).join(", "),
            genres: e.genres && e.genres.map(e=> e.name).filter(e=> e!= null).join(", ")
        }
        res.send(informacion)
     }
 } catch (error) {
     
 }
       
   
})





module.exports = router;