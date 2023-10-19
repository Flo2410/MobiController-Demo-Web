import React, { FC } from "react";

export const Card: FC<{ title: string; data: string }> = ({ title, data }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 text-xl border border-gray-400 rounded-sm shadow-sm">
      <h2 className="font-bold">{title}</h2>
      <span>{data}</span>
    </div>
  );
};
