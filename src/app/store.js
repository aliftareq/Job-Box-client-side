import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import authslice from "../Features/auth/authslice";
import apislice from "../Features/api/apiSlice";

const store = configureStore({
    reducer: {
        [apislice.reducerPath]: apislice.reducer,
        auth: authslice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apislice.middleware)
})


export default store;