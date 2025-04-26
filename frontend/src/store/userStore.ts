import { User } from "@/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) =>
        set({
          user,
        }),
    }),
    {
      name: "user-store",
    }
  )
);
