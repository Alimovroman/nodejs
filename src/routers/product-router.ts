import { Router, Request, Response } from "express";
import {
  Product,
  productsRepository,
} from "../repositories/products-db-repository";
import { body, validationResult } from "express-validator";
import { inputValidaionMiddleware } from "../middleware/input-validate-middleware";

export const productsRouter = Router({});

const titleValidation = body("title").trim().isLength({ min: 3, max: 30 });

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const product = await productsRepository.getProduct(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
productsRouter.get("/", async (req: Request, res: Response) => {
  const products: Product[] = await productsRepository.findProducts(
    req.query.title?.toString()
  );

  res.send(products);
});
productsRouter.delete("/:id", async (req: Request, res: Response) => {
  const isDelete = await productsRepository.deleteItem(+req.params.id);
  isDelete ? res.send(204) : res.send(404);
});
productsRouter.post(
  "/",
  titleValidation,
  inputValidaionMiddleware,
  async (req: Request, res: Response) => {
    const products: Product[] = await productsRepository.createProduct(
      req.body.title
    );
    res.status(201).send(products);
  }
);
productsRouter.put(
  "/:id",
  titleValidation,
  inputValidaionMiddleware,
  async (req: Request, res: Response) => {
    const isChange = await productsRepository.changeProductName(
      +req.params.id,
      req.body.title
    );
    if (isChange) {
      const products: Product[] = await productsRepository.findProducts();
      res.send(products);
    } else {
      res.send(404);
    }
  }
);
