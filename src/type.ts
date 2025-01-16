import { Image as IImage } from "sanity"

export interface Product {
    id: number;
    title: string;
    isNew: boolean;
    oldPrice: number;
    price: number;
    description: string;
    category: string;
    brand: string;
    image: IImage;
    rating: number;
    quantity: number;
    isTrending: boolean;
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