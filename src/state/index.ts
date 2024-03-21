import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Product = {
  id: string;
  count: number;
  image: string;
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  category: string;
};

type InitialState = {
  isLoading: boolean;
  isCartOpen: boolean;
  cart: Product[];
  items: Product[];
  error: string;
};

const initialState: InitialState = {
  isLoading: false,
  isCartOpen: false,
  cart: [],
  items: [],
  error: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    addToCart: (state, action: PayloadAction<{ item: Product }>) => {
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    },
    decreaseCount: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      console.log("Before toggle:", state.isCartOpen);
      state.isCartOpen = !state.isCartOpen;
      console.log("After toggle:", state.isCartOpen);
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
