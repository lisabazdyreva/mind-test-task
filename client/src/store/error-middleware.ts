import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn(action.payload.data.message);

      // toast.warn({ title: "Async error!", message: action.error.data.message });
    }

    return next(action);
  };
