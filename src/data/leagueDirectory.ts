import { LeagueDetails, StandingTeam } from '../types/football';
import realPremierLeagueStandings from './realPremierLeagueStandings.json';
import realChampionsLeagueStandings from './realChampionsLeagueStandings.json';
import realEuropaLeagueStandings from './realEuropaLeagueStandings.json';
import realLaLigaStandings from './realLaLigaStandings.json';
import realVLeagueStandings from './realVLeagueStandings.json';
import realSerieAStandings from './realSerieAStandings.json';
import realBundesligaStandings from './realBundesligaStandings.json';
import realLigue1Standings from './realLigue1Standings.json';
import realSaudiStandings from './realSaudiStandings.json';
import realMlsStandings from './realMlsStandings.json';

export const LEAGUE_DIRECTORY: LeagueDetails[] = [
  {
    id: 39,
    slug: 'ngoai-hang-anh',
    name: 'Premier League',
    vietnameseName: 'Ngoại Hạng Anh',
    country: 'Anh',
    logo: 'https://is.vnecdn.net/objects/leagues/39.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1',
    season: '2026/27',
    standings: realPremierLeagueStandings as StandingTeam[]
  },
  {
    id: 340,
    slug: 'v-league',
    name: 'V-League',
    vietnameseName: 'V-League',
    country: 'Việt Nam',
    logo: 'https://is.vnecdn.net/objects/leagues/340.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/vn.svg?v=1',
    season: '2026/27',
    standings: realVLeagueStandings as StandingTeam[]
  },
  {
    id: 140,
    slug: 'la-liga',
    name: 'LaLiga',
    vietnameseName: 'La Liga',
    country: 'Tây Ban Nha',
    logo: 'https://is.vnecdn.net/objects/leagues/140.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/es.svg?v=1',
    season: '2026/27',
    standings: realLaLigaStandings as StandingTeam[]
  },
  {
    id: 2,
    slug: 'cup-c1',
    name: 'Champions League',
    vietnameseName: 'Cúp C1 Châu Âu',
    country: 'Châu Âu',
    logo: 'https://is.vnecdn.net/objects/leagues/2.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/eu.svg?v=1',
    season: '2026/27',
    standings: realChampionsLeagueStandings as StandingTeam[]
  },
  {
    id: 3,
    slug: 'cup-c2',
    name: 'UEFA Europa League',
    vietnameseName: 'Cúp C2 Châu Âu',
    country: 'Châu Âu',
    logo: 'https://is.vnecdn.net/objects/leagues/3.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/eu.svg?v=1',
    season: '2026/27',
    standings: realEuropaLeagueStandings as StandingTeam[]
  },
  {
    id: 135,
    slug: 'serie-a',
    name: 'Serie A',
    vietnameseName: 'Serie A',
    country: 'Italy',
    logo: 'https://is.vnecdn.net/objects/leagues/135.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/it.svg?v=1',
    season: '2026/27',
    standings: realSerieAStandings as StandingTeam[]
  },
  {
    id: 78,
    slug: 'bundesliga',
    name: 'Bundesliga',
    vietnameseName: 'Bundesliga',
    country: 'Đức',
    logo: 'https://is.vnecdn.net/objects/leagues/78.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/de.svg?v=1',
    season: '2026/27',
    standings: realBundesligaStandings as StandingTeam[]
  },
  {
    id: 61,
    slug: 'ligue-1',
    name: 'Ligue 1',
    vietnameseName: 'Ligue 1',
    country: 'Pháp',
    logo: 'https://is.vnecdn.net/objects/leagues/61.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/fr.svg?v=1',
    season: '2026/27',
    standings: realLigue1Standings as StandingTeam[]
  },
  {
    id: 307,
    slug: 'saudi-pro-league',
    name: 'Saudi Pro League',
    vietnameseName: 'Saudi Pro League',
    country: 'Ả Rập Xê Út',
    logo: 'https://is.vnecdn.net/objects/leagues/307.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/sa.svg?v=1',
    season: '2026/27',
    standings: realSaudiStandings as StandingTeam[]
  },
  {
    id: 253,
    slug: 'mls',
    name: 'Major League Soccer',
    vietnameseName: 'Nhà nghề Mỹ (MLS)',
    country: 'Mỹ',
    logo: 'https://is.vnecdn.net/objects/leagues/253.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/us.svg?v=1',
    season: '2026',
    standings: realMlsStandings as StandingTeam[]
  },
  {
    id: 45,
    slug: 'fa-cup',
    name: 'FA Cup',
    vietnameseName: 'Cúp FA',
    country: 'Anh',
    logo: 'https://is.vnecdn.net/objects/leagues/45.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1',
    season: '2026/27',
    standings: []
  },
  {
    id: 48,
    slug: 'carabao-cup',
    name: 'Carabao Cup',
    vietnameseName: 'Cúp Liên Đoàn Anh',
    country: 'Anh',
    logo: 'https://is.vnecdn.net/objects/leagues/48.png?v=1',
    flag: 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1',
    season: '2026/27',
    standings: []
  }
];

export function getLeagueBySlug(slug: string): LeagueDetails | undefined {
  const normalized = slug.toLowerCase().trim();
  if (normalized === '382') return LEAGUE_DIRECTORY.find((l) => l.id === 340);
  if (normalized === 'cup-c2' || normalized === 'c2' || normalized === 'europa' || normalized === 'europa-league' || normalized === '3') {
    return LEAGUE_DIRECTORY.find((l) => l.id === 3);
  }
  if (normalized === 'saudi' || normalized === 'saudi-pro-league' || normalized === '307') {
    return LEAGUE_DIRECTORY.find((l) => l.id === 307);
  }
  if (normalized === 'mls' || normalized === '253') {
    return LEAGUE_DIRECTORY.find((l) => l.id === 253);
  }
  if (normalized === 'fa-cup' || normalized === 'cup-fa' || normalized === '45') {
    return LEAGUE_DIRECTORY.find((l) => l.id === 45);
  }
  if (normalized === 'carabao-cup' || normalized === 'carabao' || normalized === 'league-cup' || normalized === '48') {
    return LEAGUE_DIRECTORY.find((l) => l.id === 48);
  }
  return LEAGUE_DIRECTORY.find(
    (l) => l.slug.toLowerCase() === normalized || l.id.toString() === normalized
  );
}

export function getLeagueById(id: number): LeagueDetails | undefined {
  if (id === 382) return LEAGUE_DIRECTORY.find((l) => l.id === 340);
  return LEAGUE_DIRECTORY.find((l) => l.id === id);
}

export function getLeagueSlug(id: number): string {
  const found = getLeagueById(id);
  return found ? found.slug : `league-${id}`;
}

export function parseLeagueFromPath(pathname: string, search: string): number | null {
  // Check pathname: /giai-dau/:slug or /league/:slug
  const match = pathname.match(/^\/(?:giai-dau|league)\/([^/?#]+)/i);
  if (match && match[1]) {
    const slug = match[1];
    const found = getLeagueBySlug(slug);
    if (found) return found.id;
    const numId = parseInt(slug, 10);
    if (!isNaN(numId)) return numId;
  }

  // Fallback to URL search param: ?league=...
  const params = new URLSearchParams(search);
  const leagueParam = params.get('league') || params.get('giai-dau');
  if (leagueParam) {
    const found = getLeagueBySlug(leagueParam);
    if (found) return found.id;
    const numId = parseInt(leagueParam, 10);
    if (!isNaN(numId)) return numId;
  }

  return null;
}
