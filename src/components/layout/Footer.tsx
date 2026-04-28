import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full pt-12 pb-8 flex flex-col items-center justify-center opacity-20 select-none pointer-events-none">
      <div className="flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase font-semibold text-white/60">
        <span>{t('developers')}: Fatma Nur AYKUT & Şehmus AYKUT</span>
      </div>
      <p className="text-[8px] mt-1 text-gray-500 font-medium italic">
        Yozgat Bozok University &bull; Faculty of Medicine
      </p>
    </footer>
  );
}
