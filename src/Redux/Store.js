import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SegmentSlicer from "./SegmentSlicer";
const reducers=combineReducers({
    SegmentSlicer:SegmentSlicer
})
export const Store=configureStore({
 reducer:reducers,
})