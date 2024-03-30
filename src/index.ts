import express from "express";
import bodyParser from "body-parser";
import { productsRouter } from "./routers/product-router";
import { addressesRouter } from "./routers/addresses-router";

const app = express();
const port = 3000;

const middleWare = bodyParser({});
app.use(middleWare);

app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
