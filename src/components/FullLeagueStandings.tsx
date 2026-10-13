import React from 'react';
import { Trophy, ChevronRight, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { LeagueDetails } from '../types/football';

interface FullLeagueStandingsProps {
  league: LeagueDetails;
  onSelectTeam?: (teamName: string) => void;
  onBackToHotLeagues?: () => void;
  onCloseDrawer?: () => void;
}

export const FullLeagueStandings: React.FC<FullLeagueStandingsProps> = ({
  league,
  onSelectTeam,
  onBackToHotLeagues,
  onCloseDrawer
}) => {
  const standings = league.standings || [];

  return (
    <aside className="w-full space-y-3.5">
      {/* Title Widget Header */}
      <div className="flex items-center justify-between pb-1 border-b border-gray-200">
        <div className="flex items-center gap-2 truncate">
          <Trophy className="w-4 h-4 text-[#9f224e] flex-shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 truncate">
            BXH {league.vietnameseName}
          </h2>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onCloseDrawer && (
            <button
              onClick={onCloseDrawer}
              className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Full Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        {/* Table Top Banner */}
        <div className="bg-[#f8f9fa] px-3 py-2 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <img
              src={league.logo}
              alt={league.name}
              className="w-4 h-4 object-contain flex-shrink-0"
              loading="lazy"
            />
            <span className="text-xs font-bold text-gray-900 truncate">
              {league.vietnameseName}
            </span>
          </div>

          <span className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono font-bold border border-rose-200">
            Mùa {league.season}
          </span>
        </div>

        {/* Scrollable / Responsive Standings Table */}
        <div className="px-2 py-1.5 overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200 font-semibold text-[10px]">
                <th className="py-1.5 pl-1 w-5 text-center">#</th>
                <th className="py-1.5 px-1">CLB</th>
                <th className="py-1.5 px-1 text-center w-6" title="Số trận đã đá">Tr</th>
                <th className="py-1.5 px-1 text-center w-7" title="Hiệu số bàn thắng">HS</th>
                <th className="py-1.5 pr-1 text-right w-7 font-bold text-gray-700" title="Điểm số">Đ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {standings.map((item) => {
                const isEpl = league.id === 39;
                const isTop1 = item.rank === 1;
                // EPL: Rank 1-5 Champions League, Rank 6 Europa League, Rank 18-20 Relegation
                const isChampionsLeague = isEpl ? item.rank <= 5 : item.rank <= 4;
                const isEuropaLeague = isEpl ? item.rank === 6 : item.rank === 5;
                const isRelegation = isEpl 
                  ? (item.rank >= 18 && item.rank <= 20)
                  : (standings.length >= 14 && item.rank > standings.length - 3);

                return (
                  <tr
                    key={item.team.name}
                    onClick={() => onSelectTeam && onSelectTeam(item.team.name)}
                    className="hover:bg-gray-50 cursor-pointer transition group"
                  >
                    {/* Rank */}
                    <td className="py-1.5 pl-1 text-center">
                      <span
                        className={`w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px] font-bold ${
                          isTop1
                            ? 'bg-amber-400 text-amber-950 font-black'
                            : isChampionsLeague
                            ? 'bg-blue-600 text-white'
                            : isEuropaLeague
                            ? 'bg-amber-600 text-white'
                            : isRelegation
                            ? 'bg-red-500 text-white'
                            : 'text-gray-500'
                        }`}
                        title={
                          isEpl
                            ? (item.rank <= 5 ? 'Dự Champions League' : item.rank === 6 ? 'Dự Europa League' : item.rank >= 18 ? 'Xuống hạng' : '')
                            : ''
                        }
                      >
                        {item.rank}
                      </span>
                    </td>

                    {/* Team */}
                    <td className="py-1.5 px-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <img
                          src={item.team.logo}
                          alt={item.team.name}
                          className="w-3.5 h-3.5 object-contain flex-shrink-0"
                          loading="lazy"
                        />
                        <span className="truncate text-gray-800 font-medium group-hover:text-[#9f224e] max-w-[105px]">
                          {item.team.name}
                        </span>
                      </div>
                    </td>

                    {/* Played */}
                    <td className="py-1.5 px-1 text-center text-gray-600 font-mono">
                      {item.played}
                    </td>

                    {/* Goal difference */}
                    <td className="py-1.5 px-1 text-center font-mono text-gray-600 text-[10px]">
                      {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                    </td>

                    {/* Points */}
                    <td className="py-1.5 pr-1 text-right font-black text-[#9f224e] font-mono">
                      {item.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="px-3 py-2 bg-[#fafafa] border-t border-gray-200 text-[10px] text-gray-500 flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            {league.id === 39 ? (
              <>
                <span className="flex items-center gap-1" title="Thứ 1 đến thứ 5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> 1-5: Cúp C1
                </span>
                <span className="flex items-center gap-1" title="Thứ 6">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span> 6: Cúp C2
                </span>
                <span className="flex items-center gap-1" title="Thứ 18, 19, 20">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> 18-20: Xuống hạng
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Cúp C1
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Xuống hạng
                </span>
              </>
            )}
          </div>

          {onBackToHotLeagues && (
            <button
              onClick={onBackToHotLeagues}
              className="text-[#9f224e] hover:text-[#831b40] font-semibold flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Bảng xếp hạng</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
