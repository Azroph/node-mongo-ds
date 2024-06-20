const { Hono } = require("hono");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");

const app = new Hono();
app.use("*", bodyParser.json());

const dbUsername = encodeURIComponent("falgitoine");
const dbPassword = encodeURIComponent("MongoMongo69");
const clusterName = "cluster0";

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${clusterName}.mongodb.net/lyon-flipper?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    const flipperRoutes = require("./routes/flippers");
    const marqueRoutes = require("./routes/marques");

    app.route("/flippers/*", flipperRoutes);
    app.route("/marques/*", marqueRoutes);

    const port = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas", err);
  });
