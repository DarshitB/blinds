import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total =
        state.total +
        action.payload.Pricewithaddition * action.payload.Qtyvalue;

      toast.success("product is added to cart sussessfully");
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        (product) => product.randomnumber !== action.payload.randomnumber
      );
      state.total = parseFloat(
        (
          state.total -
          action.payload.Pricewithaddition * action.payload.Qtyvalue
        ).toFixed(2)
      );
      toast.success(`"${action.payload.title}" is Removed from the cart`);
    },
    decreaseCart: (state, action) => {
      const itemindex = state.products.findIndex(
        (product) => product.randomnumber === action.payload.randomnumber
      );

      if (state.products[itemindex].Qtyvalue > 1) {
        state.products[itemindex].Qtyvalue -= 1;
        state.total = state.total - action.payload.Pricewithaddition;
      } else {
        toast.error(
          `The quantity cannot be decreased as it is already minimum`
        );
      }
    },
    increaseCart: (state, action) => {
      const itemindex = state.products.findIndex(
        (product) => product.randomnumber === action.payload.randomnumber
      );

      state.products[itemindex].Qtyvalue += 1;
      state.total = state.total + action.payload.Pricewithaddition;
    },
    emptyCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  decreaseCart,
  increaseCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
