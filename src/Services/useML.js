import { useTranslation } from "react-i18next";

export function useML() {
  const { t, i18n } = useTranslation();

  function applyML(data) {
    if (!data) return "";
    const key = data.trim().replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    // const translated = i18n.exists(key) ? t(key) : data;
    // return translated.replace(/�/g, "");
    return key;
  }

  return applyML;
}
