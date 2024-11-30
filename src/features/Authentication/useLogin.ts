import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { login } from "../../services/AuthApi";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: Login, isLoading: isLoginLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("Login successfully");
      toast.success("Login successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log("Login error", error);
      toast.error("Incorect email or password");
    },
  });

  return { Login, isLoginLoading };
}
