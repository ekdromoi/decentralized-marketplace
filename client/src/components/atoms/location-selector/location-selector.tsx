import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCATIONS = [
  { key: "LOCATION.RIYADH", value: "riyadh" },
  { key: "LOCATION.JEDDAH", value: "jeddah" },
  { key: "LOCATION.DAMMAM", value: "dammam" },
  { key: "LOCATION.MECCA", value: "mecca" },
  { key: "LOCATION.MEDINA", value: "medina" },
];

export const LocationSelector = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(LOCATIONS[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md px-3 py-1 text-sm hover:bg-accent outline-none cursor-pointer border-[1px] py-3 w-[120px]">
        <div className="flex items-center justify-between w-full">
        <span>{t(selected.key)}</span>
        <ChevronDown className="size-4 opacity-50" />
        </div>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="p-4">

   
    <div>
      <div className="flex items-center gap-2 mb-2">
      <MapPin className="size-4" />
      <p className="text-sm font-medium">{t("POPULAR_LOCATIONS")}</p>

      </div>
    {LOCATIONS.map((location) => (
          <DropdownMenuItem
            key={location.value}
            onClick={() => setSelected(location)}
            className="cursor-pointer"
          >
            <span>{t(location.key)}</span>
          </DropdownMenuItem>
        ))}
    </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
