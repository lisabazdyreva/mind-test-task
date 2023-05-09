import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action.payload?.status === "FETCH_ERROR") {
      console.warn(action.payload.error);
    } else if (action.payload?.status === "PARSING_ERROR") {
      console.warn(action.payload.error);
    } else if (isRejectedWithValue(action)) {
      console.warn(action.payload.data.message);
    }

    return next(action);
  };
