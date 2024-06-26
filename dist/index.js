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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_router_1 = require("./routers/product-router");
const addresses_router_1 = require("./routers/addresses-router");
const db_1 = require("./repositories/db");
const app = (0, express_1.default)();
const port = 3000;
const blablaMiddleware = (req, res, next) => {
    //@ts-ignore
    req.blabla = "hello";
    next();
};
const authMiddleware = (req, res, next) => {
    //@ts-ignore
    req.blabla = "hello";
    if (req.query.token === "123") {
        next();
    }
    else {
        res.send(401);
    }
};
let count = 0;
const counterMiddleware = (req, res, next) => {
    count++;
    next();
};
const middleWare = (0, body_parser_1.default)({});
app.use(middleWare);
app.use(counterMiddleware);
app.use(blablaMiddleware);
// app.use(authMiddleware);
app.use("/products", product_router_1.productsRouter);
app.use("/addresses", addresses_router_1.addressesRouter);
app.get("/test", (req, res) => {
    //@ts-ignore
    const blabla = req.blabla;
    res.send({ value: blabla + "!!!" + count });
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
