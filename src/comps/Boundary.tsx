import { Spinner } from "@nextui-org/react";
import React from "react";

export default function Boundary({ children }: { children: React.ReactNode }) {
  return <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>;
}
