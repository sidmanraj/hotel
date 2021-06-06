import { Status } from "../models/Status";

export interface IRestaurant {
  name: string;
  cuisines: string;
  featured_image: string;
  id: string;
}

export interface IRoot {
  restaurant: IRestaurant;
}

export interface IStatusizedHotels {
    status: Status;
    hotels: IRoot[];
}

export interface IHotelAction {
  payload: IStatusizedHotels;
  type: string;
}

export const HotelReducer = (
  _state: IStatusizedHotels,
  action: IHotelAction
): IStatusizedHotels => {
  switch (action.type) {
    case "getHotels":
      return action.payload;
  }
  return emptyState();
};

function emptyState(): IStatusizedHotels {
    return {
        status: Status.NonStarted,
        hotels: []
    }
}
