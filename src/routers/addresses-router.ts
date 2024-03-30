import { Router, Request, Response } from "express";

const addresses = [
  { id: 1, value: "lenina 1" },
  { id: 2, value: "karla marksa 5" },
];

export const addressesRouter = Router({});

addressesRouter.get("/", (req: Request, res: Response) => {
  if (req.query.value) {
    const value = req.query.value.toString();
    const address = addresses.filter((a) => a.value.indexOf(value) > -1);
    address.length === 0 ? res.send(404) : res.send(address);
  }

  res.send(addresses);
});
addressesRouter.get("/:id", (req: Request, res: Response) => {
  const address = addresses.find((a) => a.id === +req.params.id);
  if (address) {
    res.send(address);
  } else {
    res.send(404);
  }
});

addressesRouter.delete("/:id", (req: Request, res: Response) => {
  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].id === +req.params.id) {
      addresses.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});
addressesRouter.post("/", (req: Request, res: Response) => {
  const newAddress = { id: +new Date(), value: req.body.value };
  addresses.push(newAddress);
  res.status(201).send(addresses);
});
addressesRouter.put("/:id", (req: Request, res: Response) => {
  const address = addresses.find((a) => a.id === +req.params.id);
  if (address) {
    address.value = req.body.value;
    res.send(address);
  } else {
    res.send(404);
  }
});
