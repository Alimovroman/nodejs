"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const addresses = [
    { id: 1, value: "lenina 1" },
    { id: 2, value: "karla marksa 5" },
];
exports.addressesRouter = (0, express_1.Router)({});
exports.addressesRouter.get("/", (req, res) => {
    if (req.query.value) {
        const value = req.query.value.toString();
        const address = addresses.filter((a) => a.value.indexOf(value) > -1);
        address.length === 0 ? res.send(404) : res.send(address);
    }
    res.send(addresses);
});
exports.addressesRouter.get("/:id", (req, res) => {
    const address = addresses.find((a) => a.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
exports.addressesRouter.delete("/:id", (req, res) => {
    for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].id === +req.params.id) {
            addresses.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.addressesRouter.post("/", (req, res) => {
    const newAddress = { id: +new Date(), value: req.body.value };
    addresses.push(newAddress);
    res.status(201).send(addresses);
});
exports.addressesRouter.put("/:id", (req, res) => {
    const address = addresses.find((a) => a.id === +req.params.id);
    if (address) {
        address.value = req.body.value;
        res.send(address);
    }
    else {
        res.send(404);
    }
});
