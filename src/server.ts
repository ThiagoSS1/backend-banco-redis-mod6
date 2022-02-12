import App from "./core/presentation/app";
import Database from "./core/infra/data/connections/Database";
import "dotenv/config";
import Redis from "./core/infra/data/connections/redis";

Promise.all([new Database().openConnection() , new Redis().openConnection() ])
  .then(() => {
    const app = new App();
    app.init();
    app.start(process.env.PORT || "8080");
  })
  .catch((err) => {
    console.log(err);
  });