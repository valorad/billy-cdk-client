import { loader } from 'graphql.macro';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Game } from '../models/game.interface';
import { DBViewOption } from '../models/dbViewOption.interface';

const GET_GAME = loader("./gameGraph/getSingle.graphql");
const GET_GAMES = loader("./gameGraph/getList.graphql");


const ADD_GAME = loader("./gameGraph/addSingle.graphql");
const UPDATE_GAME = loader("./gameGraph/updateSingle.graphql");
const DELETE_GAME = loader("./gameGraph/deleteSingle.graphql");

export const useGameDetail = (dbname: string, options: DBViewOption = {}) => {

  const queryVariables: any = {
    dbname: dbname,
    options: options,
  };

  queryVariables.options = JSON.stringify(queryVariables.options);

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{game: Game}>(
    GET_GAME,
    {
      variables: queryVariables
    }
  );

  if (queryError) {
    console.error(queryError);
  }

  const game = (data? data.game: undefined);

  return {
    isQueryLoading,
    queryError,
    game,
  }


};

export const useLazyGameDetail = () => {

  // const queryVariables: any = {
  //   dbname: dbname,
  //   options: options,
  // };

  // queryVariables.options = JSON.stringify(queryVariables.options);

  const [getGameDetail, { loading: isQueryLoading, error: queryError, data  }] = useLazyQuery<{game: Game}>(
    GET_GAME
  );

  if (queryError) {
    console.error(queryError);
  }

  return {
    isQueryLoading,
    queryError,
    data,
    getGameDetail,
  }


};

export const useGameList = (condition: any = {}, options: any = {}) => {

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{games: Game[]}>(
    GET_GAMES,
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

  const games = (data? data.games: undefined);
  
  return {
    isQueryLoading,
    queryError,
    games,
  }

};

export const useGameAddition = (newGame: Game) => {

  return useMutation(
    ADD_GAME,
  );

}

export const useGameUpdate = (updatedGame?: Game) => {

  return useMutation(
    UPDATE_GAME,
  );

}

export const useGameDeletion = (dbname?: string) => {

  return useMutation(
    DELETE_GAME,
  );

}