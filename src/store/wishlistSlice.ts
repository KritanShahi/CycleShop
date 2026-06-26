import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  items: number[];
}

const getLocalStorageWishlist = (): number[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const initialState: WishlistState = {
  items: getLocalStorageWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.items.indexOf(id);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(id);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("wishlist");
      }
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
