import type { ReactNode } from "react";

interface LoadingProps {
  children: ReactNode
}

export default function Loading ({ children }: LoadingProps) {
  return (
    <div className="absolute inset-0 flex justify-center items-center font-normal">
      {children}
    </div>
  );
}
