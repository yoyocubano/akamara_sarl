
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download, ShoppingCart, MessageSquare, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATALOG_DATA, CatalogItem } from '../../data/catalog';
import { LEGAL_INFO } from '../../constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Catalog = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'product' | 'service'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const catalogRef = useRef<HTMLDivElement>(null);

  const filteredItems = CATALOG_DATA.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const name = i18n.language === 'es' ? item.name_es : item.name_en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const generatePDF = async () => {
    if (!catalogRef.current) return;
    
    // Simple PDF Generation using jsPDF
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(t('catalog.title'), 20, 25);
    
    doc.setFontSize(10);
    doc.text(t('catalog.subtitle'), 20, 32);

    // Items
    let y = 60;
    CATALOG_DATA.forEach((item, index) => {
      if (y > 250) {
        doc.addPage();
        y = 30;
      }
      
      const name = i18n.language === 'es' ? item.name_es : item.name_en;
      const desc = i18n.language === 'es' ? item.description_es : item.description_en;
      
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.text(name, 20, y);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`[${t(`catalog.categories.${item.category}`)}]`, 20, y + 5);
      
      doc.setTextColor(51, 65, 85);
      const splitDesc = doc.splitTextToSize(desc, 170);
      doc.text(splitDesc, 20, y + 12);
      
      y += 15 + (splitDesc.length * 5);
      
      // Separator
      doc.setDrawColor(226, 232, 240);
      doc.line(20, y, 190, y);
      y += 15;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Akamara S.U.R.L. - NIT: ${LEGAL_INFO.nit} - ${LEGAL_INFO.location}`, pageWidth / 2, 285, { align: 'center' });

    doc.save(`Akamara_Catalogo_${new Date().getFullYear()}.pdf`);
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mb-4 font-bold uppercase tracking-widest text-[10px]">
              <ArrowLeft size={14} />
              {t('policies.back')}
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              {t('catalog.title').split(' ')[0]} <span className="text-comet">{t('catalog.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-slate-400 text-lg font-light italic">{t('catalog.subtitle')}</p>
          </div>
          
          <button 
            onClick={generatePDF}
            className="group flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all duration-300"
          >
            <Download size={18} className="group-hover:animate-bounce" />
            <span className="text-xs font-black uppercase tracking-widest">{t('catalog.download_pdf')}</span>
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
              placeholder={t('contact_section.labels.name')}
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
              <div className="h-64 overflow-hidden relative">
                <img src={item.image} alt={item.name_es} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
