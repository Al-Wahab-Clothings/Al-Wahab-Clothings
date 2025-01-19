import { Image as IImage } from "sanity"

export interface Product {
  id: number;
  title: string;
  isNew: boolean;
  isTrending: boolean;
  oldPrice: number;
  price: number;
  rating: number;
  quantity: number;
  description: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      text: string;
      marks: string[];
    }>;
    markDefs: any[];
    style: string;
  }>;
  category: string;
  brand: string;
  image: IImage;
}

export interface ItemProps {
  item: Product;
}

export interface StateProps {
  shopping: {
    productData: [];
    userInfo: {};
    orderData: {
      order: Product[];
    };
  };
  user: {
    userId: null | string | number,
  }
}