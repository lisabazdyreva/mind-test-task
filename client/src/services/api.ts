import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Products", "Cart"],
  endpoints: () => ({}),
});
