import React, { useState } from 'react';
import { Trophy, ChevronRight, ArrowUpRight, Award, Shield, X } from 'lucide-react';
import { StandingTeam } from '../types/football';
import realPremierLeagueStandings from '../data/realPremierLeagueStandings.json';
import realLaLigaStandings from '../data/realLaLigaStandings.json';
import realVLeagueStandings from '../data/realVLeagueStandings.json';
import realSerieAStandings from '../data/realSerieAStandings.json';
import realBundesligaStandings from '../data/realBundesligaStandings.json';
import realEuropaLeagueStandings from '../data/realEuropaLeagueStandings.json';
import realLigue1Standings from '../data/realLigue1Standings.json';
import realSaudiStandings from '../data/realSaudiStandings.json';
import realMlsStandings from '../data/realMlsStandings.json';

export interface HotLeagueSummary {
  id: number;
  name: string;
  vietnameseName: string;
  country: string;
  logo: string;
  flag: string;
  season: string;
  teams: StandingTeam[];
}

export const HOT_LEAGUES_DATA: HotLeagueSummary[] = [
  {
    id: 39,
    name: "Premier League",
    vietnameseName: "Ngoại Hạng Anh",
    country: "Anh",
    logo: "https://is.vnecdn.net/objects/leagues/39.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1",
    season: "2026/27",
    teams: realPremierLeagueStandings as StandingTeam[]
  },
  {
    id: 340,
    name: "V-League",
    vietnameseName: "V-League",
    country: "Việt Nam",
    logo: "https://is.vnecdn.net/objects/leagues/340.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/vn.svg?v=1",
    season: "2026/27",
    teams: realVLeagueStandings as StandingTeam[]
  },
  {
    id: 140,
    name: "LaLiga",
    vietnameseName: "La Liga",
    country: "Tây Ban Nha",
    logo: "https://is.vnecdn.net/objects/leagues/140.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/es.svg?v=1",
    season: "2026/27",
    teams: realLaLigaStandings as StandingTeam[]
  },
  {
    id: 135,
    name: "Serie A",
    vietnameseName: "Serie A",
    country: "Italy",
    logo: "https://is.vnecdn.net/objects/leagues/135.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/it.svg?v=1",
    season: "2026/27",
    teams: realSerieAStandings as StandingTeam[]
  },
  {
    id: 78,
    name: "Bundesliga",
    vietnameseName: "Bundesliga",
    country: "Đức",
    logo: "https://is.vnecdn.net/objects/leagues/78.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/de.svg?v=1",
    season: "2026/27",
    teams: realBundesligaStandings as StandingTeam[]
  },
  {
    id: 61,
    name: "Ligue 1",
    vietnameseName: "Ligue 1",
    country: "Pháp",
    logo: "https://is.vnecdn.net/objects/leagues/61.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/fr.svg?v=1",
    season: "2026/27",
    teams: realLigue1Standings as StandingTeam[]
  },
  {
    id: 307,
    name: "Saudi Pro League",
    vietnameseName: "Saudi Pro League",
    country: "Ả Rập Xê Út",
    logo: "https://is.vnecdn.net/objects/leagues/307.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/sa.svg?v=1",
    season: "2026/27",
    teams: realSaudiStandings as StandingTeam[]
  },
  {
    id: 253,
    name: "MLS",
    vietnameseName: "Nhà nghề Mỹ (MLS)",
    country: "Mỹ",
    logo: "https://is.vnecdn.net/objects/leagues/253.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/us.svg?v=1",
    season: "2026",
    teams: realMlsStandings as StandingTeam[]
  },
  {
    id: 3,
    name: "UEFA Europa League",
    vietnameseName: "Cúp C2 Châu Âu",
    country: "Châu Âu",
    logo: "https://is.vnecdn.net/objects/leagues/3.png?v=1",
    flag: "https://is.vnecdn.net/objects/flags/eu.svg?v=1",
    season: "2026/27",
    teams: realEuropaLeagueStandings as StandingTeam[]
  }
];

interface HotLeaguesSidebarProps {
  onViewLeague: (leagueId: number, leagueName: string) => void;
  onSelectTeam?: (teamName: string) => void;
  onCloseDrawer?: () => void;
}

export const HotLeaguesSidebar: React.FC<HotLeaguesSidebarProps> = ({
  onViewLeague,
  onSelectTeam,
  onCloseDrawer
}) => {
  return (
    <aside className="w-full space-y-3.5">
      {/* Title Widget Header */}
      <div className="flex items-center justify-between pb-1 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#9f224e]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Bảng xếp hạng
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-medium">{HOT_LEAGUES_DATA.length} giải đấu</span>
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

      {/* 5 Hot League Mini Tables */}
      <div className="space-y-3">
        {HOT_LEAGUES_DATA.map((league) => (
          <div
            key={league.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:border-gray-300 transition"
          >
            {/* League Header */}
            <div className="bg-[#f8f9fa] px-3 py-2 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <img
                  src={league.logo}
                  alt={league.name}
                  className="w-4 h-4 object-contain flex-shrink-0"
                  loading="lazy"
                />
                <div className="truncate">
                  <span className="text-xs font-bold text-gray-900 block truncate leading-tight">
                    {league.vietnameseName}
                  </span>
                </div>
              </div>

              <span className="text-[10px] text-gray-600 font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 shadow-2xs">
                {league.season}
              </span>
            </div>

            {/* Compact Standings Table */}
            <div className="px-2 py-1.5">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200 font-semibold text-[10px]">
                    <th className="py-1 pl-1 w-5 text-center">#</th>
                    <th className="py-1 px-1">CLB</th>
                    <th className="py-1 px-1 text-center w-6" title="Số trận đã đá">Tr</th>
                    <th className="py-1 px-1 text-center w-7" title="Hiệu số bàn thắng">HS</th>
                    <th className="py-1 pr-1 text-right w-7 font-bold text-gray-700" title="Điểm số">Đ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {league.teams.slice(0, 5).map((item) => {
                    const isTop1 = item.rank === 1;
                    const isTop4 = item.rank <= 4;

                    return (
                      <tr
                        key={item.team.name}
                        onClick={() => onSelectTeam && onSelectTeam(item.team.name)}
                        className="hover:bg-gray-50 cursor-pointer transition"
                      >
                        {/* Rank */}
                        <td className="py-1 pl-1 text-center">
                          <span
                            className={`w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px] font-bold ${
                              isTop1
                                ? 'bg-amber-400 text-amber-950 font-black'
                                : isTop4
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-500'
                            }`}
                          >
                            {item.rank}
                          </span>
                        </td>

                        {/* Team name & logo */}
                        <td className="py-1 px-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <img
                              src={item.team.logo}
                              alt={item.team.name}
                              className="w-3.5 h-3.5 object-contain flex-shrink-0"
                              loading="lazy"
                            />
                            <span className="truncate text-gray-800 font-medium hover:text-[#9f224e] max-w-[95px]">
                              {item.team.name}
                            </span>
                          </div>
                        </td>

                        {/* Played */}
                        <td className="py-1 px-1 text-center text-gray-600 font-mono">
                          {item.played}
                        </td>

                        {/* Goal difference */}
                        <td className="py-1 px-1 text-center font-mono text-gray-600 text-[10px]">
                          {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                        </td>

                        {/* Points */}
                        <td className="py-1 pr-1 text-right font-black text-[#9f224e] font-mono">
                          {item.points}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Button "Xem chi tiết" */}
            <div className="px-2.5 py-1.5 bg-[#fafafa] border-t border-gray-200 flex items-center justify-end">
              <button
                onClick={() => onViewLeague(league.id, league.vietnameseName)}
                className="text-[11px] text-[#9f224e] hover:text-[#831b40] font-semibold flex items-center gap-1 transition group py-0.5"
              >
                <span>Xem chi tiết</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
