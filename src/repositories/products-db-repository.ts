import { client } from "./db";

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
export type Product = {
  id: number;
  title: string;
};

export const productsRepository = {
  async getProduct(id: number): Promise<Product | undefined | null> {
    const product = await client
      .db("shop")
      .collection<Product>("products")
      .findOne({ id });
    return product;
  },
  async findProducts(title?: string | undefined | null): Promise<Product[]> {
    if (title) {
      return client
        .db("shop")
        .collection<Product>("products")
        .find({ title: { $regex: title } })
        .toArray();
    } else {
      return client
        .db("shop")
        .collection<Product>("products")
        .find({})
        .toArray();
    }
  },
  async deleteItem(id: number): Promise<boolean> {
    const result = await client
      .db("shop")
      .collection<Product>("products")
      .deleteOne({ id });

    return result.deletedCount === 1;
  },
  async createProduct(title: string): Promise<Product[]> {
    const newProduct = { id: +new Date(), title };
    const result = await client
      .db("shop")
      .collection<Product>("products")
      .insertOne(newProduct);

    products.push(newProduct);
    return products;
  },
  async changeProductName(id: number, title: string) {
    const result = await client
      .db("shop")
      .collection<Product>("products")
      .updateOne({ id }, { $set: { title } });

    return result.matchedCount === 1;
  },
};
