import express from "express"
import session from "express-session";
import indexRoutes from "./routes/index.routes"
import {create} from "express-handlebars"
import path from "path";
import bodyParser from "body-parser"

const app = express();

app.use(express.json())

app.use(session({
    secret: 'aXqoe98',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'));

const exphbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout:'main'
})

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs")

app.use(indexRoutes);

app.use(express.static(path.join(__dirname, "public")))

export default app;