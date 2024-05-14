"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_db_repository_1 = require("../repositories/products-db-repository");
const express_validator_1 = require("express-validator");
const input_validate_middleware_1 = require("../middleware/input-validate-middleware");
exports.productsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)("title").trim().isLength({ min: 3, max: 30 });
exports.productsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_db_repository_1.productsRepository.getProduct(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const products = yield products_db_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(products);
}));
exports.productsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDelete = yield products_db_repository_1.productsRepository.deleteItem(+req.params.id);
    isDelete ? res.send(204) : res.send(404);
}));
exports.productsRouter.post("/", titleValidation, input_validate_middleware_1.inputValidaionMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_db_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(products);
}));
exports.productsRouter.put("/:id", titleValidation, input_validate_middleware_1.inputValidaionMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isChange = yield products_db_repository_1.productsRepository.changeProductName(+req.params.id, req.body.title);
    if (isChange) {
        const products = yield products_db_repository_1.productsRepository.findProducts();
        res.send(products);
    }
    else {
        res.send(404);
    }
}));
