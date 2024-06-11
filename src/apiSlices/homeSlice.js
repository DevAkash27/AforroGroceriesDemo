import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import HomeServices from '../apiServices/homeService';
import Status from './Status';

export const FetchPosts = createAsyncThunk('home/fetchPosts', async data => {
  try {
    return await (
      await HomeServices.getPosts(data)
    ).data;
  } catch (error) {
    return error.response.data;
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    response: '',
    error: '',
    cartProducts: [],
    paymentMethod: 'Credit/Debit Card',
    address: '',
    totalAmount: 0,
    mockData: [],
  },

  reducers: {
    addProduct: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.cartProducts.map(item => {
        if (item?.id === action?.payload?.id) {
          state.cartProducts.splice(state.cartProducts.indexOf(item), 1);
        }
      });
    },
    selectedPaymentOption: (state, action) => {
      state.paymentMethod = action?.payload;
    },

    setAddress: (state, action) => {
      state.address = action?.payload;
    },

    setTotalAmount: (state, action) => {
      state.totalAmount = action?.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(FetchPosts.pending, state => {
      state.loading = Status.LOADING;
      return state;
    });
    builder.addCase(FetchPosts.fulfilled, (state, action) => {
      state.loading = Status.SUCCESS;
      state.response = action.payload;
      state.mockData = action.payload;

      return state;
    });
    builder.addCase(FetchPosts.rejected, (state, action) => {
      state.loading = Status.ERROR;
      state.error = action.payload.errors;
    });
  },
});
export const {
  addProduct,
  removeProduct,
  selectedPaymentOption,
  setAddress,
  setTotalAmount,
} = homeSlice.actions;

export default homeSlice.reducer;
