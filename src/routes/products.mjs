import { Router } from "express";

const router = Router();

router.get("/api/product", (request, response) => {
    response.status(201).send([
      {
        id: 13,
        product: "product1",
        price: "$232",
      },
    ]);
  });

  export default router;