"use client";

import { getSessionUser } from "@/actions/getSessionUser";
import { UserEntity } from "@repo/core";
import { isRedirectError } from "next/dist/client/components/redirect";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface SessionState {
  user: UserEntity | null;
  updateUser: () => Promise<void>;
  loading: boolean;
}

const SessionContext = createContext<SessionState | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const updateUser = useCallback(async () => {
    try {
      setLoading(true);

      const user = await getSessionUser();

      setUser(user);
    } catch (error) {
      if (isRedirectError(error)) throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  return (
    <SessionContext.Provider value={{ user, updateUser, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionState => {
  return useContext(SessionContext)!;
};
