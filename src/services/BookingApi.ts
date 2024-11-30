import axios from "axios";
import { baseUrl } from "../constant";

export enum BookingStatus {
  CHECKIN = "checkedin",
  CHECKEDOUT = "checkedout",
  UNCONFIRMED = "unconfirmed",
}
export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
}

export interface Booking {
  _id: string;
  guest: { _id: string; fullName: string; email: string; nationalID: string };
  cabin: { _id: string; name: string };
  hotel: string;
  checkInDate: string;
  checkOutDate: string;
  numNights: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  paymentStatus: PaymentStatus;
  createdAt: string;
  status: BookingStatus;
}

export async function getBookings(
  hotelId: string,
  simpleFilter?: string,
  sort?: string | number,
  search?: string,
  currentPage?: number,
  pageLimit?: number
) {
  const url = `${baseUrl}/hotels/${hotelId}/bookings${
    search ? `/q/${search}` : ""
  }?${simpleFilter ? `&${simpleFilter}` : ""}${sort ? `&${sort}` : ""}${
    currentPage ? `&page=${currentPage}` : ""
  }${`&limit=${pageLimit}`}
  `;

  const response = await axios.get(url);

  return {
    bookings: response.data.resourses as Booking[],
    maxbookings: +response.data.totalItems as number,
  };
}

export async function getBooking(hotelId: string, bookingId: string) {
  const url = `${baseUrl}/hotels/${hotelId}/bookings/${bookingId}`;
  const response = await axios.get(url);
  return response.data.resourse;
}

export async function updateBooking({
  hotelId,
  bookingId,
  updatedData,
}: {
  hotelId: string;
  bookingId: string;
  updatedData: Partial<Booking>;
}) {
  const url = `${baseUrl}/hotels/${hotelId}/bookings/${bookingId}`;
  const response = await axios.patch(url, updatedData);

  return response.data.resourse;
}

export async function deleteBooking({
  hotelId,
  bookingId,
}: {
  hotelId: string;
  bookingId: string;
}) {
  const url = `${baseUrl}/hotels/${hotelId}/bookings/${bookingId}`;
  const response = await axios.delete(url);

  return response.data.resourse;
}

export async function getBookingWithGivenDate(hotelId: string, date: string) {
  const url = `${baseUrl}/hotels/${hotelId}/bookings?createdAt[gte]=${date}&limit=0&fields=totalPrice,status,paymentStatus,createdAt,extrasPrice,checkInDate,checkOutDate`;
  const response = await axios.get(url);
  return response.data.resourses as Booking[];
}

export async function getTodayActivityBookings(hotelId: string) {
  const url = `${baseUrl}/hotels/${hotelId}/bookings/todaysActivityBookings`;
  const response = await axios.get(url);

  return response.data.todaysBookings as Booking[];
}

