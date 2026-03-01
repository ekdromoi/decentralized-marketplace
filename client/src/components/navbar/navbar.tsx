import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { LocationSelector } from "../atoms";

export const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b px-4 py-2 bg-background">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator orientation="vertical" className="mr-2 !h-4" />
      <LocationSelector />
      {children}
    </header>
  );
};
