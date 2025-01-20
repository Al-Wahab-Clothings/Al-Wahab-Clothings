import { Product } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string
  email: string
  image: string
  unique_id: number
}

interface Order {
  order: Product[]; // Or any structure your order uses
  orderId: string; // Example of additional properties in an order
  totalPrice: number;
  status: string;
}

interface StoreState {
  productData: Product[];
  userInfo: null | User;
  orderData: Order[];
  cartData: Product[];
}

const initialState: StoreState = {
  productData: [],
  userInfo: null,
  orderData: [],
  cartData: [],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {

    setCartData: (state, action: PayloadAction<Product[]>) => {
      state.productData = action.payload;
    },

    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: Product) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity || 1;
      } else {
        state.productData.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: Product) => item.id === action.payload.id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: Product) => item.id === action.payload.id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity === 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
    saveOrder: (state, action) => {
      state.orderData = action.payload;
    },
    resetOrder: (state) => {
      state.orderData = [];
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: string }>) => {
      const { orderId, status } = action.payload;
      const order = state.orderData.find((o) => o.orderId === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  deleteUser,
  saveOrder,
  resetOrder,
  setCartData,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;