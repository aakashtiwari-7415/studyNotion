
// import { createSlice } from "@reduxjs/toolkit"
// const initialState = {
//     singupData:null,
//     loading:false,
//     token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
// }
 
// const authSlice = createSlice({
//     name:"auth",
//     initialState : initialState,
//     reducers: {
//         setSignupData(state,value){
//             state.singupData = value.payload;
//         },
//         setLoading(state,value){
//             state.loading = value.payload;
//         },
//         setToken(state,value) {
//             state.token = value.payload;
//         },
//     },
// });

// export const {setToken  ,setLoading ,setSignupData} = authSlice.actions;
// export default authSlice.reducer; 




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singupData: null,
    loading: false,
    token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.singupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
