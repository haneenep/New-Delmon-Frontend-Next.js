import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  datas: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
});

export const { } = productSlice.actions;

export default productSlice.reducer;
