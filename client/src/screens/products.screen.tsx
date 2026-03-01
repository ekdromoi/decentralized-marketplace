import { useTranslation } from "react-i18next";
import { CategorySelector } from "@/components/ui-components";

export const ProductsScreen = () => {
  const { t } = useTranslation();

  return (
    <div>
      <CategorySelector />
      <h1 className="text-2xl font-bold">{t("PRODUCTS.TITLE")}</h1>
    </div>
  );
};
