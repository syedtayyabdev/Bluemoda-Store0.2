import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order } from '../types';

interface StoreState {
  user: User | null;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addToCart: (product: Product, size: string) => void;
  decrementCartItem: (productId: string, size: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (order: Order) => void;
  login: () => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: {
        id: 'u1',
        name: 'Alex Rivera',
        email: 'alex@example.com',
        avatar: 'https://i.pravatar.cc/150?u=alex',
      },
      cart: [],
      wishlist: [],
      orders: [],
      addToCart: (product, size) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id && item.selectedSize === size
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id && item.selectedSize === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1, selectedSize: size }],
          };
        }),
      decrementCartItem: (productId, size) => 
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === productId && item.selectedSize === size
          );
          if (existingItem && existingItem.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item.id === productId && item.selectedSize === size
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }
          // Optional: remove if quantity becomes 0, but usually decrement stops at 1 or explicit remove
          return { cart: state.cart }; 
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) =>
        set((state) => {
          const inWishlist = state.wishlist.includes(productId);
          return {
            wishlist: inWishlist
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        }),
      placeOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
          cart: [], // Clear cart after order
        })),
      login: () =>
        set({
          user: {
            id: 'u1',
            name: 'Alex Rivera',
            email: 'alex@example.com',
            avatar: 'https://i.pravatar.cc/150?u=alex',
          },
        }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'bluemoda-storage',
    }
  )
);