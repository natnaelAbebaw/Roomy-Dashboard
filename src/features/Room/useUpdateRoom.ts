import toast from "react-hot-toast";
import { UpdateRoom } from "../../services/cabinApi";
import { useMutation, useQueryClient } from "react-query";

export function useUpdateRoom() {
  const queryClient = useQueryClient();
  const { mutate: updateRoom, isLoading: isUpdateRoomLoading } = useMutation({
    mutationFn: UpdateRoom,
    onSuccess: () => {
      console.log("Room updated successfully");
      toast.success("Room updated successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  return { updateRoom, isUpdateRoomLoading };
}
