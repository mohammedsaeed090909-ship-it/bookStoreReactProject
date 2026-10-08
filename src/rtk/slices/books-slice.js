import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks",
    async()=>{
        const res = await fetch("http://localhost:9000/books");
        const data = await res.json();
        return data;
    }
)
export const bookSlice = createSlice({
    name:"book",
    initialState: {
        books: [],
        search: "",
        loading: false,
        error: null
    },
    reducers:{
        setSearch:(state, action)=>{
            state.search = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBooks.fulfilled,(state, action)=>{
            state.books = action.payload
            state.loading = false;
        });
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { setSearch } = bookSlice.actions;
export default bookSlice.reducer;