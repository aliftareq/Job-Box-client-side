import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../Firebase/firebase.config"

const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("auth/createUser", async (data) => {
    const Data = await createUserWithEmailAndPassword(auth, data.email, data.password)
    console.log(Data);
    return Data.user.email
})
export const signInUser = createAsyncThunk("auth/signInUser", async (data) => {
    const Data = await signInWithEmailAndPassword(auth, data.email, data.password)
    return Data.user.email
})
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
    const provider = new GoogleAuthProvider()
    const Data = await signInWithPopup(auth, provider)
    return Data.user.email
})



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = ""
        },
        setUser: (state, action) => {
            state.email = action.payload
            state.isLoading = false
        },
        toggleLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.error = ""
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = ""
                state.email = action.payload
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(signInUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.error = ""
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = ""
                state.email = action.payload
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.error = ""
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = ""
                state.email = action.payload
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = action.error.message
            })
    }
})


export const { logOut, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;