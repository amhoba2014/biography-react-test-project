import { configureStore } from '@reduxjs/toolkit'

import theming from './reducers/theming'

const store = configureStore({
  reducer: {
    theming
  },
})

export default store

// Infer types:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch