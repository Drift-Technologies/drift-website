import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// These would come from your environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!;

export async function addEmailToSheet(email: string) {
  try {
    const jwt = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Email: email,
      Timestamp: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    throw error;
  }
}