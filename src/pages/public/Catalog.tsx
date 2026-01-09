
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download, ShoppingCart, MessageSquare, ArrowLeft, Filter, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATALOG_DATA, CatalogItem } from '../../data/catalog';
import { LEGAL_INFO } from '../../constants';
import { jsPDF } from 'jspdf';

export const Catalog = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'product' | 'service'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const filteredItems = CATALOG_DATA.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const name = i18n.language === 'es' ? item.name_es : item.name_en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Helper to convert image URL to Base64
  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Cover Page
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      doc.setTextColor(245, 158, 11); // amber-500
      doc.setFontSize(40);
      doc.setFont('helvetica', 'bold');
      doc.text('AKAMARA', pageWidth / 2, 80, { align: 'center' });
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('CATÁLOGO CORPORATIVO', pageWidth / 2, 100, { align: 'center' });
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Mobiliario & Soluciones Logísticas', pageWidth / 2, 110, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text(`Edición ${new Date().getFullYear()}`, pageWidth / 2, 140, { align: 'center' });
      
      // Info Box at bottom of cover
      doc.setDrawColor(245, 158, 11);
      doc.line(40, 250, 170, 250);
      doc.setFontSize(8);
      doc.text(`PROYECTO AKAMARA S.U.R.L. | NIT: ${LEGAL_INFO.nit}`, pageWidth / 2, 260, { align: 'center' });

      // Start Items
      let y = 30;
      doc.addPage();
      
      for (const [index, item] of CATALOG_DATA.entries()) {
        const name = i18n.language === 'es' ? item.name_es : item.name_en;
        const desc = i18n.language === 'es' ? item.description_es : item.description_en;
        
        // Check if we need a new page (each item takes approx 70mm)
        if (y > 220) {
          doc.addPage();
          y = 30;
        }

        // Header per page if first item on page
        if (y === 30) {
            doc.setFillColor(15, 23, 42);
            doc.rect(0, 0, pageWidth, 20, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text(`CATÁLOGO AKAMARA - ${new Date().getFullYear()}`, 15, 13);
        }

        y += 10;

        // Image handling
        try {
            const base64Img = await getBase64ImageFromURL(`${item.image}&w=400&h=300&fit=crop`);
            doc.addImage(base64Img, 'JPEG', 15, y, 50, 40);
        } catch (e) {
            doc.setDrawColor(200, 200, 200);
            doc.rect(15, y, 50, 40);
            doc.text('Imagen no disponible', 20, y + 20);
        }

        // Text Content
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(name, 70, y + 5);
        
        doc.setFontSize(9);
        doc.setTextColor(245, 158, 11);
        doc.text(t(`catalog.categories.${item.category}`).toUpperCase(), 70, y + 11);
        
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const splitDesc = doc.splitTextToSize(desc, 110);
        doc.text(splitDesc, 70, y + 18);
        
        // Badge type
        doc.setFillColor(item.type === 'product' ? 240 : 230, 240, 255);
        doc.roundedRect(170, y + 2, 25, 6, 1, 1, 'F');
        doc.setFontSize(7);
        doc.setTextColor(50, 50, 150);
        doc.text(item.type.toUpperCase(), 182.5, y + 6, { align: 'center' });

        y += 55;
        
        // Thin Separator
        doc.setDrawColor(226, 232, 240);
        doc.line(15, y - 5, 195, y - 5);
      }

      // Final Page with Contact
      doc.addPage();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(30);
      doc.text('CONTACTO', pageWidth / 2, 60, { align: 'center' });
      
      doc.setFontSize(14);
      doc.text(LEGAL_INFO.contact.person, pageWidth / 2, 80, { align: 'center' });
      doc.setTextColor(245, 158, 11);
      doc.text(LEGAL_INFO.contact.phone, pageWidth / 2, 90, { align: 'center' });
      doc.setTextColor(255, 255, 255);
      doc.text(LEGAL_INFO.contact.email, pageWidth / 2, 100, { align: 'center' });
      doc.text(LEGAL_INFO.location, pageWidth / 2, 110, { align: 'center' });

      doc.save(`Akamara_Catalogo_Completo_${i18n.language.toUpperCase()}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Error al generar el PDF. Por favor, intente de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAction = (item: CatalogItem) => {
    const name = i18n.language === 'es' ? item.name_es : item.name_en;
    const message = item.type === 'product' 
      ? `Hola Akamara, estoy interesado en comprar/cotizar: ${name}`
      : `Hola Akamara, deseo información sobre el servicio: ${name}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5358746866?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-void min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mb-4 font-bold uppercase tracking-widest text-[10px]">
              <ArrowLeft size={14} />
              {t('policies.back') || 'Volver al Inicio'}
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              {t('catalog.title').split(' ')[0]} <span className="text-comet">{t('catalog.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-slate-400 text-lg font-light italic">{t('catalog.subtitle')}</p>
          </div>
          
          <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className={`group flex items-center space-x-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all duration-500 ${isGenerating ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isGenerating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Download size={18} className="group-hover:animate-bounce" />
            )}
            <span className="text-xs font-black uppercase tracking-widest">
              {isGenerating ? 'Generando PDF...' : t('catalog.download_pdf')}
            </span>
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
              placeholder={t('contact_section.labels.name') || 'Buscar productos o servicios...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" ref={catalogRef}>
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-amber-500/50 transition-all duration-500 shadow-xl">
              <div className="h-64 overflow-hidden relative">
                <img src={`${item.image}&w=600&h=400&fit=crop`} alt={item.name_es} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">
                    {t(`catalog.categories.${item.category}`)}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-amber-500 transition-colors">
                  {i18n.language === 'es' ? item.name_es : item.name_en}
                </h3>
                <p className="text-slate-400 text-sm mb-8 line-clamp-3 font-light leading-relaxed">
                  {i18n.language === 'es' ? item.description_es : item.description_en}
                </p>
                
                <button 
                  onClick={() => handleAction(item)}
                  className="mt-auto flex items-center justify-center space-x-3 w-full py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/btn"
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
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24">
            <Filter size={48} className="mx-auto text-slate-800 mb-6" />
            <p className="text-slate-500 uppercase tracking-widest text-xs">No se encontraron resultados</p>
          </div>
        )}

      </div>
    </div>
  );
};
