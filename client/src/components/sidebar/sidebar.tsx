import { Home, Languages, Moon, Package, Settings, ShoppingCart, Sun, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/theme";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const mainNav = [
  { key: "NAV.HOME", icon: Home, href: "/" },
  { key: "NAV.PRODUCTS", icon: Package, href: "/products" },
  { key: "NAV.ORDERS", icon: ShoppingCart, href: "/orders" },
  { key: "NAV.CUSTOMERS", icon: Users, href: "/customers" },
];

const secondaryNav = [
  { key: "NAV.SETTINGS", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <SidebarPrimitive collapsible="icon" side={i18n.language === "ar" ? "right" : "left"}>
      <SidebarHeader className="h-[56px]">
        <span className="text-lg font-semibold px-2">{t("APP.NAME")}</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("NAV.NAVIGATION")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{t(item.key)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("NAV.GENERAL")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{t(item.key)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleTheme}>
              {theme === "dark" ? <Sun /> : <Moon />}
              <span>{theme === "dark" ? t("THEME.LIGHT") : t("THEME.DARK")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleLanguage}>
              <Languages />
              <span>{t("LANGUAGE.TOGGLE")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};
