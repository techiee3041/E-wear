import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebaseconfig";
import { getDownloadURL, ref } from "firebase/storage";

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

export const fetchItems = createAsyncThunk<Product[]>(
  "cart/fetchItems",
  async () => {
    const itemCollectionRef = collection(db, "item");
    const data = await getDocs(itemCollectionRef);
    const items: Product[] = [];

    const downloadURLPromises = data.docs.map(async (doc) => {
      const item = doc.data() as Product;
      item.id = doc.id;
      const imageRef = ref(storage, doc.data().image);
      item.image = await getDownloadURL(imageRef);
      return item;
    });

    const itemsWithDownloadURLs = await Promise.all(downloadURLPromises);

    items.push(...itemsWithDownloadURLs);
    return items;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        // Set the state to indicate that the fetch is in progress
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        // Update the state with the fetched items and set the fetch as complete
        state.items = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        // Set the error state if the fetch fails
        state.isLoading = false;
        state.error = action.error.message || "something went wrong";
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
