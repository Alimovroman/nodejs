"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRepository = void 0;
const products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" },
];
exports.productsRepository = {
    getProduct(id) {
        const product = products.find((p) => p.id === id);
        return product;
    },
    findProducts(title) {
        if (title) {
            const filteredProducts = products.filter((p) => p.title.indexOf(title) > -1);
            return filteredProducts;
        }
        else {
            return products;
        }
    },
    deleteItem(id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    createProduct(title) {
        const newProduct = { id: +new Date(), title };
        products.push(newProduct);
        return products;
    },
    changeProductName(id, title) {
        const product = products.find((p) => p.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        else {
            return false;
        }
    },
};
