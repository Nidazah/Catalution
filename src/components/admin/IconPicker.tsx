"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SERVICE_ICONS, getServiceIcon } from "@/lib/service-icons";

interface IconPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function IconPicker({ label = "Icon", value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const Selected = getServiceIcon(value);
  const selectedOption = SERVICE_ICONS.find((opt) => opt.value === value.toLowerCase().trim());

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative grid gap-1">
      <span className="text-[10.5px] font-semibold text-[#24133f]">{label}</span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-2 rounded-lg border border-[#ddd6eb] bg-white px-2.5 py-2 text-left text-[11.5px] outline-none transition-colors hover:border-[#8b5cf6] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#481d96] to-[#ff6800] text-white">
            <Selected size={13} />
          </span>
          <span className="truncate text-[#24133f]">
            {selectedOption?.label || "Choose an icon"}
          </span>
        </span>
        <ChevronDown size={13} className={`shrink-0 text-[#7b8190] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1.5 grid w-full grid-cols-5 gap-1.5 rounded-xl border border-[#ece6f7] bg-white p-2.5 shadow-lg">
          {SERVICE_ICONS.map(({ value: optValue, label: optLabel, Icon }) => {
            const isSelected = optValue === value.toLowerCase().trim();
            return (
              <button
                key={optValue}
                type="button"
                title={optLabel}
                onClick={() => {
                  onChange(optValue);
                  setOpen(false);
                }}
                className={`flex flex-col items-center gap-1 rounded-lg p-1.5 transition-colors ${
                  isSelected
                    ? "bg-gradient-to-br from-[#481d96] to-[#ff6800] text-white"
                    : "text-[#481d96] hover:bg-[#f0eafa]"
                }`}
              >
                <Icon size={15} />
                <span className="w-full truncate text-center text-[8px] font-medium leading-tight">
                  {optLabel}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
