import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import items from '../../items.json';

export const loadItems = createAsyncThunk('items/loadItems', async (params: any, { dispatch }) => {
  console.log(items);
});

const initialState = {
  show: false,
  options: {
    // anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'center'
    // },
    position: 'top-center',
    autoHideDuration: 6000,
    title: 'Message',
    message: '',
    variant: null
  }
};
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsReset: () => initialState,
  }
});

export const { itemsReset } = itemsSlice.actions;

export default itemsSlice.reducer;
