import { Player } from "../models/player.interface";
import { useQuery, gql } from "@apollo/client";

interface FieldSwitch {
  [index: string]: boolean
}

export const usePlayerList = (conditions: any = {}, fieldSwitch: FieldSwitch = {}, options: any = {}) => {

  const mainFieldSwitch: FieldSwitch = {
    id: true,
    dbname: true,
    name: true,
    bio: true,
    isPremium: true,
    games: true,
    ...fieldSwitch,
  }

  const fieldToken: string[] = [];

  for (let key in mainFieldSwitch) {
    if (mainFieldSwitch[key]) {
      fieldToken.push(key);
    }
  }

  let queryToken = `
    query getPlayers($condition: String, $options: String) {
      players: players(condition: $condition, options: $options) {
        ${fieldToken.join(",")}
      }
    }
  `;

  queryToken.replace(/\s/, "");

  const queryVariables: any = {
    condition: conditions,
    options: {
      includes: fieldToken,
      ...options
    },
  };

  for (let key in queryVariables) {
    JSON.stringify(queryVariables[key]);
  }

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{players: Player[]}>(
    gql(queryToken),
    {
      variables: queryVariables
    }
  );

  if (queryError) {
    console.error(queryError);
  }

  const players = (data? data.players: undefined);

  return {
    isQueryLoading,
    queryError,
    players,
  }

};