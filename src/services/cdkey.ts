import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/client';
import { CDKey } from '../models/cdkey.interface';

const GET_CDKEY = loader("./cdkeyGraph/getSingle.graphql");
const GET_CDKEYS = loader("./cdkeyGraph/getList.graphql");


const ADD_CDKEY = loader("./cdkeyGraph/addSingle.graphql");
const UPDATE_CDKEY = loader("./cdkeyGraph/updateSingle.graphql");
const DELETE_CDKEY = loader("./cdkeyGraph/deleteSingle.graphql");

export const useCDKeyDetail = (dbname: string, options: any = {}) => {

  const queryVariables: any = {
    dbname: dbname,
    options: options,
  };

  queryVariables.options = JSON.stringify(queryVariables.options);

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{cdkey: CDKey}>(
    GET_CDKEY,
    {
      variables: queryVariables
    }
  );

  if (queryError) {
    console.error(queryError);
  }

  const cdkey = (data? data.cdkey: undefined);

  return {
    isQueryLoading,
    queryError,
    cdkey,
  }


};

export const useCDKeyList = (condition: any = {}, options: any = {}) => {

  const { loading: isQueryLoading, error: queryError, data } = useQuery<{cdkeys: CDKey[]}>(
    GET_CDKEYS,
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

  const cdkeys = (data? data.cdkeys: undefined);
  
  return {
    isQueryLoading,
    queryError,
    cdkeys,
  }

};

export const useCDKeyAddition = (newCDKey: CDKey) => {

  return useMutation(
    ADD_CDKEY,
  );

}

export const useCDKeyUpdate = (updatedCDKey?: CDKey) => {

  return useMutation(
    UPDATE_CDKEY,
  );

}

export const useCDKeyDeletion = (dbname?: string) => {

  return useMutation(
    DELETE_CDKEY,
  );

}