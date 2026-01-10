
const fs = require('fs');
const { CATALOG_DATA } = require('../src/data/catalog_master_temp.cjs');

function generateWordHTML() {
  const date = new Date().getFullYear();
  
  let html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Catálogo Maestro Akamara ${date}</title>
      <style>
        @page Section1 {
          size: 21cm 29.7cm;
          margin: 2cm 2cm 2cm 2cm;
          mso-page-orientation: portrait;
        }
        div.Section1 { page: Section1; }
        body { font-family: 'Arial', sans-serif; color: #0f172a; line-height: 1.5; }
        h1 { color: #f59e0b; font-size: 32pt; text-align: center; margin-top: 100pt; }
        h2 { color: #1e293b; font-size: 24pt; text-align: center; margin-bottom: 20pt; }
        h3 { color: #0f172a; font-size: 18pt; border-bottom: 2px solid #f59e0b; padding-bottom: 5pt; margin-top: 30pt; }
        .category-header { background-color: #f8fafc; padding: 10pt; font-weight: bold; color: #1e293b; margin-top: 40pt; text-transform: uppercase; font-size: 14pt; }
        .product-card { margin-bottom: 30pt; page-break-inside: avoid; }
        .product-name { font-weight: bold; font-size: 16pt; color: #0f172a; margin-bottom: 5pt; }
        .product-type { color: #f59e0b; font-size: 10pt; font-weight: bold; margin-bottom: 10pt; }
        .product-desc { color: #475569; margin-bottom: 10pt; }
        .specs-title { font-weight: bold; font-size: 11pt; color: #0f172a; margin-top: 10pt; }
        ul { color: #64748b; margin-top: 5pt; }
        li { margin-bottom: 3pt; }
        .footer { text-align: center; font-size: 9pt; color: #94a6b8; margin-top: 50pt; }
      </style>
    </head>
    <body>
      <div class="Section1">
        <!-- PORTADA -->
        <h1 style="margin-top: 200pt;">AKAMARA</h1>
        <h2 style="font-size: 20pt;">CATÁLOGO MAESTRO ${date}</h2>
        <p style="text-align: center; color: #64748b;">Mobiliario de Diseño, Construcción y Logística</p>
        <p style="text-align: center; margin-top: 300pt; font-size: 10pt;">DOCUMENTO EDITABLE CORPORATIVO</p>
        
        <br clear=all style='mso-special-character:page-break'>

        <!-- CONTENIDO -->
        <h3>NUESTRO PORTAFOLIO</h3>
  `;

  // Agrupar por categoría
  const categories = {
    'seats': 'Asientos / Butacas',
    'tables': 'Mesas de Diseño',
    'habitational': 'Mobiliario Habitacional',
    'outdoor': 'Exteriores y Piscinas',
    'office': 'Línea de Oficina',
    'special': 'Líneas Especializadas',
    'services': 'Servicios Integrales'
  };

  Object.keys(categories).forEach(catKey => {
    const items = CATALOG_DATA.filter(i => i.category === catKey);
    if (items.length > 0) {
      html += `<div class="category-header">${categories[catKey]}</div>`;
      
      items.forEach(item => {
        html += `
          <div class="product-card">
            <div class="product-name">${item.name_es}</div>
            <div class="product-type">${item.type === 'product' ? 'PRODUCTO PREMIUM' : 'SERVICIO INTEGRAL'}</div>
            <div class="product-desc">${item.description_es}</div>
            
            <div class="specs-title">ESPECIFICACIONES TÉCNICAS:</div>
            <ul>
              ${item.details_es.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `;
      });
    }
  });

  html += `
        <br clear=all style='mso-special-character:page-break'>
        <h2>CONTÁCTANOS</h2>
        <p style="text-align: center;"><strong>WhatsApp:</strong> +53 5874 6866</p>
        <p style="text-align: center;"><strong>Email:</strong> info@akamara.cu</p>
        <p style="text-align: center;">La Habana, Cuba</p>
        
        <div class="footer">
          © ${date} AKAMARA S.U.R.L. - Todos los derechos reservados.
        </div>
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync('AKAMARA_CATALOG_EDITABLE.doc', html);
  console.log('Archivo editable generado: AKAMARA_CATALOG_EDITABLE.doc');
}

generateWordHTML();
