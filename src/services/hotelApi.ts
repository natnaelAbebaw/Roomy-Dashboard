import axios from "axios";
import { baseUrl } from "../constant";

type SearchParms = {
  [key: string]: string | number;
};

export interface Hotel {
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    zipcode: string;
    continent: string;
    coords: {
      lat: string;
      long: string;
    };
  };
  contacts: {
    email: string;
    phone: string;
    website: string;
  };
  currency: string;
  address: string;
  ratingAverage: number;
  regularPrice: number;
  countryISOCode: string;
  starRating: number;
  checkinTime: string;
  checkoutTime: string;
  discount: number;
  mainImage: string;
  albumImages: string[];
  facilities: string[];
  cabinTypes: string[];
  description: string;
  cancellationPolicy: string;
  cabinCount: number;
  priceRange: { min: number; max: number };
  additionalPolicies: string[];
  minBookingLength: number;
  maxBookingLength: number;
  popularfacilities: string[];
  breakFastPrice: number;
  hotelAccount: string;
  stripeAccountId: string;
  id: string;
}

export interface CabinStat {
  numCabins: number;
  numCabinsAvailable: number;
  maxCapacity: number;
  images: string[];
  regularPrice: number;
  discount: number;
  amenities: string[];
  cabinType: string;
  availableCabins: string[];
}

export async function searchHotels(
  searchParams: SearchParms,
  page = 1
): Promise<Hotel[]> {
  console.log(searchParams, "searchParams", page, "page");
  let query = "";
  console.log("ok", page);
  for (const key in searchParams) {
    query += `${key}=${searchParams[key]}&`;
  }
  query = query.slice(0, -1);
  query = query + `&page=${page}`;
  const url = `${baseUrl}/hotels/q?${query}`;
  const response = await axios.get(url);
  console.log(response.data.hotels, "hotels");
  return response.data.hotels;
}

export async function getHotels(page = 1): Promise<Hotel[]> {
  const url = `${baseUrl}/hotels?page=${page}`;
  const response = await axios.get(url);
  return response.data.resourses;
}

export type PriceRangeType = {
  priceRanges: {
    _id: number;
    count: number;
  }[];
  maxPrice: number;
  minPrice: number;
  maxCount: number;
};
export async function getHotelPriceRanges(
  cabinType: string
): Promise<PriceRangeType> {
  const query = cabinType !== "Any type" ? `cabinTypes=${cabinType}` : "";
  const url = `${baseUrl}/hotels/getHotelPriceRangeStats?${query}`;
  const response = await axios.get(url);
  return response.data.priceStats;
}

export type HotelStats = {
  totalHotels: number;
};

type HotelStatsQuery = {
  "cabinTypes[in]": string;
  "priceRange.min[gte]": number;
  "priceRange.max[lte]": number;
  "ratingAverage[gte]": number;
  "starRating[gte]": number;
  "maxBookingLength[gte]": number;
  "popularfacilities[all]": string;
  city?: string;
  state?: string;
  checkinDate?: string;
  checkoutDate?: string;
  numGuests?: string;
};

export async function getHotelStats(
  queries: HotelStatsQuery
): Promise<HotelStats> {
  let query = "";

  for (const key in queries) {
    if (
      queries[key as keyof HotelStatsQuery] &&
      queries[key as keyof HotelStatsQuery] !== "Any" &&
      queries[key as keyof HotelStatsQuery] !== "Any type" &&
      queries[key as keyof HotelStatsQuery] !== ""
    ) {
      query += `${key}=${queries[key as keyof HotelStatsQuery]}&`;
    }
  }

  const url = `${baseUrl}/hotels/hotelStats?${query}`;

  const response = await axios.get(url);

  return response.data.hotelStats;
}

export async function getHotel(hotelId: string): Promise<Hotel> {
  const url = `${baseUrl}/hotels/${hotelId}`;
  const response = await axios.get(url);
  return response.data.resourse;
}

export type HotelReviewStat = {
  _id?: string;
  rates: {
    "comfort and cleanliness": number;
    "facilities and aminities": number;
    "Overall Experience": number;
    "services and staff": number;
    location: number;
    "value for Money": number;
  };
  totalReviews?: number;
};

export async function gethotelReviewStat(
  hotelId: string
): Promise<HotelReviewStat> {
  const url = `${baseUrl}/hotels/${hotelId}/hotelReviews/hotelReviewStat`;
  const response = await axios.get(url);
  return response.data.hotelReview;
}

export async function getHotelRatingRanges(
  hotelId: string
): Promise<{ _id: number; count: number }[]> {
  const url = `${baseUrl}/hotels/${hotelId}/hotelReviews/hotelReviewRateRangeStat`;
  const response = await axios.get(url);
  return response.data.RateRanges;
}

export type hotelReview = {
  rates: {
    "comfort and cleanliness": number;
    "facilities and aminities": number;
    "Overall Experience": number;
    "services and staff": number;
    location: number;
    "value for Money": number;
  };
  review: string;
  hotel: string;
  id: string;
  guest: {
    address: {
      city: string;
      country: string;
    };
    fullName: string;
    userName: string;
    email: string;
    avatarUrl: string;
  };
  createdAt: string;
  averageRate: number;
};

export async function getHotelReview(
  hotelId: string,
  page: number,
  q?: string,
  sort?: string
): Promise<hotelReview[]> {
  let query = "";
  if (q) {
    query += `q=${q}&`;
  }
  if (page) {
    query += `page=${page}&`;
  }
  if (sort) {
    query += `sort=${sort}&`;
  }

  const url = `${baseUrl}/hotels/${hotelId}/hotelReviews?${query}&limit=6`;
  const response = await axios.get(url);
  return response.data.resourses;
}
