import axios from "axios";
import { baseUrl } from "../constant";
import {
  IFilter,
  operatorToSignMap,
  ViewTypeEnum,
} from "../ui/Filters/FilterConstants";
import { CabinStat } from "./hotelApi";

export interface Cabin {
  name?: string;
  cabinType?: string;
  mainImage?: string;
  albumImages?: string[];
  floor?: number;
  maxCapacity?: number;
  regularPrice?: number;
  discount?: number;
  amenities?: string[];
  bedConfigurations?: string[];
  description?: string;
  viewType?: ViewTypeEnum;
  hotel?: string;
  numBeds?: number;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export async function getCabin(id: string): Promise<Cabin> {
  const url = `${baseUrl}/cabins/${id}`;
  const response = await axios.get(url);
  return response.data.resourse;
}

export async function getCabins(
  hotelId: string,
  checkoutDate?: moment.Moment | null,
  checkinDate?: moment.Moment | null,
  numOfGuests?: number
): Promise<CabinStat[]> {
  console.log("hotelId", hotelId, checkoutDate, checkinDate);
  const query =
    checkoutDate && checkinDate && numOfGuests
      ? `checkinDate=${checkinDate.format(
          "YYYY-MM-DD"
        )}&checkoutDate=${checkoutDate.format(
          "YYYY-MM-DD"
        )}&numGuests=${numOfGuests}`
      : "";
  const url = `${baseUrl}/hotels/cabinStats/${hotelId}?${query}`;

  const response = await axios.get(url);

  return response.data.cabins;
}

export async function getRooms(
  hotelId: string,
  filters?: IFilter[],
  simpleFilter?: string,
  sort?: string | number,
  search?: string,
  currentPage?: number,
  pageLimit?: number
) {
  const modifiedSimpleFilter = filters?.some(
    (filter) => filter.field.name == "discount"
  )
    ? ""
    : simpleFilter;
  const query = filters
    ?.map(
      (filter) =>
        `${filter.field.name}${
          operatorToSignMap[filter.operator]
            ? `[${operatorToSignMap[filter.operator]}]`
            : ""
        }=${filter.value}`
    )
    .join("&");

  const url = `${baseUrl}/hotels/${hotelId}/cabins?${query}${
    modifiedSimpleFilter ? `&${modifiedSimpleFilter}` : ""
  }${sort ? `&${sort}` : ""}${search ? `&q=${search}` : ""}${
    currentPage ? `&page=${currentPage}` : ""
  }${`&limit=${pageLimit}`}
  `;

  const response = await axios.get(url);

  return {
    rooms: response.data.resourses as Cabin[],
    maxRooms: +response.data.totalItems as number,
  };
}

export async function CreateRoom({
  hotelId,
  cabin,
}: {
  hotelId: string;
  cabin: FormData;
}) {
  const url = `${baseUrl}/hotels/${hotelId}/cabins`;

  const response = await axios.post(url, cabin, {
    headers: {
      "Content-Type": "multipart/form-data", // Set proper header for file uploads
    },
  });

  return response.data.resourse;
}

export async function UpdateRoom({
  hotelId,
  cabinId,
  cabin,
}: {
  hotelId: string;
  cabinId: string;
  cabin: FormData;
}) {
  const url = `${baseUrl}/hotels/${hotelId}/cabins/${cabinId}`;

  const response = await axios.patch(url, cabin, {
    headers: {
      "Content-Type": "multipart/form-data", // Set proper header for file uploads
    },
  });

  return response.data.resourse;
}

export async function DeleteRoom({
  hotelId,
  cabinId,
}: {
  hotelId: string;
  cabinId: string;
}) {
  const url = `${baseUrl}/hotels/${hotelId}/cabins/${cabinId}`;

  const response = await axios.delete(url);

  return response.data.resourse;
}
