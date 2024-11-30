import axios from "axios";
import { baseUrl } from "../constant";
import { Hotel } from "./hotelApi";

export interface HotelAccount {
  _id: string;
  userName: string;
  email: string;
  createdAt: string;
}

export type JwtToken = string;

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<{ hotelAccount: HotelAccount; token: JwtToken; hotel: Hotel }> {
  // hotelAccounts/login
  const url = `${baseUrl}/hotelAccounts/login`;
  console.log(credentials);
  const response = await axios.post(url, credentials);
  return {
    hotelAccount: response.data.user,
    token: response.data.token,
    hotel: response.data.hotel[0],
  };
}
