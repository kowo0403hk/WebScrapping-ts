import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieSession from "cookie-session";
import scrapperRouter from "./src/routes/scrapperRoutes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2", "key3"],
  })
);

app.use("/api/webscrapper", scrapperRouter());

app.listen(8080, () => {
  console.log("Web Scrapper listening on port 8080");
});
