import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { deleteBooking } from "../../services/BookingApi";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: DeleteBooking, isLoading: isDeleteBookingLoading } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: () => {
        toast.success(`Booking deleted successfully`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
    });

  return { DeleteBooking, isDeleteBookingLoading };
}
