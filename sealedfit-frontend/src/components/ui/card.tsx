import React from "react";

export const Card = ({ children, className = "" }: any) => (
  <div className={`p-4 rounded shadow ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }: any) => (
  <div className={`mb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }: any) => (
  <h3 className={`font-bold text-lg ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className = "" }: any) => (
  <div className={`${className}`}>{children}</div>
);
