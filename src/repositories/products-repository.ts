const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepository = {
  getProduct(id: number) {
    const product = products.find((p) => p.id === id);
    return product;
  },
  findProducts(title?: string | undefined | null) {
    if (title) {
      const filteredProducts = products.filter(
        (p) => p.title.indexOf(title) > -1
      );
      return filteredProducts;
    } else {
      return products;
    }
  },
  deleteItem(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  createProduct(title: string) {
    const newProduct = { id: +new Date(), title };
    products.push(newProduct);
    return products;
  },
  changeProductName(id: number, title: string) {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
};
