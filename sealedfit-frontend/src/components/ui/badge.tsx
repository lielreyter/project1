import React from "react";

export const Badge = ({ children, className = "" }: any) => (
  <span className={`px-2 py-1 rounded-full text-sm ${className}`}>{children}</span>
);
