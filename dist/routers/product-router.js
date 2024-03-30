"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" },
];
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get("/:id", (req, res) => {
    const product = products.find((p) => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.get("/", (req, res) => {
    if (req.query.title) {
        let title = req.query.title.toString();
        const product = products.filter((p) => p.title.indexOf(title) > -1);
        product.length === 0 ? res.send(404) : res.send(product);
    }
    else {
        res.send(products);
    }
});
exports.productsRouter.delete("/:id", (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.productsRouter.post("/", (req, res) => {
    const newProduct = { id: products.length + 1, title: req.body.title };
    products.push(newProduct);
    res.status(201).send(products);
});
exports.productsRouter.put("/:id", (req, res) => {
    const product = products.find((p) => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.status(200).send(products);
    }
    else {
        res.send(404);
    }
});
