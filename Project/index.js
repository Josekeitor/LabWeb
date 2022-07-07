let express = require("express");

let app = express();
let appRoutes = require("./Routes/app");
let handbars = require("express-handlebars");
let bodyParser = require("body-parser");
let appConfig = require("configs/app");

app.use(bodyParser.urlencoded({ extended: true }));

let methodOverride = require("method-override");
app.use(methodOverride("_method"));

const extName = "hbs";

let hbs = handbars.create({ extname: extName });

app.use("/", appRoutes);

app.engine(extName, hbs.engine);
app.set("view engine", extName);

app.listen(appConfig.express_port, () => {
  console.log(`App listening on port ${appConfig.express_port}`);
});
