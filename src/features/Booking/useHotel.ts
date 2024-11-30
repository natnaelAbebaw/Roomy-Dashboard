import { useQuery } from "react-query";

import { getHotel } from "../../services/hotelApi";
import { useAuth } from "../Authentication/AuthProvider";

export function useHotel() {
  const { hotel: authHotel } = useAuth();

  const { data: hotel, isLoading: isHotelLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getHotel(authHotel?.id as string),
    onSuccess: () => {
      // toast.success("Room deleted successfully");
      //
    },
  });

  return {
    hotel,
    isHotelLoading,
  };
}
