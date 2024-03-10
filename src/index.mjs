import express from "express";
import router from "./routes/index.mjs"

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get("/", (request, response) => {
  response.status(201).send({msg :"Hello...!!"});
});