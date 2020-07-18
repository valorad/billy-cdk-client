import { loader } from 'graphql.macro';

import { Player } from "../models/player.interface";
import { useQuery, useMutation } from "@apollo/client";
import { DBViewOption } from '../models/dbViewOption.interface';

// interface FieldSwitch {
//   [index: string]: boolean
// }

const GET_PLAYER = loader("./playerGraph/getSingle.graphql");
const GET_PLAYERS = loader("./playerGraph/getList.graphql");


const ADD_PLAYER = loader("./playerGraph/addSingle.graphql");
const UPDATE_PLAYER = loader("./playerGraph/updateSingle.graphql");
const DELETE_PLAYER = loader("./playerGraph/deleteSingle.graphql");

export const usePlayerList = (condition: any = {}, options: DBViewOption = {}) => {

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
    // {
    //   update: (cache, response) => {
    //     const message = response.data.addPlayer as CUDMessage;
        
    //     if (!message.ok) {
    //       return;
    //     }

    //     // update local cache
    //     // variables are essential, don't forget them
    //     const cacheResponse = cache.readQuery<{players: Player[]}>({ query: GET_PLAYERS, variables: {condition: "{}", options: "{}"} });

    //     if (!cacheResponse) {
    //       return;
    //     }

    //     cache.writeQuery({
    //       query: GET_PLAYERS,
    //       variables: {condition: "{}", options: "{}"},
    //       data: { players: cacheResponse.players.concat(newPlayer)},
    //     });

    //   }
    // }

  )



}

export const usePlayerUpdate = (updatedPlayer?: Player) => {
  return useMutation(
    UPDATE_PLAYER,
    // {
    //   update: (cache, response) => {
    //     const message = response.data.updatePlayer as CUDMessage;
        
    //     if (!message.ok) {
    //       return;
    //     }

    //     if (!updatedPlayer) {
    //       return;
    //     }
  
    //     // update getSingle cache
  
    //     cache.writeQuery({
    //       query: UPDATE_PLAYER,
    //       variables: {
    //         dbname: updatedPlayer.dbname
    //       },
    //       data: { player: updatedPlayer },
    //     });
  
    //   }
    // }
  );
}

export const usePlayerDeletion = (dbname?: string) => {
  return useMutation(
    DELETE_PLAYER,
  )
}