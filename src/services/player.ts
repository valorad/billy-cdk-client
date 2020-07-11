import { loader } from 'graphql.macro';

import { Player } from "../models/player.interface";
import { useQuery, gql, useMutation } from "@apollo/client";
import { CUDMessage } from "../models/cudmessage.interface";

// interface FieldSwitch {
//   [index: string]: boolean
// }

const GET_PLAYER = loader("./playerGraph/getSingle.graphql");
const GET_PLAYERS = loader("./playerGraph/getList.graphql");


const ADD_PLAYER = loader("./playerGraph/addSingle.graphql");

// default queries
// const GET_PLAYERS = gql`
//   query getPlayers($condition: String, $options: String) {
//     players: players(condition: $condition, options: $options) {
//       dbname,name,games,isPremium
//     }
//   }
// `;

// const ADD_PLAYER = gql`
//   mutation addPlayer($newPlayer: PlayerView!) {
//     addPlayer(newPlayer: $newPlayer) {
//       ok, numAffected, message
//     }
//   }
// `;

// const fieldSwitch0: FieldSwitch = {
//   id: true,
//   dbname: true,
//   name: true,
//   bio: false,
//   isPremium: true,
//   games: false,
// }

// const buildIncludedFields = (fieldSwitch: FieldSwitch) => {
//   const includedFields: string[] = [];
//   const mainFieldSwitch: FieldSwitch = {
//     ...fieldSwitch0,
//     ...fieldSwitch,
//   }
//   for (let key in mainFieldSwitch) {
//     if (mainFieldSwitch[key]) {
//       includedFields.push(key);
//     }
//   }
//   return includedFields;
// };

export const usePlayerList = (condition: any = {}, options: any = {}) => {

  // const includedFields = buildIncludedFields(fieldSwitch);

  // let queryToken = `
  //   query getPlayers($condition: String, $options: String) {
  //     players: players(condition: $condition, options: $options) {
  //       ${includedFields.join(",")}
  //     }
  //   }
  // `;

  // queryToken = queryToken.replace(/\s/, "");

  // const queryVariables: any = {
  //   condition: conditions,
  //   options: options,
  // };

  // queryVariables.condition = JSON.stringify(queryVariables.condition);
  // queryVariables.options = JSON.stringify(queryVariables.options);

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{players: Player[]}>(
    GET_PLAYERS,
    {
      variables: {
        condition: JSON.stringify(condition),
        options: JSON.stringify(options),
      }
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

export const usePlayerDetail = (dbname: string, options: any = {}) => {
  // const includedFields = buildIncludedFields(fieldSwitch);
  // let queryToken = `
  //   query getPlayer($dbname: String!, $options: String) {
  //     player: player(dbname: $dbname, options: $options) {
  //       ${includedFields.join(",")}
  //     }
  //   }
  // `;

  // queryToken = queryToken.replace(/\s/, "");

  const queryVariables: any = {
    dbname: dbname,
    options: options,
  };

  queryVariables.options = JSON.stringify(queryVariables.options);

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{player: Player}>(
    GET_PLAYER,
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

export const usePlayerAddition = (newPlayer: Player) => {

  return useMutation(
    ADD_PLAYER,
    {
      update: (cache, response) => {
        const message = response.data.addPlayer as CUDMessage;
        
        if (!message.ok) {
          return;
        }

        // update local cache

        const cacheResponse = cache.readQuery<{players: Player[]}>({ query: GET_PLAYERS, variables: {condition: "{}", options: "{}"} });

        if (!cacheResponse) {
          return;
        }

        cache.writeQuery({
          query: GET_PLAYERS,
          variables: {condition: "{}", options: "{}"},
          data: { players: cacheResponse.players.concat(newPlayer)},
        });

      }
    }

  )



}