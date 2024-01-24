import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from './Api'
export const saveSegmentsToServer=createAsyncThunk('saveSegmentToServer',async (data)=>{
    try{
     const response=await api.saveSegments(data)
     console.log(response)
    }
    catch(e){
        return new Error(e)
    }

})
const initialState={
    loading:false
}
const SegmentSlicer=createSlice({
    name:"SegmentSlicer",
    initialState,
    extraReducers:(builder)=>{
      builder.addCase(saveSegmentsToServer.pending,(state,action)=>{
        state.loading=true
       
      })
      builder.addCase(saveSegmentsToServer.fulfilled,(state,action)=>{
       
      })
      builder.addCase(saveSegmentsToServer.rejected,(state,action)=>{
       
      })
    }
})
export default SegmentSlicer.reducer