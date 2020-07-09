export interface Player {
  dbname: string,
  name?: string,
  bio?: string,
  isPremium: boolean,
  games: string[],
}