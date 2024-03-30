import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const middleWare = bodyParser({});
app.use(middleWare);

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
const addresses = [
  { id: 1, value: "lenina 1" },
  { id: 2, value: "karla marksa 5" },
];

// app.get("/products", (req: Request, res: Response) => {
//   res.send(products);
// });

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    let title = req.query.title.toString();
    const product = products.filter((p) => p.title.indexOf(title) > -1);
    product.length === 0 ? res.send(404) : res.send(product);
  } else {
    res.send(products);
  }
});
app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});
app.post("/products", (req: Request, res: Response) => {
  const newProduct = { id: products.length + 1, title: req.body.title };
  products.push(newProduct);
  res.status(201).send(products);
});
app.put("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === +req.params.id);

  if (product) {
    product.title = req.body.title;
    res.status(200).send(products);
  } else {
    res.send(404);
  }
});

app.get("/addresses", (req: Request, res: Response) => {
  res.send(addresses);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
