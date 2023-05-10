import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import items from '../../items.json';
import { Item } from './itemsSlice';

const calculateSummary = (items: Item[]) => {
  let totalItems = 0;
  let totalAmount = 0;

  items.forEach((item: Item) => {
    totalItems += item.quantity;
    totalAmount += item.unitPrice * item.quantity;
  });

  return {
    totalItems,
    totalAmount
  }
};

export const addCart = createAsyncThunk('cart/addCart', async (item: Item, { dispatch, getState }: any) => {
  const { cart } = getState();
  let items: any[] = [...cart.items];

  const { id, imageUrl, productName, unitPrice } = item;

  //check if item already exits
  const index = items.findIndex((cartItem: Item) => cartItem.id === item.id);
  if (index >= 0) {
    const quantity = Number(items[index].quantity) + 1;
    items[index] = {
      ...items[index],
      quantity
    }
  } else {
    items = [{
      id,
      imageUrl,
      productName,
      unitPrice,
      quantity: 1
    },
    ...items];
  }

  const { totalItems, totalAmount } = calculateSummary(items)
  return {
    items,
    totalItems,
    totalAmount
  };
});

export const cartCheckout = createAsyncThunk('cart/cartCheckout', async (params: any, { dispatch, getState }: any) => {
  const { cart } = getState();

  dispatch(cartReset());
  return true;
});

export const cartUpdateQuantity = createAsyncThunk('cart/updateQuantity', async ({ id, quantity }: { id: string, quantity: number }, { dispatch, getState }: any) => {
  const { cart } = getState();
  const items: any[] = [...cart.items];

  const index = items.findIndex((cartItem: Item) => cartItem.id === id);
  if (index >= 0) {
    items[index] = {
      ...items[index],
      quantity
    }
  }

  const { totalItems, totalAmount } = calculateSummary(items)

  return {
    items,
    totalItems,
    totalAmount
  };
});

export const cartDeleteItem = createAsyncThunk('cart/cartDeleteItem', async (item: Item, { dispatch, getState }: any) => {
  const { cart } = getState();
  const items: any[] = [...cart.items];

  const index = items.findIndex((cartItem: Item) => cartItem.id === item.id);
  if (index >= 0) {
    items.splice(index, 1);
  }

  const { totalItems, totalAmount } = calculateSummary(items)

  return {
    items,
    totalItems,
    totalAmount
  };
});

const initialState: any = {
  totalItems: 0,
  totalAmount: 0,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartReset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(addCart.fulfilled, (state: any, action: any) => {
      return action.payload;
    });
    builder.addCase(cartDeleteItem.fulfilled, (state: any, action: any) => {
      return action.payload;
    });
    builder.addCase(cartUpdateQuantity.fulfilled, (state: any, action: any) => {
      return action.payload;
    });

  }
});

export const { cartReset } = cartSlice.actions;

export default cartSlice.reducer;
