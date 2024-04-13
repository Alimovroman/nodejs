"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
const express_validator_1 = require("express-validator");
const input_validate_middleware_1 = require("../middleware/input-validate-middleware");
exports.productsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)("title").trim().isLength({ min: 3, max: 30 });
exports.productsRouter.get("/:id", (req, res) => {
    const product = products_repository_1.productsRepository.getProduct(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.get("/", (req, res) => {
    var _a;
    const products = products_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(products);
});
exports.productsRouter.delete("/:id", (req, res) => {
    const isDelete = products_repository_1.productsRepository.deleteItem(+req.params.id);
    isDelete ? res.send(204) : res.send(404);
});
exports.productsRouter.post("/", titleValidation, input_validate_middleware_1.inputValidaionMiddleware, (req, res) => {
    const products = products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(products);
});
exports.productsRouter.put("/:id", titleValidation, input_validate_middleware_1.inputValidaionMiddleware, (req, res) => {
    const isChange = products_repository_1.productsRepository.changeProductName(+req.params.id, req.body.title);
    if (isChange) {
        const products = products_repository_1.productsRepository.findProducts();
        res.send(products);
    }
    else {
        res.send(404);
    }
});
