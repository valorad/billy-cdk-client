import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/client';
import { CDKey } from '../models/cdkey.interface';

const GET_CDKEY = loader("./cdkeyGraph/getSingle.graphql");
const GET_CDKEYS = loader("./cdkeyGraph/getList.graphql");


const ADD_CDKEY = loader("./cdkeyGraph/addSingle.graphql");
const UPDATE_CDKEY = loader("./cdkeyGraph/updateSingle.graphql");
const DELETE_CDKEY = loader("./cdkeyGraph/deleteSingle.graphql");

const ACTIVATE_CDKEY = loader("./cdkeyGraph/activate.graphql");

interface CDKeyQueryMethod {
  id?: string,
  value?: string,
}

export const useCDKeyDetail = (keyword: CDKeyQueryMethod, options: any = {}) => {

  const queryVariables: any = {
    parameters: {
      ...keyword,
      options: options,
    }
  };

  queryVariables.parameters.options = JSON.stringify(queryVariables.parameters.options);

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

export const useCDKeyActivation = (playerDBName: string, value: string) => {
  return useMutation(
    ACTIVATE_CDKEY,
  );
};