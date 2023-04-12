import apislice from "../api/apiSlice";

const authApi = apislice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                url: "/user"
            })
        })
    })
})

export const { useRegisterMutation } = authApi