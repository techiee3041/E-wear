import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: string;
  count: number; // Assuming a count property exists on the Product type
};

type InitialState = {
  isCartOpen: boolean;
  cart: Product[];
  items: Product[];
};

const initialState: InitialState = {
  isCartOpen: true,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, count: item.count + 1 }; // Return the updated item object
        }
        return item; // Return the unchanged item object
      });
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpne: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpne,
} = cartSlice.actions;

export default cartSlice.reducer;
