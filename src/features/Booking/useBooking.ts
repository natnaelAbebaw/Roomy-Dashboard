import { Booking } from "./../../services/BookingApi";
import { useQuery } from "react-query";

import { useState } from "react";
import { LimitOptions } from "../../ui/Filters/PageLimit";
import { getBookings } from "../../services/BookingApi";
import { sortOptions } from "./BookingTable";
import { useAuth } from "../Authentication/AuthProvider";

export function useBooking() {
  const [simpleFilter, setSimpleFilter] = useState({
    label: "All",
    value: "",
  });

  const [sort, setSort] = useState<{ label: string; value: string | number }>(
    sortOptions[0]
  );
  const { hotel: authHotel } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const [pageLimit, setPageLimit] = useState<{
    label: string;
    value: string | number;
  }>(LimitOptions[0]);

  const { data: BookingData, isLoading: isBookingLoading } = useQuery<{
    bookings: Booking[];
    maxbookings: number;
  }>({
    queryKey: ["bookings", simpleFilter, sort, search, currentPage, pageLimit],
    queryFn: () =>
      getBookings(
        authHotel?.id as string,
        simpleFilter.value,
        sort.value,
        search,
        currentPage,
        pageLimit.value as number
      ),
  });

  return {
    BookingData,
    isBookingLoading,
    simpleFilter,
    setSimpleFilter,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    pageLimit,
    setPageLimit,
  };
}
