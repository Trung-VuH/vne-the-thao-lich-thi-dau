import React from 'react';
import { 
  Calendar, 
  Trophy, 
  Tv, 
  Search, 
  Bell, 
  Flame, 
  User, 
  Menu,
  ChevronDown,
  Filter,
  BarChart2
} from 'lucide-react';

interface VnExpressHeaderProps {
  currentTab: 'schedule' | 'results' | 'live' | 'standings';
  onTabChange: (tab: 'schedule' | 'results' | 'live' | 'standings') => void;
  liveCount: number;
  highlightCount: number;
  onOpenLeaguesDrawer?: () => void;
  onOpenStandingsDrawer?: () => void;
  hasActiveFilters?: boolean;
  onNavigateHome?: () => void;
}

export const VnExpressHeader: React.FC<VnExpressHeaderProps> = ({
  currentTab,
  onTabChange,
  liveCount,
  highlightCount,
  onOpenLeaguesDrawer,
  onOpenStandingsDrawer,
  hasActiveFilters,
  onNavigateHome
}) => {
  return (
    <>
      <header className="bg-white border-b border-gray-200">
        {/* Top utility bar (scrolling, not pinned) */}
      <div className="bg-[#fcfcfc] border-b border-gray-100 text-xs text-gray-600 px-3 sm:px-4 py-1.5 hidden md:block">
        <div className="max-w-[1130px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Thứ Tư, 30/09/2026</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">Hà Nội 28°C / TP.HCM 31°C</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#9f224e] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9f224e] animate-pulse"></span>
              Bóng đá 24/7 - Cập nhật liên tục
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <span className="hover:text-[#9f224e] cursor-pointer">Bản Tiếng Việt</span>
            <span className="hover:text-[#9f224e] cursor-pointer flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-500" /> Đăng nhập
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Bar (scrolling, not pinned) */}
      <div className="max-w-[1130px] mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-md">
            <Menu className="w-6 h-6" />
          </button>
          
          {/* VnExpress Logo */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-2 cursor-pointer select-none"
            title="Về trang chủ Lịch thi đấu & Kết quả"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#9f224e]">
                VnExpress
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#9f224e] px-1.5 py-0.5 rounded-xs">
                Thể Thao
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs text-gray-400 pl-2 border-l border-gray-300 font-light">
              Báo tiếng Việt nhiều người xem nhất
            </span>
          </div>
        </div>

        {/* Action quick links */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-xs text-gray-600 focus-within:ring-2 focus-within:ring-[#9f224e]/30">
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm đội bóng, giải đấu..." 
              className="bg-transparent border-none outline-none text-xs w-40 text-gray-800 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => onTabChange('live')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentTab === 'live' 
                  ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-300' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>LIVE</span>
              <span className="bg-red-700 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {liveCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Category Nav (scrolling, not pinned) */}
      <div className="bg-[#9f224e] text-white">
        <div className="max-w-[1130px] mx-auto px-3 sm:px-4 flex items-center justify-between overflow-x-auto scrollbar-none">
          <nav className="flex items-center text-sm font-medium whitespace-nowrap">
            <button onClick={onNavigateHome} className="px-3 py-2.5 hover:bg-[#831b40] transition">Trang chủ</button>
            <a href="#" className="px-3 py-2.5 hover:bg-[#831b40] transition">Thời sự</a>
            <a href="#" className="px-3 py-2.5 hover:bg-[#831b40] transition">Góc nhìn</a>
            <a href="#" className="px-3 py-2.5 hover:bg-[#831b40] transition">Thế giới</a>
            <a href="#" className="px-3 py-2.5 hover:bg-[#831b40] transition">Kinh doanh</a>
            <button onClick={onNavigateHome} className="px-3 py-2.5 bg-[#78183a] font-bold border-b-2 border-white">Thể thao</button>
            <a href="#" className="px-3 py-2.5 hover:bg-[#831b40] transition">Giải trí</a>
            <a href="#" className="px-3 py-2.5 hover:bg-[#831b40] transition">Ý kiến</a>
          </nav>
        </div>
      </div>
    </header>

    {/* Pinned Sports Sub-Navigation Menu (sticky top-0 outside header to pin across entire page) */}
    <nav className="sticky top-0 z-40 bg-[#f0f2f5] border-b border-gray-300 shadow-xs">
      <div className="max-w-[1130px] mx-auto px-2.5 sm:px-4 flex items-center justify-between gap-1.5 py-1.5 sm:py-2">
        {/* Main Sub Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 whitespace-nowrap min-w-0">
          <button
            onClick={() => onTabChange('schedule')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 transition-all flex-shrink-0 ${
              currentTab === 'schedule'
                ? 'bg-[#9f224e] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Lịch thi đấu</span>
          </button>

          <button
            onClick={() => onTabChange('results')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 transition-all flex-shrink-0 ${
              currentTab === 'results'
                ? 'bg-[#9f224e] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Kết quả</span>
          </button>
        </div>

        {/* Mobile & Tablet Quick Drawer Buttons (visible on screen < 1024px) */}
        <div className="flex items-center gap-1.5 lg:hidden flex-shrink-0 pl-1">
          {onOpenLeaguesDrawer && (
            <button
              onClick={onOpenLeaguesDrawer}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                hasActiveFilters
                  ? 'bg-red-100 text-[#9f224e] border border-red-300 font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              title="Mở danh sách giải đấu & đội bóng"
            >
              <Filter className="w-3.5 h-3.5 text-[#9f224e]" />
              <span className="hidden md:inline">Giải &amp; Đội</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              )}
            </button>
          )}

          {onOpenStandingsDrawer && (
            <button
              onClick={onOpenStandingsDrawer}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 flex items-center gap-1 transition"
              title="Xem Bảng xếp hạng"
            >
              <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Bảng xếp hạng</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  </>
  );
};
