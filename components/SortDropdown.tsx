// app/components/SortDropdown.tsx
"use client";

import { useState } from "react";

const options = ["추천", "팔로잉", "좋아요"];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="border rounded px-3 py-1 text-sm font-medium"
      >
        {value} ⌄
      </button>

      {open && (
        <div className="absolute mt-1 w-32 bg-white shadow-lg border rounded z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1 hover:bg-gray-100 text-sm ${
                value === option ? "font-semibold" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
