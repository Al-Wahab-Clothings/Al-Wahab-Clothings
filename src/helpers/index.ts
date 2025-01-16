import { client } from "../../sanity/lib/client";

export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"] {
        id,
        title,
        oldPrice,
        price,
        image,
        category -> {
          name
        },
        brand -> {
          name
        },
        description,
        isNew,
        rating,
        quantity,
        isTrending,
    }`)
  return res
}

export const getTrendingProduct = async () => {
  const res = await client.fetch(`*[_type == "product" && isTrending == true] {
    id,
    title,
    oldPrice,
    price,
    image,
    category -> {
      name
    },
    brand -> {
      name
    },
    description,
    isNew,
    rating,
    quantity,
    isTrending,
}`);
  return res
};

export const calculatePercentage = (oldPrice: any, price: any) => {
  return !!parseFloat(price) && !!parseFloat(oldPrice)
    ? (100 - (oldPrice / price) * 100).toFixed(0)
    : 0;
};

export const getSingleProduct = async (_id: number) => {
  const query = `*[_type == "product" && id == $_id]{
    id,
    title,
    oldPrice,
    price,
    image,
    category -> {
      name
    },
    brand -> {
      name
    },
    description,
    isNew,
    rating,
    quantity,
    isTrending,
}[0]`
  const result = await client.fetch(query, { _id });
  return result;
};