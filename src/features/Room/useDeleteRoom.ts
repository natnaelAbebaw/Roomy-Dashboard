import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { DeleteRoom } from "../../services/cabinApi";

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  const { mutate: DeleteRooms, isLoading: isDeleteRoomLoading } = useMutation({
    mutationFn: DeleteRoom,
    onSuccess: () => {
      toast.success("Room deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  return {
    DeleteRooms,
    isDeleteRoomLoading,
  };
}
