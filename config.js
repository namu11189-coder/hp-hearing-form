window.HOMEPAGE_HEARING_FORM_CONFIG = {
  // Google Apps Script のウェブアプリURLを設定してください。
  // 未設定のままでも画面確認はできますが、送信時はエラー表示になります。
  GAS_ENDPOINT_URL: "https://script.google.com/macros/s/AKfycbwjvp-Xt_v1iVMV1EtONzV9Lm9q9aawWW_W-xp373vw1jA_HI4EBBgfP-ZXshDs6emE/exec",

  // スパム対策トークン。GAS側でこの値と照合してください。
  // 例: if (payload._token !== "ここと同じ値") return; で弾く
  SUBMIT_TOKEN: "hpform-2026-secure-token"
};
