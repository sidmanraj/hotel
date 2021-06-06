import { Dispatch } from "redux";
import { IHotelAction, IStatusizedHotels } from "../reducer/hotel";
import { Status } from "../models/Status";

export async function getHotelsAction(dispatch: Dispatch<IHotelAction>) {
    dispatch({type:"getHotels", payload: {hotels:[], status: Status.Loading}});
    const response = await fetch("/hotel.json");
    const hotels = await response.json();
    dispatch({type:"getHotels", payload: {hotels, status: Status.Success}});
}