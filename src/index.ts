import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { productsRouter } from "./routers/product-router";
import { addressesRouter } from "./routers/addresses-router";

const app = express();
const port = 3000;

const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  req.blabla = "hello";
  next();
};
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  req.blabla = "hello";
  if (req.query.token === "123") {
    next();
  } else {
    res.send(401);
  }
};
let count = 0;
const counterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  count++;
  next();
};

const middleWare = bodyParser({});
app.use(middleWare);
app.use(counterMiddleware);
app.use(blablaMiddleware);
// app.use(authMiddleware);

app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);

app.get("/test", (req: Request, res: Response) => {
  //@ts-ignore
  const blabla = req.blabla;
  res.send({ value: blabla + "!!!" + count });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
