const express = require("express");
const router = express.Router();
const Movie = require("../../db/schemas/movieSchema");
router.get("/",async (req, res) => {
    const queryParams = req.query;
    const filters ={};
    if (queryParams.name){
        filters.name ={
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
    }
    if (queryParams.rating){
        filters.rating ={
            $gte: parseFloat(queryParams.rating),
        };
    }
    const movies = await Movie.find();
    res.json(movies);
});

router.post("/",async (req,res) =>
    {
    try{
        console.log(req.body);
        const moviesData = req.body;
        const newMovie = new Movie(moviesData);
        await newMovie.save();
        res.json({
            message:"Movie added successfully",
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error",
        });
    }
});
router.put("/:id",async (req, res) =>{
    try{
        const movieId = req.params.id;
        const updatedMovieData = req.body;
        await Movie.findByIdAndUpdate(movieId, updatedMovieData);
        res.json({
            message: "movie updated successfully",
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error",
        });
    }
});
router.delete("/:id",async (req, res) =>{
    try{
        const movieId = req.params.id;
        const deletedMovieData = req.body;
        await Movie.findByIdAndDelete(movieId, deletedMovieData);
        res.json({
            message: "internal server error",
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            message:"not deleted",
        });
    }
});
router.get("/:id",async (req, res) =>{
    try{
        const movieId = req.params.id;
        console.log("handling the get by id request");
        const movie = await movie.findById(movieId);
        res.json(movies);
    }catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({ message : "movie not found",});        
        }else {
            res.status(500).json({ message:"internal server error",});

        }
        
    }
});
module.exports=router;






