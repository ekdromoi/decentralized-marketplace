import { useTranslation } from "react-i18next";

export const ProductsScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("PRODUCTS.TITLE")}</h1>
    </div>
  );
};
