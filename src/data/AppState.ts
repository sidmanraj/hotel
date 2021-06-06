import { combineReducers } from "redux";
import { HotelReducer } from "../reducer/hotel";
 
export const rootReducer = combineReducers({
    hotels: HotelReducer
});
 
export type AppState = ReturnType<typeof rootReducer>;