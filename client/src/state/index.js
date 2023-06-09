import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    mode: 'light',
    token: null,
    user: null,
    posts: []
}
export const auth_slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.token = null;
            state.user = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log('sorry, no user')
            }
        },
        setPosts: (state, action) => { 
            state.posts = action.payload.posts;
        },
        setPost : (state, action) => {
            const updatePost = state.posts.map(post =>{
                if(post._id === action.payload._id){
                    return action.payload;
                }
                return post;
            })
            state.posts = updatePost;
        },
        addNewPost : (state, action) => {
            state.posts = [action.payload.post , ...state.posts];
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost , addNewPost } = auth_slice.actions
export default auth_slice.reducer