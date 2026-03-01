import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Car,
  Gem,
  Grid2x2,
  Landmark,
  LayoutGrid,
  Palette,
  Package,
  Watch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const CATEGORIES: { key: string; value: string; icon: LucideIcon }[] = [
  { key: "CATEGORY.ALL", value: "all", icon: LayoutGrid },
  { key: "CATEGORY.LUXURY_WATCHES", value: "luxury_watches", icon: Watch },
  { key: "CATEGORY.FINE_JEWELLERY", value: "fine_jewellery", icon: Gem },
  { key: "CATEGORY.FINE_ART", value: "fine_art", icon: Palette },
  { key: "CATEGORY.AUTOMOTIVE", value: "automotive", icon: Car },
  { key: "CATEGORY.COLLECTIBLES", value: "collectibles", icon: Grid2x2 },
  { key: "CATEGORY.ANTIQUES", value: "antiques", icon: Landmark },
  { key: "CATEGORY.OTHER", value: "other", icon: Package },
];

export const CategorySelector = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("all");

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 bg-gray-100/5 border-[1px] border-gray-100/5 rounded-md px-2">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          onClick={() => setSelected(category.value)}
          className={cn(
            "flex items-center gap-1.5 whitespace-nowrap rounded-md border px-3 py-1.5 text-sm transition-colors cursor-pointer",
            selected === category.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:bg-accent"
          )}
        >
          <category.icon className="size-4" />
          {t(category.key)}
        </button>
      ))}
    </div>
  );
};
