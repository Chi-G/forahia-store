import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '@/components/ui/use-toast';

export interface WishlistItem {
  id: string;
  productID: number;
  title: string;
  company: string;
  price: string;
  image: string;
  category: string;
  rating?: number;
  dateAdded: string;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  numItemsInWishlist: number;
}

const defaultState: WishlistState = {
  wishlistItems: [],
  numItemsInWishlist: 0,
};

const getWishlistFromLocalStorage = (): WishlistState => {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : defaultState;
  } catch {
    return defaultState;
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: getWishlistFromLocalStorage(),
  reducers: {
    addToWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'id' | 'dateAdded'>>) => {
      const { productID } = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item.productID === productID
      );

      if (existingItem) {
        toast({ 
          description: 'Item is already in your wishlist',
          variant: 'default'
        });
        return;
      }

      const newWishlistItem: WishlistItem = {
        ...action.payload,
        id: `wishlist-${productID}-${Date.now()}`,
        dateAdded: new Date().toISOString(),
      };

      state.wishlistItems.push(newWishlistItem);
      state.numItemsInWishlist += 1;

      localStorage.setItem('wishlist', JSON.stringify(state));
      toast({ description: 'Item added to wishlist!' });
    },

    removeFromWishlist: (state, action: PayloadAction<{ productID: number }>) => {
      const { productID } = action.payload;
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item.productID === productID
      );

      if (itemIndex !== -1) {
        state.wishlistItems.splice(itemIndex, 1);
        state.numItemsInWishlist -= 1;

        localStorage.setItem('wishlist', JSON.stringify(state));
        toast({ description: 'Item removed from wishlist' });
      }
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.numItemsInWishlist = 0;
      localStorage.setItem('wishlist', JSON.stringify(state));
      toast({ description: 'Wishlist cleared' });
    },

    toggleWishlistItem: (state, action: PayloadAction<Omit<WishlistItem, 'id' | 'dateAdded'>>) => {
      const { productID } = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item.productID === productID
      );

      if (existingItem) {
        // Remove from wishlist
        const itemIndex = state.wishlistItems.findIndex(
          (item) => item.productID === productID
        );
        state.wishlistItems.splice(itemIndex, 1);
        state.numItemsInWishlist -= 1;
        toast({ description: 'Removed from wishlist' });
      } else {
        // Add to wishlist
        const newWishlistItem: WishlistItem = {
          ...action.payload,
          id: `wishlist-${productID}-${Date.now()}`,
          dateAdded: new Date().toISOString(),
        };
        state.wishlistItems.push(newWishlistItem);
        state.numItemsInWishlist += 1;
        toast({ description: 'Added to wishlist!' });
      }

      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
