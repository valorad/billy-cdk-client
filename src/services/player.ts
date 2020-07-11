import { Player } from "../models/player.interface";
import { useQuery, gql } from "@apollo/client";

interface FieldSwitch {
  [index: string]: boolean
}

const fieldSwitch0: FieldSwitch = {
  id: true,
  dbname: true,
  name: true,
  bio: false,
  isPremium: true,
  games: false,
}

const buildIncludedFields = (fieldSwitch: FieldSwitch) => {
  const includedFields: string[] = [];
  const mainFieldSwitch: FieldSwitch = {
    ...fieldSwitch0,
    ...fieldSwitch,
  }
  for (let key in mainFieldSwitch) {
    if (mainFieldSwitch[key]) {
      includedFields.push(key);
    }
  }
  return includedFields;
};

export const usePlayerList = (conditions: any = {}, fieldSwitch: FieldSwitch = {}, options: any = {}) => {

  // const mainFieldSwitch: FieldSwitch = {
  //   ...fieldSwitch0,
  //   ...fieldSwitch,
  // }

  // const fieldToken: string[] = [];

  // for (let key in mainFieldSwitch) {
  //   if (mainFieldSwitch[key]) {
  //     fieldToken.push(key);
  //   }
  // }

  const includedFields = buildIncludedFields(fieldSwitch);

  let queryToken = `
    query getPlayers($condition: String, $options: String) {
      players: players(condition: $condition, options: $options) {
        ${includedFields.join(",")}
      }
    }
  `;

  queryToken = queryToken.replace(/\s/, "");

  const queryVariables: any = {
    condition: conditions,
    options: {
      includes: includedFields,
      ...options
    },
  };

  queryVariables.condition = JSON.stringify(queryVariables.condition);
  queryVariables.options = JSON.stringify(queryVariables.options);

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

export const usePlayerDetail = (dbname: string, fieldSwitch: FieldSwitch = {}, options: any = {}) => {
  const includedFields = buildIncludedFields(fieldSwitch);
  let queryToken = `
    query getPlayer($dbname: String!, $options: String) {
      player: player(dbname: $dbname, options: $options) {
        ${includedFields.join(",")}
      }
    }
  `;

  queryToken = queryToken.replace(/\s/, "");

  const queryVariables: any = {
    dbname: dbname,
    options: {
      includes: includedFields,
      ...options
    },
  };

  queryVariables.options = JSON.stringify(queryVariables.options);

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{player: Player}>(
    gql(queryToken),
    {
      variables: queryVariables
    }
  );

  if (queryError) {
    console.error(queryError);
  }

  const player = (data? data.player: undefined);

  return {
    isQueryLoading,
    queryError,
    player,
  }


};