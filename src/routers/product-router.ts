import { Router, Request, Response } from "express";
import { productsRepository } from "../repositories/products-repository";

export const productsRouter = Router({});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const product = productsRepository.getProduct(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
productsRouter.get("/", (req: Request, res: Response) => {
  const products = productsRepository.findProducts(req.query.title?.toString());
  res.send(products);
});
productsRouter.delete("/:id", (req: Request, res: Response) => {
  const isDelete = productsRepository.deleteItem(+req.params.id);
  isDelete ? res.send(204) : res.send(404);
});
productsRouter.post("/", (req: Request, res: Response) => {
  const products = productsRepository.createProduct(req.body.title);
  res.status(201).send(products);
});
productsRouter.put("/:id", (req: Request, res: Response) => {
  const isChange = productsRepository.changeProductName(
    +req.params.id,
    req.body.title
  );
  if (isChange) {
    const products = productsRepository.findProducts();
    res.send(products);
  } else {
    res.send(404);
  }
});