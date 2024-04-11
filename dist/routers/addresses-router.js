"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const addresses_repository_1 = require("../repositories/addresses-repository");
exports.addressesRouter = (0, express_1.Router)({});
exports.addressesRouter.get("/", (req, res) => {
    var _a;
    const address = addresses_repository_1.addressesRepository.getAddresses((_a = req.query.value) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(address);
});
exports.addressesRouter.get("/:id", (req, res) => {
    const address = addresses_repository_1.addressesRepository.getAddressItem(+req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
exports.addressesRouter.delete("/:id", (req, res) => {
    const isDeleteAddress = addresses_repository_1.addressesRepository.deleteAddress(+req.params.id);
    isDeleteAddress ? res.send(204) : res.send(404);
});
exports.addressesRouter.post("/", (req, res) => {
    const addresses = addresses_repository_1.addressesRepository.createAddress(req.body.value);
    res.status(201).send(addresses);
});
exports.addressesRouter.put("/:id", (req, res) => {
    const isChange = addresses_repository_1.addressesRepository.changeAddress(+req.params.id, req.body.value);
    if (isChange) {
        const addresses = addresses_repository_1.addressesRepository.getAddresses();
        res.send(addresses);
    }
    else {
        res.send(404);
    }
});
