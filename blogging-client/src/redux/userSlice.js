import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    
    initialState:{
      currentuser:null,
    
      
      userLikes:[]
    },
    reducers:{
        setUser:(state,action)=>{
           state.currentuser=action.payload
        },
        setLikes:(state,action)=>{
           state.userLikes=action.payload
        },
        addItem: (state, action) => {
            if(state.userLikes.includes(action.payload)===false){
                state.userLikes.push(action.payload);
            }
           
        },
        removeItem: (state, action) => {
            
            state.userLikes = state.userLikes.filter(item => item !== action.payload);
        },
       
        
    }
});

export const {setUser,setAllLikes,addItem,removeItem,setLikes}=userSlice.actions