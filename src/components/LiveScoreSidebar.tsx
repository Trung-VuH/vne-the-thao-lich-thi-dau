import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, X, Shield, Trophy } from 'lucide-react';
import { formatCountryVN } from '../utils/footballUtils';

interface LiveScoreSidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTeam: string | null;
  onSelectTeam: (team: string | null) => void;
  selectedLeagueId: number | null;
  onSelectLeagueId: (id: number | null) => void;
  selectedCountry: string | null;
  onSelectCountry: (country: string | null) => void;
  onCloseDrawer?: () => void;
}

const SIDEBAR_COMPETITIONS = [
  { id: 39, name: "Premier League", country: "Anh", logo: "https://is.vnecdn.net/objects/leagues/39.png?v=1" },
  { id: 2, name: "Champions League", country: "Châu Âu", logo: "https://is.vnecdn.net/objects/leagues/2.png?v=1" },
  { id: 340, name: "V-League", country: "Việt Nam", logo: "https://is.vnecdn.net/objects/leagues/340.png?v=1" },
  { id: 140, name: "LaLiga", country: "Tây Ban Nha", logo: "https://is.vnecdn.net/objects/leagues/140.png?v=1" },
  { id: 135, name: "Serie A", country: "Italy", logo: "https://is.vnecdn.net/objects/leagues/135.png?v=1" },
  { id: 78, name: "Bundesliga", country: "Đức", logo: "https://is.vnecdn.net/objects/leagues/78.png?v=1" },
  { id: 3, name: "Europa League (C2)", country: "Châu Âu", logo: "https://is.vnecdn.net/objects/leagues/3.png?v=1" },
  { id: 61, name: "Ligue 1", country: "Pháp", logo: "https://is.vnecdn.net/objects/leagues/61.png?v=1" },
  { id: 307, name: "Saudi Pro League", country: "Ả Rập Xê Út", logo: "https://is.vnecdn.net/objects/leagues/307.png?v=1" },
  { id: 253, name: "MLS", country: "Mỹ", logo: "https://is.vnecdn.net/objects/leagues/253.png?v=1" },
  // Extended leagues when clicking "Xem thêm"
  { id: 45, name: "FA Cup", country: "Anh", logo: "https://is.vnecdn.net/objects/leagues/45.png?v=1" },
  { id: 48, name: "Carabao Cup", country: "Anh", logo: "https://is.vnecdn.net/objects/leagues/48.png?v=1" }
];

const SIDEBAR_TEAMS = [
  // Top 6 teams shown by default
  { name: "Arsenal", country: "Anh", logo: "https://is.vnecdn.net/objects/teams/42.png?v=1" },
  { name: "Manchester United", country: "Anh", logo: "https://is.vnecdn.net/objects/teams/33.png?v=1" },
  { name: "Real Madrid", country: "Tây Ban Nha", logo: "https://is.vnecdn.net/objects/teams/541.png?v=1" },
  { name: "Barcelona", country: "Tây Ban Nha", logo: "https://is.vnecdn.net/objects/teams/529.png?v=1" },
  { name: "Công An Hà Nội", country: "Việt Nam", logo: "https://is.vnecdn.net/objects/teams/3801.png?v=1" },
  { name: "Hà Nội FC", country: "Việt Nam", logo: "https://is.vnecdn.net/objects/teams/3802.png?v=1" },
  // Extended teams when clicking "Xem thêm"
  { name: "Manchester City", country: "Anh", logo: "https://is.vnecdn.net/objects/teams/50.png?v=1" },
  { name: "Liverpool", country: "Anh", logo: "https://is.vnecdn.net/objects/teams/40.png?v=1" },
  { name: "Chelsea", country: "Anh", logo: "https://is.vnecdn.net/objects/teams/49.png?v=1" },
  { name: "Tottenham", country: "Anh", logo: "https://is.vnecdn.net/objects/teams/47.png?v=1" },
  { name: "Bayern Munich", country: "Đức", logo: "https://is.vnecdn.net/objects/teams/157.png?v=1" },
  { name: "Paris Saint-Germain", country: "Pháp", logo: "https://is.vnecdn.net/objects/teams/85.png?v=1" },
  { name: "Inter Milan", country: "Italy", logo: "https://is.vnecdn.net/objects/teams/505.png?v=1" },
  { name: "Monaco", country: "Pháp", logo: "https://is.vnecdn.net/objects/teams/91.png?v=1" },
  { name: "Marseille", country: "Pháp", logo: "https://is.vnecdn.net/objects/teams/81.png?v=1" },
  { name: "Al Nassr", country: "Ả Rập Xê Út", logo: "https://media.api-sports.io/football/teams/1022.png" },
  { name: "Inter Miami", country: "Mỹ", logo: "https://media.api-sports.io/football/teams/1598.png" },
  { name: "Thép Xanh Nam Định", country: "Việt Nam", logo: "https://is.vnecdn.net/objects/teams/3803.png?v=1" }
];

export const LiveScoreSidebar: React.FC<LiveScoreSidebarProps> = ({
  searchQuery,
  onSearchChange,
  selectedTeam,
  onSelectTeam,
  selectedLeagueId,
  onSelectLeagueId,
  selectedCountry,
  onSelectCountry,
  onCloseDrawer
}) => {
  // Toggle show all states as requested
  const [showAllLeagues, setShowAllLeagues] = useState(false);
  const [showAllTeams, setShowAllTeams] = useState(false);

  const hasActiveFilter = Boolean(selectedTeam || selectedLeagueId || selectedCountry || searchQuery);

  const clearAllFilters = () => {
    onSelectTeam(null);
    onSelectLeagueId(null);
    onSelectCountry(null);
    onSearchChange('');
  };

  const handleSelectLeague = (id: number) => {
    onSelectLeagueId(selectedLeagueId === id ? null : id);
    onSelectTeam(null);
    onSelectCountry(null);
    if (onCloseDrawer) onCloseDrawer();
  };

  const handleSelectTeam = (name: string) => {
    onSelectTeam(selectedTeam === name ? null : name);
    onSelectLeagueId(null);
    onSelectCountry(null);
    if (onCloseDrawer) onCloseDrawer();
  };

  // Top 10 competitions initially or all
  const displayedCompetitions = showAllLeagues 
    ? SIDEBAR_COMPETITIONS 
    : SIDEBAR_COMPETITIONS.slice(0, 10);

  // Top 6 teams initially or all
  const displayedTeams = showAllTeams 
    ? SIDEBAR_TEAMS 
    : SIDEBAR_TEAMS.slice(0, 6);

  return (
    <aside className="w-full bg-white text-gray-800 rounded-xl border border-gray-200 p-3 sm:p-4 space-y-4 select-none shadow-xs">
      {/* Mobile Drawer Title Header if in Drawer */}
      {onCloseDrawer && (
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#9f224e]" />
            <span className="font-bold text-sm text-gray-900">Giải đấu &amp; Đội bóng</span>
          </div>
          <button
            onClick={onCloseDrawer}
            className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm đội bóng, giải đấu..."
          className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 pl-9 pr-8 py-2 rounded-lg text-xs border border-gray-200 focus:bg-white focus:outline-none focus:border-[#9f224e] focus:ring-1 focus:ring-[#9f224e] transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Reset pill if any filter active */}
      {hasActiveFilter && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-red-700 text-[11px] truncate font-medium">
            Đang lọc: {selectedTeam || (selectedLeagueId ? "Giải đấu" : "") || selectedCountry || searchQuery}
          </span>
          <button
            onClick={clearAllFilters}
            className="text-red-800 hover:text-red-950 font-bold ml-2 underline text-[11px]"
          >
            Xóa lọc
          </button>
        </div>
      )}

      {/* SECTION 1: GIẢI ĐẤU */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 px-1 py-1">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Trophy className="w-3.5 h-3.5 text-[#9f224e]" />
            Giải đấu
          </span>
          <span className="text-[10px] text-gray-400 font-mono font-normal">
            {displayedCompetitions.length}/{SIDEBAR_COMPETITIONS.length}
          </span>
        </div>

        <div className="space-y-0.5">
          {displayedCompetitions.map((comp) => {
            const isSelected = selectedLeagueId === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => handleSelectLeague(comp.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition text-xs ${
                  isSelected
                    ? 'bg-[#9f224e] text-white font-bold shadow-xs'
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-950'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-5 h-5 object-contain flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="truncate">
                    <span className="block truncate font-medium">{comp.name}</span>
                    <span className={`text-[10px] block ${isSelected ? 'text-rose-100' : 'text-gray-400'}`}>
                      {formatCountryVN(comp.country)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Nút Xem thêm / Thu gọn Giải đấu */}
        {SIDEBAR_COMPETITIONS.length > 10 && (
          <button
            onClick={() => setShowAllLeagues(!showAllLeagues)}
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-1 rounded-lg text-xs font-semibold text-[#9f224e] hover:bg-rose-50 transition border border-rose-100"
          >
            {showAllLeagues ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Thu gọn danh sách giải</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Xem thêm ({SIDEBAR_COMPETITIONS.length - 10} giải khác)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* SECTION 2: ĐỘI BÓNG */}
      <div className="space-y-1 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 px-1 py-1">
          <span className="flex items-center gap-1.5 text-gray-800">
            <Shield className="w-3.5 h-3.5 text-[#9f224e]" />
            Đội bóng
          </span>
          <span className="text-[10px] text-gray-400 font-mono font-normal">
            {displayedTeams.length}/{SIDEBAR_TEAMS.length}
          </span>
        </div>

        <div className="space-y-0.5">
          {displayedTeams.map((team) => {
            const isSelected = selectedTeam === team.name;
            return (
              <button
                key={team.name}
                onClick={() => handleSelectTeam(team.name)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition text-xs ${
                  isSelected
                    ? 'bg-[#9f224e] text-white font-bold shadow-xs'
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-950'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-5 h-5 object-contain flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="truncate">
                    <span className="block truncate font-medium">{team.name}</span>
                    <span className={`text-[10px] block ${isSelected ? 'text-rose-100' : 'text-gray-400'}`}>
                      {formatCountryVN(team.country)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Nút Xem thêm / Thu gọn Đội bóng */}
        {SIDEBAR_TEAMS.length > 6 && (
          <button
            onClick={() => setShowAllTeams(!showAllTeams)}
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-1 rounded-lg text-xs font-semibold text-[#9f224e] hover:bg-rose-50 transition border border-rose-100"
          >
            {showAllTeams ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Thu gọn danh sách đội</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Xem thêm ({SIDEBAR_TEAMS.length - 6} đội khác)</span>
              </>
            )}
          </button>
        )}
      </div>
    </aside>
  );
};
