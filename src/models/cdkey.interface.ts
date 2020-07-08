export interface CDKey {
  ID: string,
  player?: string, // the player who holds the cdkey (not necessarily activated)
  game: string,
  value: string,
  isActivated: boolean,
  price?: number,
  platform?: string,
}

export interface DetailedCDKey extends CDKey {
  gameName: string,
  playerName?: string,
}