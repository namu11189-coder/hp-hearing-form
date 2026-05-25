const SPREADSHEET_ID = "1QUkQr0HTutettonsy0A2zra0JEp_wttndz2A9iSFR7U";
const SHEET_NAME = "responses";

const HEADERS = [
  "送信日時",
  "UUID",
  "更新日時",
  "送信ステータス",
  "会社名",
  "担当者名",
  "メールアドレス",
  "電話番号",
  "制作目的",
  "希望公開時期",
  "予算状況",
  "管理ステータス",
  "最終確認日",
  "担当者メモ",
  "回答JSON"
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const sheet = getSheet();
    const submittedAt = formatDateTime(body.submittedAt || new Date());
    const updatedAt = formatDateTime(body.updatedAt || "");
    sheet.appendRow([
      submittedAt,
      body.uuid || "",
      updatedAt,
      body.submitStatus || "submitted",
      body.companyName || "",
      body.contactName || "",
      body.email || "",
      body.phone || "",
      body.purpose || "",
      body.desiredLaunch || "",
      body.budgetStatus || "",
      body.managementStatus || "unreviewed",
      "",
      "",
      JSON.stringify(body.answerJson || {})
    ]);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: "save_failed" });
  }
}

function formatDateTime(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return String(value);
  return Utilities.formatDate(date, "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
}

function doGet() {
  return jsonResponse({ ok: true, message: "homepage_hearing_form_endpoint" });
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
