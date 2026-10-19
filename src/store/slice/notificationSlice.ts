import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationItem {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  items: NotificationItem[];
  unreadCount: number;
}

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((item) => !item.read).length;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const target = state.items.find((item) => item.id === action.payload);
      if (target && !target.read) {
        target.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
  },
});

export const { setNotifications, markAsRead } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
