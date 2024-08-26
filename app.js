require("dotenv").config();
const movieRoutes = require("./routes/movies/moviesroutes");
const index = require("./db/index");

const express = require("express");
const app = new express();
const port = process.env.PORT || 8080;
index();
app.use(express.json());
app.use("/movies",movieRoutes);




app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)

});