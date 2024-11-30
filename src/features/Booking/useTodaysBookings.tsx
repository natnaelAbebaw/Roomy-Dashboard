import { useAuth } from "../Authentication/AuthProvider";
import { Booking, getTodayActivityBookings } from "./../../services/BookingApi";
import { useQuery } from "react-query";

export function useTodaysBooking() {
  const { hotel: authHotel } = useAuth();
  const { data: BookingData, isLoading: isBookingLoading } = useQuery<
    Booking[]
  >({
    queryKey: ["todaysBookings"],
    queryFn: () => getTodayActivityBookings(authHotel?.id as string),
  });

  return {
    BookingData,
    isBookingLoading,
  };
}
