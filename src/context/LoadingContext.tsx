import { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}


const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}


export function useLoading() {
  return useContext(LoadingContext);
}
