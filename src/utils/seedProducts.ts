import { Product } from "./../models/Product";

const items = [
  { name: "Blue T-shirt", price: 19.99, imageUrl: "/images/tshirt-blue.jpg", countInStock: 10 },
  { name: "Sneakers", price: 59.99, imageUrl: "/images/sneakers.jpg", countInStock: 5 },
];

export const seed = async () => {
  await Product.deleteMany({});
  await Product.insertMany(items);
  console.log("Seeded products");
};