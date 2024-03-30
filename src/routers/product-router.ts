import { Router, Request, Response } from "express";

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRouter = Router({});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
productsRouter.get("/", (req: Request, res: Response) => {
  if (req.query.title) {
    let title = req.query.title.toString();
    const product = products.filter((p) => p.title.indexOf(title) > -1);
    product.length === 0 ? res.send(404) : res.send(product);
  } else {
    res.send(products);
  }
});
productsRouter.delete("/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});
productsRouter.post("/", (req: Request, res: Response) => {
  const newProduct = { id: products.length + 1, title: req.body.title };
  products.push(newProduct);
  res.status(201).send(products);
});
productsRouter.put("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === +req.params.id);

  if (product) {
    product.title = req.body.title;
    res.status(200).send(products);
  } else {
    res.send(404);
  }
});
