export type MatchStatusShort = 
  | 'NS'        // Not Started
  | 'COUNTDOWN' // <15 mins to kickoff
  | '1H'        // First Half
  | 'HT'        // Halftime
  | '2H'        // Second Half
  | 'ET'        // Extra Time
  | 'PEN'       // Penalty Shootout
  | 'FT'        // Full Time
  | 'AET'       // After Extra Time
  | 'POSTP'     // Postponed
  | 'CANC';     // Cancelled

export interface MatchPeriod {
  first: number | null;
  second: number | null;
}

export interface MatchVenue {
  id: number | null;
  name: string;
  city: string;
}

export interface MatchStatus {
  long: string;
  short: MatchStatusShort;
  elapsed: number | null;
  extra: number | null;
}

export interface MatchFixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string; // ISO UTC format
  timestamp: number;
  periods: MatchPeriod;
  venue: MatchVenue;
  status: MatchStatus;
}

export interface MatchLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
  standings: boolean;
  tier: 1 | 2 | 3 | 4;
  vietnameseName: string;
}

export interface MatchTeam {
  id: number;
  name: string;
  shortName?: string;
  logo: string;
  winner: boolean | null;
}

export interface MatchGoals {
  home: number | null;
  away: number | null;
}

export interface MatchScoreDetails {
  home: number | null;
  away: number | null;
}

export interface MatchScore {
  halftime: MatchScoreDetails;
  fulltime: MatchScoreDetails;
  extratime: MatchScoreDetails;
  penalty: MatchScoreDetails;
}

export interface MatchEvent {
  time: {
    elapsed: number;
    extra?: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: string;
  };
  assist?: {
    id: number | null;
    name: string | null;
  } | null;
  type: 'Goal' | 'Card' | 'subst';
  detail: 'Normal Goal' | 'Penalty' | 'Own Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
  comments?: string;
}

export interface MatchStatistic {
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  cornersHome: number;
  cornersAway: number;
  foulsHome: number;
  foulsAway: number;
  xGHome?: number;
  xGAway?: number;
}

export interface MatchOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  overUnder: number;
  prediction: string;
}

export interface BroadcasterInfo {
  name: string;
  badgeColor?: string;
  isExclusive?: boolean;
}

export interface FixtureItem {
  fixture: MatchFixture;
  league: MatchLeague;
  teams: {
    home: MatchTeam;
    away: MatchTeam;
  };
  goals: MatchGoals;
  score: MatchScore;
  
  // Broadcasters
  broadcasters?: BroadcasterInfo[];

  // Editorial coverage flags (as requested)
  has_preview?: boolean;     // Has "Nhận định & Phong độ" article
  has_recap?: boolean;       // Has "Tường thuật & Thống kê" article
  has_highlight?: boolean;   // Has "Video highlight"

  is_hot?: boolean;
  highlight_video_url?: string;
  highlight_duration?: string;
  recap_summary?: string;
  previewText?: string;
  events?: MatchEvent[];
  statistics?: MatchStatistic;
  odds?: MatchOdds;
}

export interface StandingTeam {
  rank: number;
  team: MatchTeam;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface ArticleItem {
  id: string;
  leagueId: number;
  title: string;
  summary: string;
  image: string;
  publishedAt: string;
  category: string;
  author?: string;
  commentCount?: number;
  isHot?: boolean;
}

export interface PlayerItem {
  id: number;
  name: string;
  number: number;
  position: 'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker' | 'Forward' | string;
  nationality?: string;
  flag?: string;
  age: number;
  photo: string;
  appearances?: number;
  goals?: number;
  assists?: number;
  marketValue?: string;
}

export interface TeamProfile {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  fullName: string;
  logo: string;
  country: string;
  leagueId: number;
  leagueName: string;
  stadium: string;
  capacity: number;
  coach: string;
  founded: number;
  president?: string;
  marketValue?: string;
  mainCompetitions: string[];
  rank: number;
  points: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  form: ('W' | 'D' | 'L')[];
  topScorers: {
    name: string;
    photo: string;
    goals: number;
    assists: number;
    rank: number;
  }[];
  squad: PlayerItem[];
  recentVideos: {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    date: string;
    views: string;
  }[];
  news: ArticleItem[];
}

export interface LeagueDetails {
  id: number;
  slug: string;
  name: string;
  vietnameseName: string;
  country: string;
  logo: string;
  flag: string;
  season: string;
  standings: StandingTeam[];
}
