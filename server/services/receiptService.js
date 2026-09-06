import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { Receipt } from '../models/index.js';

export async function createDonationReceipt(donation) {
  const directory = path.resolve(process.env.GENERATED_DIR || 'server/generated');
  fs.mkdirSync(directory, { recursive: true });
  const fileName = `Saileela_Seva_Receipt_${donation.receiptNumber}.pdf`;
  const filePath = path.join(directory, fileName);
  await new Promise((resolve, reject) => { const pdf = new PDFDocument({ margin: 50 }); const stream = fs.createWriteStream(filePath); stream.on('finish', resolve); stream.on('error', reject); pdf.pipe(stream); pdf.fillColor('#8f2d25').fontSize(20).text('SAILEELA MANDAL PALKHI'); pdf.moveDown().fillColor('#3c1f1b').fontSize(15).text('Saileela Seva Contribution Acknowledgement'); pdf.moveDown(2).fontSize(11).text(`Receipt: ${donation.receiptNumber}`).text(`Donor: ${donation.donorName}`).text(`Mobile: ${donation.phone}`).text(`Amount: INR ${donation.amount.toFixed(2)}`).text(`Category: ${donation.category}`).text(`Status: ${donation.status}`); pdf.moveDown(3).fontSize(9).fillColor('#765f55').text('Official tax and organization details are shown only when verified by the mandal.'); pdf.end(); });
  await Receipt.create({ receiptNumber: donation.receiptNumber, donation: donation._id, fileName });
  return { fileName, filePath };
}
