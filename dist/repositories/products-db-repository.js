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
exports.productsRepository = void 0;
const db_1 = require("./db");
const products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" },
];
exports.productsRepository = {
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield db_1.client
                .db("shop")
                .collection("products")
                .findOne({ id });
            return product;
        });
    },
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return db_1.client
                    .db("shop")
                    .collection("products")
                    .find({ title: { $regex: title } })
                    .toArray();
            }
            else {
                return db_1.client
                    .db("shop")
                    .collection("products")
                    .find({})
                    .toArray();
            }
        });
    },
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client
                .db("shop")
                .collection("products")
                .deleteOne({ id });
            return result.deletedCount === 1;
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = { id: +new Date(), title };
            const result = yield db_1.client
                .db("shop")
                .collection("products")
                .insertOne(newProduct);
            products.push(newProduct);
            return products;
        });
    },
    changeProductName(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.client
                .db("shop")
                .collection("products")
                .updateOne({ id }, { $set: { title } });
            return result.matchedCount === 1;
        });
    },
};
