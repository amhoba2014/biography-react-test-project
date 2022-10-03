import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define types:

export enum ThemeMode {
  Dark = "Dark",
  Light = "Light"
}

interface ThemingState {
  mode: ThemeMode
}

// Define initial state:

const initialState: ThemingState = {
  mode: ThemeMode.Dark,
}

// Create the slice of reducers:

export const theming = createSlice({
  name: 'theming',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    }
  },
})

// Export everything:

export const { setThemeMode, toggleThemeMode } = theming.actions

export default theming.reducer