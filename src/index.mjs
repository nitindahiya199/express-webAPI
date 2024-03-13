import express, { request, response } from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
// import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-stragegy.mjs";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://localhost/express_database")
  .then(()=>{
    console.log("connected to Database")
  })
  .catch((err) => console.log(`Error : ${err}`))

app.use(express.json());
app.use(cookieParser("Hello World"));
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

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    response.send(200);
  }
);

app.get(
  "/api/auth/status",
  (request, response) => {
    console.log(`Inside status`)
    console.log(`${request.user}`)
    return request.user ? response.send(request.user) : response.sendStatus(401);
  }
);

app.post(
  "/api/auth/logout",
  (request, response) => {
    if(!request.user) return response.sendStatus(401);
    request.logout((err) => {
      if(err) return response.sendStatus(400);
      response.send(200);
    })
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

// Login - cookie session Auth
// app.get("/", (request, response) => {
//   console.log(request.session);
//   console.log(request.session.id);
//   request.session.visited = true;
//   response.cookie("heyy..!!", "Hi", { maxAge: 60000 * 60 * 3 });
//   response.status(201).send({ msg: "Hello...!!" });
// });

// app.post("/api/auth", (request, response) => {
//   const {
//     body: { username, password },
//   } = request;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//     return response.status(401).send({ msg: "BAD CREDENTIALS" });
//   request.session.user = findUser;
//   return response.status(201).send(findUser);
// });

// app.get("/api/auth/status", (request,response) => {
//   request.sessionStore.get((request.sessionID), (err, session) =>{
//     console.log(session);
//   });
//   return request.session.user
//   ? response.status(200).send(request.session.user)
//   : response.status(401).send({msg : "Not Authenticated"})
// })

// app.post("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);

//   const { body: item } = request;
//   const { cart } = request.session;
//   if (cart) {
//     cart.push(item);
//   } else {
//     request.session.cart = [item];
//   }

//   return response.status(201).send(item);
// });

// app.get("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);

//   return response.send( request.session.cart ?? [])

// });
