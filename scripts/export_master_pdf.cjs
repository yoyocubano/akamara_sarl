
const fs = require('fs');
const https = require('https');
const { jsPDF } = require('jspdf');
const { CATALOG_DATA } = require('../src/data/catalog_master_temp.cjs');

async function getImageBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status: ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        const mimeType = res.headers['content-type'] || 'image/jpeg';
        const format = mimeType.includes('png') ? 'PNG' : 'JPEG';
        resolve({
          base64: `data:${mimeType};base64,${buffer.toString('base64')}`,
          format: format
        });
      });
    }).on('error', (err) => reject(err));
  });
}

async function generatePDF() {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // --- COVER ---
  doc.setFillColor(15, 23, 42); 
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Decorative lines
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.line(margin, 20, pageWidth - margin, 20);
  doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(54);
  doc.text('AKAMARA', pageWidth / 2, 100, { align: 'center' });
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('CATÁLOGO MAESTRO 2026', pageWidth / 2, 120, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(148, 163, 184);
  doc.text('Mobiliario de Diseño, Construcción y Logística', pageWidth / 2, 135, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('REBRANDING DUJO PORTFOLIO', pageWidth / 2, pageHeight - 40, { align: 'center' });

  // --- ITEMS ---
  doc.addPage();
  let y = 30;

  for (const [index, item] of CATALOG_DATA.entries()) {
    // Check if we need a new page
    if (y > pageHeight - 100) {
      doc.addPage();
      y = 30;
    }

    const startY = y;

    // Item Title
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`${index + 1}. ${item.name_es.toUpperCase()}`, margin, y);
    y += 10;

    // Image integration
    try {
      console.log(`Cargando imagen para: ${item.name_es}...`);
      const imgData = await getImageBase64(item.image);
      const imgWidth = 70;
      const imgHeight = 50;
      doc.addImage(imgData.base64, imgData.format, margin, y, imgWidth, imgHeight, undefined, 'FAST');
      
      // Text next to image
      const textX = margin + imgWidth + 10;
      let textLineY = y + 5;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const splitDesc = doc.splitTextToSize(item.description_es, pageWidth - textX - margin);
      doc.text(splitDesc, textX, textLineY);
      textLineY += (splitDesc.length * 6) + 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('ESPECIFICACIONES:', textX, textLineY);
      textLineY += 6;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      item.details_es.forEach(detail => {
        const splitDetail = doc.splitTextToSize(`• ${detail}`, pageWidth - textX - margin - 5);
        doc.text(splitDetail, textX + 2, textLineY);
        textLineY += (splitDetail.length * 5);
      });

      y = Math.max(y + imgHeight + 15, textLineY + 10);
    } catch (error) {
      console.error(`Error con imagen de ${item.name_es}:`, error.message);
      // Fallback if image fails
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      const splitDesc = doc.splitTextToSize(item.description_es, pageWidth - (margin * 2));
      doc.text(splitDesc, margin, y);
      y += (splitDesc.length * 5) + 5;
      y += 15;
    }

    // Divider line
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y - 5, pageWidth - margin, y - 5);
    y += 10;
  }

  const pdfBinary = doc.output();
  fs.writeFileSync('AKAMARA_CATALOG_MASTER_IMG.pdf', pdfBinary, 'binary');
  console.log('PDF Generado con imágenes: AKAMARA_CATALOG_MASTER_IMG.pdf');
}

generatePDF().catch(console.error);
