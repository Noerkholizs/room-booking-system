// hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/api";
import { User } from "../server/types";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery<User, Error>({
    queryKey: ["current-user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return query;
};
