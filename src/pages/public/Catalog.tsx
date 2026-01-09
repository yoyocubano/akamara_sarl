
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download, ShoppingCart, MessageSquare, ArrowLeft, Filter, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATALOG_DATA, CatalogItem } from '../../data/catalog';
import { LEGAL_INFO } from '../../constants';
import jsPDF from 'jspdf';

export const Catalog = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'product' | 'service'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const isSpanish = i18n.language.startsWith('es');

  const filteredItems = CATALOG_DATA.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const name = isSpanish ? item.name_es : item.name_en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        if (img.width === 0 || img.height === 0) {
          reject('Invalid image dimensions');
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataURL);
      };
      img.onerror = () => reject('Error loading image');
      img.src = url;
    });
  };

  const generatePDF = async (singleItem?: CatalogItem) => {
    setIsGenerating(true);
    const isEs = i18n.language.startsWith('es');
    
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      
      // If single item, we show a special technical sheet layout
      if (singleItem) {
        const name = isEs ? singleItem.name_es : singleItem.name_en;
        const desc = isEs ? singleItem.description_es : singleItem.description_en;
        const details = isEs ? singleItem.details_es : singleItem.details_en;

        // Header Background
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 60, 'F');

        // Logo / Title
        doc.setTextColor(245, 158, 11);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('AKAMARA', margin, 25);
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(isEs ? 'FICHA TÉCNICA OFICIAL' : 'OFFICIAL TECHNICAL SHEET', margin, 35);

        // Item Image (Large)
        try {
          const base64Img = await getBase64ImageFromURL(`${singleItem.image}&w=800&h=600&q=90`);
          doc.addImage(base64Img, 'JPEG', margin, 70, pageWidth - (margin * 2), 100);
        } catch (e) {
          doc.setFillColor(241, 245, 249);
          doc.rect(margin, 70, pageWidth - (margin * 2), 100, 'F');
        }

        // Content
        let y = 185;
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        if (name) doc.text(String(name), margin, y);
        
        y += 10;
        doc.setTextColor(245, 158, 11);
        doc.setFontSize(10);
        const typeLabel = singleItem.type === 'product' ? (isEs ? 'PRODUCTO PREMIUM' : 'PREMIUM PRODUCT') : (isEs ? 'SERVICIO INTEGRAL' : 'INTEGRAL SERVICE');
        doc.text(String(typeLabel), margin, y);

        y += 15;
        doc.setTextColor(51, 65, 85);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        const splitDescLines = doc.splitTextToSize(String(desc || ''), pageWidth - (margin * 2));
        doc.text(splitDescLines, margin, y);
        
        y += (splitDescLines.length * 7) + 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text(isEs ? 'ESPECIFICACIONES TÉCNICAS:' : 'TECHNICAL SPECIFICATIONS:', margin, y);

        y += 10;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(71, 85, 105);
        (details || []).forEach((detail) => {
          if (detail) doc.text(`• ${detail}`, margin + 5, y);
          y += 8;
        });

        // Contact Info Box at Bottom
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, pageHeight - 50, pageWidth - (margin * 2), 35, 3, 3, 'F');
        
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(isEs ? 'SOLICITAR MÁS INFORMACIÓN:' : 'REQUEST MORE INFO:', margin + 5, pageHeight - 40);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(`WhatsApp: ${LEGAL_INFO.contact.phone} | Email: ${LEGAL_INFO.contact.email}`, margin + 5, pageHeight - 32);
        doc.text(`NIT: ${LEGAL_INFO.nit} | Akamara S.U.R.L. 2026`, margin + 5, pageHeight - 25);

        doc.save(`AKAMARA_${(singleItem.id || 'ITEM').toUpperCase()}_${(i18n.language || 'es').toUpperCase()}.pdf`);
        setIsGenerating(false);
        return;
      }

      // --- MULTI-ITEM CATALOG (Existing logic) ---
      // --- PAGE 1: COVER ---
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Decorative elements
      doc.setDrawColor(245, 158, 11); // amber-500
      doc.setLineWidth(0.5);
      doc.line(margin, margin, pageWidth - margin, margin);
      doc.line(margin, pageHeight - margin, pageWidth - margin, pageHeight - margin);
      
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(54);
      doc.setFont('helvetica', 'bold');
      doc.text('AKAMARA', pageWidth / 2, 90, { align: 'center' });
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text(isEs ? 'CATÁLOGO CORPORATIVO' : 'CORPORATE CATALOG', pageWidth / 2, 110, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(isEs ? 'Mobiliario de Diseño, Construcción y Logística' : 'Designer Furniture, Construction & Logistics', pageWidth / 2, 125, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(isEs ? `Edición Oficial ${new Date().getFullYear()}` : `Official Edition ${new Date().getFullYear()}`, pageWidth / 2, 150, { align: 'center' });
      
      // Secondary Cover Text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      const introText = isEs 
        ? 'Este documento contiene nuestra selección exclusiva de productos y servicios integrales para el mercado cubano, diseñados bajo estándares internacionales de calidad y estética.'
        : 'This document contains our exclusive selection of products and comprehensive services for the Cuban market, designed under international standards of quality and aesthetics.';
      const splitIntro = doc.splitTextToSize(introText, pageWidth - (margin * 4));
      doc.text(splitIntro, pageWidth / 2, 200, { align: 'center' });

      // --- PAGE 2: ABOUT / PHILOSOPHY ---
      doc.addPage();
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Side accent
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 5, pageHeight, 'F');
      
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(isEs ? 'Nuestra Filosofía' : 'Our Philosophy', margin, 40);
      
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(1.5);
      doc.line(margin, 45, 60, 45);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const philosophyText = isEs
        ? 'AKAMARA S.U.R.L. nace con la visión de fusionar la tradición artesanal cubana con la eficiencia técnica moderna. "Antes del tiempo, Akamara" no es solo un slogan, es nuestra promesa de permanencia y vanguardia.\n\nOperamos cinco divisiones estratégicas:\n\n1. ESTRATEGIA: Consultoría integral.\n2. MOBILIARIO: Diseño y fabricación de alto estándar.\n3. CONSTRUCCIÓN: Solidez y acabados de lujo.\n4. GASTRONOMÍA: Catering de autor y profundidad de sabor.\n5. LOGÍSTICA: El camino seguro para sus recursos.'
        : 'AKAMARA S.U.R.L. was born with the vision of merging Cuban artisanal tradition with modern technical efficiency. "Before time, Akamara" is not just a slogan, it is our promise of permanence and vanguard.\n\nWe operate five strategic divisions:\n\n1. STRATEGY: Comprehensive consulting.\n2. FURNITURE: High-standard design and manufacturing.\n3. CONSTRUCTION: Solidity and luxury finishes.\n4. GASTRONOMY: Signature catering and depth of flavor.\n5. LOGISTICS: The safe path for your resources.';
      
      const splitPhilosophy = doc.splitTextToSize(philosophyText, pageWidth - (margin * 2.5));
      doc.text(splitPhilosophy, margin, 65);

      // --- PRODUCT PAGES ---
      let yp = 30;
      doc.addPage();
      
      // Group items by category for the PDF
      const categoriesOrder = ['seats', 'tables', 'habitational', 'outdoor', 'office', 'special', 'services'];
      
      for (const cat of categoriesOrder) {
        const catItems = CATALOG_DATA.filter(i => i.category === cat);
        if (catItems.length === 0) continue;

        // Category Header
        if (yp > pageHeight - 60) {
          doc.addPage();
          yp = 30;
        }

        doc.setFillColor(248, 250, 252); // slate-50
        doc.rect(0, yp - 10, pageWidth, 20, 'F');
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(t(`catalog.categories.${cat}`) || cat).toUpperCase(), margin, yp + 3);
        yp += 25;

        for (const item of catItems) {
          if (yp > pageHeight - 100) {
            doc.addPage();
            yp = 30;
          }

          const name = isEs ? item.name_es : item.name_en;
          const desc = isEs ? item.description_es : item.description_en;
          const details = isEs ? item.details_es : item.details_en;

          // Item Box Border
          doc.setDrawColor(241, 245, 249);
          doc.setLineWidth(0.2);
          doc.roundedRect(margin - 5, yp - 5, pageWidth - (margin * 2) + 10, 85, 3, 3);

          // Image
          try {
            const base64Img = await getBase64ImageFromURL(`${item.image}&w=400&h=300&q=80`);
            doc.addImage(base64Img, 'JPEG', margin, yp, 55, 60);
          } catch (e) {
            doc.setFillColor(241, 245, 249);
            doc.rect(margin, yp, 55, 60, 'F');
            doc.setFontSize(8);
            doc.text('N/A', margin + 25, yp + 30);
          }

          // Item Info
          doc.setTextColor(15, 23, 42);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(name, margin + 65, yp + 10);
          
          doc.setFontSize(9);
          doc.setTextColor(245, 158, 11);
          doc.text(item.type === 'product' ? (isEs ? 'PRODUCTO PREMIUM' : 'PREMIUM PRODUCT') : (isEs ? 'SERVICIO INTEGRAL' : 'INTEGRAL SERVICE'), margin + 65, yp + 16);
          
          doc.setTextColor(71, 85, 105);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          const splitDesc = doc.splitTextToSize(String(desc || ''), pageWidth - margin - 65 - margin);
          doc.text(splitDesc, margin + 65, yp + 24);

          // Details / Bullet points
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(15, 23, 42);
          doc.text(isEs ? 'ESPECIFICACIONES:' : 'SPECIFICATIONS:', margin + 65, yp + 40);
          
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 116, 139);
          let detailY = yp + 45;
          details.forEach((detail) => {
            doc.text(`• ${detail}`, margin + 68, detailY);
            detailY += 5;
          });

          yp += 95;
        }
      }

      // --- FINAL PAGE: CONTACT ---
      doc.addPage();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(36);
      doc.setFont('helvetica', 'bold');
      doc.text(isEs ? 'CONTÁCTENOS' : 'CONTACT US', pageWidth / 2, 60, { align: 'center' });
      
      doc.setDrawColor(245, 158, 11);
      doc.line(pageWidth / 2 - 30, 70, pageWidth / 2 + 30, 70);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text(LEGAL_INFO.contact.person, pageWidth / 2, 90, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(`WhatsApp: ${LEGAL_INFO.contact.phone}`, pageWidth / 2, 110, { align: 'center' });
      doc.text(`Email: ${LEGAL_INFO.contact.email}`, pageWidth / 2, 120, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(148, 163, 184);
      const addressText = `${LEGAL_INFO.location}\nLa Habana, Cuba`;
      doc.text(addressText, pageWidth / 2, 140, { align: 'center' });
      
      doc.text(`NIT: ${LEGAL_INFO.nit}`, pageWidth / 2, 160, { align: 'center' });

      // Footer legal
      doc.setFontSize(8);
      const legalFooter = isEs 
        ? '© 2026 AKAMARA S.U.R.L. Todos los derechos reservados. Las especificaciones de los productos pueden variar sin previo aviso.'
        : '© 2026 AKAMARA S.U.R.L. All rights reserved. Product specifications may vary without prior notice.';
      doc.text(legalFooter, pageWidth / 2, 280, { align: 'center' });

      doc.save(`AKAMARA_CATALOG_2026_${(i18n.language || 'es').toUpperCase()}.pdf`);
    } catch (error) {
      console.error('Error generating detailed PDF:', error);
      alert('Error técnico al generar el documento. Asegúrese de tener conexión a internet para cargar las imágenes corporativas.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAction = (item: CatalogItem) => {
    const isEs = i18n.language.startsWith('es');
    const name = isEs ? item.name_es : item.name_en;
    const message = item.type === 'product' 
      ? (isEs ? `Hola Akamara, estoy interesado en comprar/cotizar: ${name}` : `Hello Akamara, I am interested in buying/requesting a quote for: ${name}`)
      : (isEs ? `Hola Akamara, deseo información sobre el servicio: ${name}` : `Hello Akamara, I would like information about the service: ${name}`);
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5358746866?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-void min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mb-4 font-bold uppercase tracking-widest text-[10px]">
              <ArrowLeft size={14} />
              {t('policies.back') || (isSpanish ? 'Volver al Inicio' : 'Back to Home')}
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              {t('catalog.title').split(' ')[0]} <span className="text-comet">{t('catalog.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-slate-400 text-lg font-light italic">{t('catalog.subtitle')}</p>
          </div>
          
          <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className={`group flex items-center space-x-4 bg-white/5 border border-white/10 px-10 py-5 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all duration-700 shadow-2xl ${isGenerating ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isGenerating ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <Download size={24} className="group-hover:translate-y-1 transition-transform" />
            )}
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                {isGenerating ? (isSpanish ? 'PROCESANDO...' : 'PROCESSING...') : (isSpanish ? 'OBTENER ARCHIVO' : 'GET FILE')}
              </span>
              <span className="text-xs font-bold opacity-70 leading-none">
                {isSpanish ? 'Catálogo 2026 (Premium PDF)' : '2026 Catalog (Premium PDF)'}
              </span>
            </div>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl mb-12 flex flex-col lg:flex-row gap-6 justify-between items-center">
          
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-white/5">
            {(['all', 'product', 'service'] as const).map((tKey) => (
              <button
                key={tKey}
                onClick={() => setFilter(tKey)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === tKey ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-white'
                }`}
              >
                {t(`catalog.${tKey === 'all' ? 'all' : tKey + 's'}`)}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder={isSpanish ? 'Filtrar por nombre...' : 'Filter by name...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" ref={catalogRef}>
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-amber-500/50 transition-all duration-500">
              <div className="h-64 overflow-hidden relative bg-slate-950/50">
                <img 
                  src={`${item.image}&w=600&h=400&fit=crop`} 
                  alt={isSpanish ? item.name_es : item.name_en} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800'; // Elegant furniture placeholder
                  }}
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">
                    {t(`catalog.categories.${item.category}`)}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-amber-500 transition-colors">
                  {isSpanish ? item.name_es : item.name_en}
                </h3>
                <p className="text-slate-400 text-sm mb-8 line-clamp-3 font-light leading-relaxed">
                  {isSpanish ? item.description_es : item.description_en}
                </p>
                
                <div className="mt-auto space-y-3">
                  <button 
                    onClick={() => handleAction(item)}
                    className="flex items-center justify-center space-x-3 w-full py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/btn"
                  >
                    {item.type === 'product' ? (
                      <>
                        <ShoppingCart size={18} className="text-amber-500 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('catalog.actions.buy')}</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare size={18} className="text-blue-500 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('catalog.actions.contact')}</span>
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => generatePDF(item)}
                    disabled={isGenerating}
                    className="flex items-center justify-center space-x-3 w-full py-3 bg-slate-950/50 border border-white/5 rounded-2xl hover:border-amber-500/50 transition-all group/pdf text-slate-400 hover:text-white"
                  >
                    <Download size={14} className="group-hover/pdf:translate-y-1 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                      {isSpanish ? 'FICHA TÉCNICA (PDF)' : 'TECHNICAL SHEET (PDF)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24">
            <Filter size={48} className="mx-auto text-slate-800 mb-6" />
            <p className="text-slate-500 uppercase tracking-widest text-xs">
              {isSpanish ? 'No se encontraron resultados' : 'No results found'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
