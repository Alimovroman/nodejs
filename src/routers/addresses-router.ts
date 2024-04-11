import { Router, Request, Response } from "express";
import { addressesRepository } from "../repositories/addresses-repository";

export const addressesRouter = Router({});

addressesRouter.get("/", (req: Request, res: Response) => {
  const address = addressesRepository.getAddresses(req.query.value?.toString());
  res.send(address);
});
addressesRouter.get("/:id", (req: Request, res: Response) => {
  const address = addressesRepository.getAddressItem(+req.params.id);
  if (address) {
    res.send(address);
  } else {
    res.send(404);
  }
});

addressesRouter.delete("/:id", (req: Request, res: Response) => {
  const isDeleteAddress = addressesRepository.deleteAddress(+req.params.id);
  isDeleteAddress ? res.send(204) : res.send(404);
});
addressesRouter.post("/", (req: Request, res: Response) => {
  const addresses = addressesRepository.createAddress(req.body.value);
  res.status(201).send(addresses);
});
addressesRouter.put("/:id", (req: Request, res: Response) => {
  const isChange = addressesRepository.changeAddress(
    +req.params.id,
    req.body.value
  );

  if (isChange) {
    const addresses = addressesRepository.getAddresses();
    res.send(addresses);
  } else {
    res.send(404);
  }
});
