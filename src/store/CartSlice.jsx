import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      // action.payload = { id, type: 'increment' | 'decrement' }
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        if (action.payload.type === 'increment') {
          item.quantity += 1;
        } else if (action.payload.type === 'decrement') {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.items = state.items.filter(i => i.id !== action.payload.id);
          }
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
