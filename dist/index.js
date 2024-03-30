"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_router_1 = require("./routers/product-router");
const addresses_router_1 = require("./routers/addresses-router");
const app = (0, express_1.default)();
const port = 3000;
const middleWare = (0, body_parser_1.default)({});
app.use(middleWare);
app.use("/products", product_router_1.productsRouter);
app.use("/addresses", addresses_router_1.addressesRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
