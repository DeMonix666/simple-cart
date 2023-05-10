import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import items from '../../items.json';

export interface Item {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
  quantity?: number;
};

export const loadItems = createAsyncThunk('items/loadItems', async (params: any, { dispatch }) => {
  const categories = items.filter((item: Item, i: number, arr: Item[]) => {
    return arr.findIndex(t => t.category === item.category) === i
  });

  return {
    categories,
    items,
  };
});

const initialState: { categories: Item[], items: Item[] } = {
  categories: [],
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsReset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(loadItems.fulfilled, (state: any, action: any) => {
      return action.payload;
    });
  }
});

export const { itemsReset } = itemsSlice.actions;

export default itemsSlice.reducer;
