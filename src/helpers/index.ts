import { client } from "@/sanity/lib/client";

export const getLawn = async () => {
  const res = await client.fetch(`*[_type=="lawn"] {
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
  }`)
  return res
}

export const getEmbroided = async () => {
  const res = await client.fetch(`*[_type=="embroided"] {
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
  }`)
  return res
}

export const getLinen = async () => {
  const res = await client.fetch(`*[_type=="linen"] {
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
  }`)
  return res
}

export const getChickenKari = async () => {
  const res = await client.fetch(`*[_type=="chickenKari"] {
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
  }`)
  return res
}

export const getKhaddar = async () => {
  const res = await client.fetch(`*[_type=="khaddar"] {
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
  }`)
  return res
}

export const getTrendingProduct = async () => {
  const res = await client.fetch(`*[_type in ["lawn", "embroided", "linen", "chickenKari", "khaddar"] && isTrending == true] {
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
  }`
  );
  return res
};

export const calculatePercentage = (oldPrice: any, price: any) => {
  return !!parseFloat(price) && !!parseFloat(oldPrice)
    ? (100 - (oldPrice / price) * 100).toFixed(0)
    : 0;
};

export const getSingleProduct = async (_id: string) => {
  const query = `*[_type in ["lawn", "embroided", "linen", "chickenKari", "khaddar"] && id == $_id]{
    id,
    title,
    isNew,
    isTrending,
    oldPrice,
    price,
    rating,
    quantity,
    description,
    image,
    brand
    }[0]`
  const result = await client.fetch(query, { _id });
  return result;
};