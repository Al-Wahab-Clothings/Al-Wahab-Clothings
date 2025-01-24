import { Image as IImage } from "sanity"

export interface Product {
  id: string;
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
  brand: string;
  image: IImage;
}

export interface ItemProps {
  item: Product;
}

export interface Order {
  title: string;
  price: number;
  image: IImage;
  orderId: string;
  product: Product;
  quantity: number;
  payment: string;
  unit_price: number 
}

export interface StateProps {
  shopping: {
    productData: [];
    userInfo: {};
    orderData: Order[];
  };
  user: {
    userId: null | string | number,
  }
}