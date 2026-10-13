import { FixtureItem, StandingTeam } from '../types/football';
import realPremierLeagueData from '../data/realPremierLeagueFixtures.json';
import realPremierLeagueStandings from '../data/realPremierLeagueStandings.json';

const VNEXPRESS_PL_URL = 'https://gw.vnexpress.net/football/fixture?league_id=39';
const PROXIED_PL_URL = '/api/vnexpress/football/fixture?league_id=39';

const BIG_TEAMS = [42, 33, 50, 40, 49, 47, 34]; // Arsenal, Man Utd, Man City, Liverpool, Chelsea, Tottenham, Newcastle

export function transformVnExpressFixture(raw: any): FixtureItem {
  let venueName = 'Sân vận động';
  let venueCity = 'Anh';
  if (raw.venue) {
    const parts = raw.venue.split(',');
    venueName = parts[0].trim();
    if (parts.length > 1) venueCity = parts.slice(1).join(',').trim();
  }

  let htHome: number | null = null;
  let htAway: number | null = null;
  if (raw.score && raw.score.halftime) {
    const p = raw.score.halftime.split('-');
    if (p.length === 2) {
      htHome = parseInt(p[0], 10);
      htAway = parseInt(p[1], 10);
    }
  }

  let ftHome: number | null = null;
  let ftAway: number | null = null;
  if (raw.score && raw.score.fulltime) {
    const p = raw.score.fulltime.split('-');
    if (p.length === 2) {
      ftHome = parseInt(p[0], 10);
      ftAway = parseInt(p[1], 10);
    }
  }

  const isFinished = raw.status_short === 'FT' || raw.status_short === 'AET' || raw.status === 'Match Finished' || (raw.status_short === 'PEN' && raw.status === 'Match Finished');
  const isLive = !isFinished && ['1H', '2H', 'HT', 'ET', 'LIVE'].includes(raw.status_short);
  
  const homeGoals = isFinished || isLive ? raw.goals_home_team : null;
  const awayGoals = isFinished || isLive ? raw.goals_away_team : null;

  let winnerHome: boolean | null = null;
  let winnerAway: boolean | null = null;
  if (isFinished && homeGoals !== null && awayGoals !== null) {
    winnerHome = homeGoals > awayGoals ? true : homeGoals < awayGoals ? false : null;
    winnerAway = awayGoals > homeGoals ? true : awayGoals < homeGoals ? false : null;
  }

  const isHot = BIG_TEAMS.includes(raw.home_team.team_id) || BIG_TEAMS.includes(raw.away_team.team_id);

  return {
    fixture: {
      id: raw.fixture_id,
      referee: raw.referee || null,
      timezone: 'UTC',
      date: raw.event_date,
      timestamp: raw.event_timestamp,
      periods: {
        first: raw.first_half_start || null,
        second: raw.second_half_start || null
      },
      venue: {
        id: null,
        name: venueName,
        city: venueCity
      },
      status: {
        long: raw.status || 'Not Started',
        short: raw.status_short || 'NS',
        elapsed: raw.elapsed || null,
        extra: null
      }
    },
    league: {
      id: 39,
      name: raw.league.name || 'Premier League',
      country: 'England',
      logo: raw.league.logo || raw.league.logo_original || 'https://is.vnecdn.net/objects/leagues/39.png?v=1',
      flag: raw.league.flag || raw.league.flag_original || 'https://is.vnecdn.net/objects/flags/gb-eng.svg?v=1',
      season: 2026,
      round: raw.round || `Vòng ${raw.round_int}`,
      standings: true,
      tier: 1,
      vietnameseName: 'Ngoại hạng Anh'
    },
    teams: {
      home: {
        id: raw.home_team.team_id,
        name: raw.home_team.team_name,
        shortName: raw.home_team.team_name_full || raw.home_team.team_name,
        logo: raw.home_team.logo,
        winner: winnerHome
      },
      away: {
        id: raw.away_team.team_id,
        name: raw.away_team.team_name,
        shortName: raw.away_team.team_name_full || raw.away_team.team_name,
        logo: raw.away_team.logo,
        winner: winnerAway
      }
    },
    goals: {
      home: homeGoals,
      away: awayGoals
    },
    score: {
      halftime: { home: htHome, away: htAway },
      fulltime: { home: ftHome, away: ftAway },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    },
    is_hot: isHot,
    has_preview: !isFinished,
    has_recap: isFinished,
    has_highlight: isFinished
  };
}

export function getInitialPremierLeagueFixtures(): FixtureItem[] {
  return realPremierLeagueData as unknown as FixtureItem[];
}

export function getInitialPremierLeagueStandings(): StandingTeam[] {
  return realPremierLeagueStandings as unknown as StandingTeam[];
}

export async function fetchRealPremierLeagueFixtures(): Promise<FixtureItem[]> {
  // Try proxy first (no CORS issues in browser)
  try {
    const res = await fetch(PROXIED_PL_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['39'] && Array.isArray(json.data['39'].data)) {
        return json.data['39'].data.map(transformVnExpressFixture);
      }
    }
  } catch {
    // Proxy failed, try direct URL
  }

  try {
    const res = await fetch(VNEXPRESS_PL_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data['39'] && Array.isArray(json.data['39'].data)) {
        return json.data['39'].data.map(transformVnExpressFixture);
      }
    }
  } catch {
    // Direct failed (e.g. CORS)
  }

  // Fallback to embedded real data
  return getInitialPremierLeagueFixtures();
}
