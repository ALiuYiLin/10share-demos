import { useTranslation } from "react-i18next";

const I18n = () => {
  const { t, i18n } = useTranslation("common");
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // 切换语言
  };
  return (
    <div>
      <h1>国际化测试</h1>
      <p>{t("welcome")}</p>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("zh")}>中文</button>
    </div>
  );
};
export default I18n;
