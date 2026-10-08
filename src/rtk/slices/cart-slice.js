import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice ({
    name : "cartSlice",
    initialState:[],
    reducers:{
        addToCart:(state, action)=>{
            const findBook = state.find((book)=> book.id === action.payload.id);
            if (findBook){
                findBook.quantity += 1;
            }else{
                const bookClone = {...action.payload,quantity:1}
                state.push(bookClone)
            }
        },
        increaseQuantity:(state, action)=>{
            const book = state.find((book)=> book.id ===action.payload.id)

            if(book){
                book.quantity += 1;
            }
        },
        decreaseQuantity:(state, action)=>{
            const book = state.find((book)=> book.id ===action.payload.id)

            if(book && book.quantity >1){
                book.quantity -= 1;
            }
        },
        deleteFromCart:(state, action)=>{
            return state.filter((book)=> book.id !== action.payload.id )
        },
        Cleare:(state, action)=>{
            return []
        }

    }
})

export const {addToCart,deleteFromCart,Cleare,increaseQuantity,decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;