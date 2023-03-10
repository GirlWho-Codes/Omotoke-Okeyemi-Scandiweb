import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cart: [],
  totalCart: 0,
  currency: "$",
  cartItemIds: [],
  qtyTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, payload) {
      state.cart = [...state.cart, payload.payload];
      state.totalCart = state.totalCart + 1;
      state.cartItemIds = [...state.cartItemIds, payload.payload.id];
      state.qtyTotal = state.qtyTotal + payload.payload.qty;
      alert('Item Added to cart');
    },
    removeFromCart(state, payload) {
      let removedItem = state.cart.find((item) => item.id === payload.payload);
      state.cart = state.cart.filter((item) => item.id !== payload.payload);
      state.totalCart = state.totalCart - 1;
      state.cartItemIds = state.cartItemIds.filter(
        (item) => item !== payload.payload
      );
      state.qtyTotal = state.qtyTotal - removedItem?.qty;
    },
    clearCart(state) {
      state.cart = [];
      state.totalCart = 0;
      state.qtyTotal = 0;
      state.cartItemIds = [];
    },
    updateAttribute(state, payload) {
      let cartItem = state.cart.find((item) => item.id === payload.payload.id);
      cartItem.selected = { ...cartItem.selected, ...payload.payload.newAttr };

      state.cart = [...state.cart];
    },
    handleItemQuantity(state, payload) {
      let x = state.cart.find((item) => item.id === payload.payload.id);
      if (x.qty === 1 && payload.payload.subtract) {
        return;
      } else {
        x.qty = payload.payload.add ? x.qty + 1 : x.qty - 1;
        state.qtyTotal = payload.payload.add
          ? state.qtyTotal + 1
          : state.qtyTotal - 1;
      }

      state.cart = [...state.cart];
    },
    handleCurrency(state, payload) {
      state.currency = payload.payload;
    },
  },
});

export const {
  addToCart,
  handleCurrency,
  handleItemQuantity,
  removeFromCart,
  updateAttribute,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
