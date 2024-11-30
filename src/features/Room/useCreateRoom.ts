import { useMutation, useQueryClient } from "react-query";
import { CreateRoom } from "../../services/cabinApi";
import toast from "react-hot-toast";

export function useCreateRoom() {
  const queryClient = useQueryClient();
  const { mutate: createRoom, isLoading: isCreateRoomLoading } = useMutation({
    mutationFn: CreateRoom,
    onSuccess: () => {
      console.log("Room created successfully");
      toast.success("Room created successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  return { createRoom, isCreateRoomLoading };
}
