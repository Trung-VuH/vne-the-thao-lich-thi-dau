import React, { useState } from 'react';
import { Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleItem } from '../types/football';
import { getAllFootballNews } from '../data/mockLeagueNews';

interface GeneralFootballNewsSectionProps {
  title?: string;
}

export const GeneralFootballNewsSection: React.FC<GeneralFootballNewsSectionProps> = ({
  title = "Tin tức Bóng đá"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const allNews: ArticleItem[] = getAllFootballNews();
  const pageSize = 20;
  const totalPages = Math.ceil(allNews.length / pageSize) || 1;

  const currentNews = allNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('general-football-news-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="general-football-news-section" className="mt-8 pt-6 border-t-2 border-[#9f224e]/20 space-y-4">
      {/* Block Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#9f224e] bg-white px-4 py-3 rounded-t-xl shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#9f224e]/10 text-[#9f224e] flex items-center justify-center font-bold">
            <Newspaper className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {title}
          </h2>
        </div>
      </div>

      {/* Main Content Card: Shows each item with Title, thumb image, and short description */}
      <div className="bg-white rounded-b-xl border border-gray-200 overflow-hidden shadow-xs p-4 sm:p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 divide-y md:divide-y-0 divide-gray-100">
          {currentNews.map((article, idx) => (
            <article
              key={article.id}
              className={`group cursor-pointer flex gap-3 sm:gap-4 items-start ${idx > 0 ? 'pt-4 md:pt-0' : ''}`}
            >
              {/* Ảnh thumb */}
              <div className="w-28 sm:w-36 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Title & Description ngắn gọn duy nhất */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#9f224e] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Phân trang: 20 tin một trang */}
        {totalPages > 1 && (
          <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trang trước</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => handlePageChange(pNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    currentPage === pNum
                      ? 'bg-[#9f224e] text-white shadow-2xs'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {pNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition"
            >
              <span>Trang sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
