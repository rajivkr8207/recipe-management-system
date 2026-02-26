const express = require("express")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.route")
const RecipeRouter = require("./routes/recipe.route")
const cors = require('cors')
const FavouriteModel = require("./models/favourite.model")
const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/recipe', RecipeRouter)
app.use('/api/favourite', FavouriteModel)


module.exports = app