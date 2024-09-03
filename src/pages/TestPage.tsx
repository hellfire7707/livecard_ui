import React from "react";
import { Button } from "src/components/shadcn/ui/button";
import { useAlertStore } from "src/stores/useAlertStore";
import { useConfirmStore } from "src/stores/useConfirmStore";
import { useTranslation, Trans } from "react-i18next";

type Language = {
  nativeName: string;
};

type Languages = {
  [key: string]: Language;
};

const lngs: Languages = {
  // 2. 언어 구분을 위한 lng 객체 생성
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
  ko: { nativeName: "Korean" },
};

export default function Test() {
  const { showAlert, showAlertSync } = useAlertStore();
  const { showConfirm, showConfirmSync } = useConfirmStore();

  const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언

  return (
    <div>
      <ul>
        <li>
          <Button
            variant="outline"
            onClick={() => {
              showAlert(
                "성공",
                "작업이 성공적으로 완료되었습니다.",
                () => alert("확인"),
                () => alert("취소")
              );
            }}
          >
            alert
          </Button>

          <Button
            variant="outline"
            onClick={async () => {
              const isOkClicked = await showAlertSync(
                "성공",
                "작업이 성공적으로 완료되었습니다."
              );

              alert(isOkClicked ? "확인클릭" : "취소클릭");
            }}
          >
            alertSync(동기)
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              showConfirm("성공", "작업이 성공적으로 완료되었습니다.", () =>
                alert("확인")
              );
            }}
          >
            confirm
          </Button>

          <Button
            variant="outline"
            onClick={async () => {
              await showConfirmSync(
                "성공",
                "작업이 성공적으로 완료되었습니다."
              );
              alert("확인");
            }}
          >
            confirmSync(동기)
          </Button>
        </li>
      </ul>

      <div>
        다국어 테스트
        <div>
          {Object.keys(lngs).map((lng) => (
            <Button
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </Button>
          ))}
          <p>
            <Trans i18nKey="description.part1">
              <code>src/App.js</code> and save to reload.
            </Trans>
          </p>
          <p>{t("description.part2")}</p>
          <p>{t("counter_one")}</p>
        </div>
      </div>
    </div>
  );
}
