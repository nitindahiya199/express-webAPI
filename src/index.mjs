import express, { request, response } from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "nitin the dev",
    saveUninitialized: false,
    unsave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("heyy..!!", "Hi", { maxAge: 60000 * 60 * 3 });
  response.status(201).send({ msg: "Hello...!!" });
});

app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "BAD CREDENTIALS" });
  request.session.user = findUser;
  return response.status(201).send(findUser);
});

// app.get("/", (request,response) => {
//   request.sessionStore.get((request.sessionID), (err, session) =>{
//     console.log(session);
//   });
//   return request.session.user
//   ? response.status(200).send(request.session.user)
//   : response.status(401).send({msg : "Not Authenticated"})
// })

app.get("/api/auth/status", (request,response) => {
  return request.session.user
  ? response.status(200).send(request.session.user)
  : response.status(401).send({msg : "Not Authenticated"})
})

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }

  return response.status(201).send(item);
});
