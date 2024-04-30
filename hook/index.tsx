import { useState, useEffect } from "react";
import i18n from "i18next";

const useLanguage = () => {
  const [language, setLanguage] = useState<string>(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  useEffect(() => {
    const updateLanguage = () => setLanguage(i18n.language);
    i18n.on("languageChanged", updateLanguage);

    return () => {
      i18n.off("languageChanged", updateLanguage);
    };
  }, []);

  return { language, changeLanguage };
};

export default useLanguage;
