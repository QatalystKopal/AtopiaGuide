/**
 * In Our Skin — RSVP receiver for Google Sheets.
 *
 * Setup: open your Google Sheet → Extensions → Apps Script, replace the
 * contents of Code.gs with this file, then Deploy → New deployment →
 * Web app (Execute as: Me, Who has access: Anyone). Paste the Web app URL
 * into SHEET_ENDPOINT in index.html.
 */
const SHEET_NAME = 'Registrations';
const HEADERS = ['Timestamp', 'Email', 'Attending as', 'Page'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Hidden "website" field: real people leave it empty, bots fill it in.
  if (p.website) return json_({ ok: true });

  const email = String(p.email || '').trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json_({ ok: false, error: 'invalid_email' });
  }
  const role = p.role === 'yes' ? 'Caregiver' : 'Youth';
  const page = String(p.page || '').slice(0, 200);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_().appendRow([new Date(), safe_(email), role, safe_(page)]);
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stop values like "=HYPERLINK(...)" from being treated as formulas.
function safe_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
