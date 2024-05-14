const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
export type Product = {
  id: number;
  title: string;
};

export const productsRepository = {
  async getProduct(id: number): Promise<Product | undefined> {
    const product = products.find((p) => p.id === id);
    return product;
  },
  async findProducts(title?: string | undefined | null): Promise<Product[]> {
    if (title) {
      const filteredProducts = products.filter(
        (p) => p.title.indexOf(title) > -1
      );
      return filteredProducts;
    } else {
      return products;
    }
  },
  async deleteItem(id: number): Promise<boolean> {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  async createProduct(title: string): Promise<Product[]> {
    const newProduct = { id: +new Date(), title };
    products.push(newProduct);
    return products;
  },
  async changeProductName(id: number, title: string) {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
};
