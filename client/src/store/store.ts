import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { api } from "../services/api.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rtkQueryErrorLogger } from "./error-middleware.ts";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch); // todo ???
