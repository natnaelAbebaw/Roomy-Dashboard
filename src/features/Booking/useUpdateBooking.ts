import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { updateBooking } from "../../services/BookingApi";

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const { mutate: UpdateBooking, isLoading: isUpdateBookingLoading } =
    useMutation({
      mutationFn: updateBooking,
      onSuccess: (data) => {
        toast.success(`booking #${data._id} updated successfully`);
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
        queryClient.invalidateQueries({
          queryKey: ["todaysBookings"],
        });
      },
    });

  return { UpdateBooking, isUpdateBookingLoading };
}
