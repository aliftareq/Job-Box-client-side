import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apislice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_DEV_URL }),
    endpoints: (builder) => ({})
})

export default apislice;