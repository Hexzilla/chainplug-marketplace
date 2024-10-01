import { ParsedDataReturn } from "@mintbase-js/data";
import { fetchGraphQl } from "@mintbase-js/data";
import { useQuery } from "react-query";
import { Network } from "@mintbase-js/sdk";

export interface StoreToken {
  token_id: string;
  title: string;
  owner: string;
  description: string;
  base_uri: string;
  media: string;
  minter: string;
  metadata_id: string;
}

interface StoreTokenResult {
  mb_views_nft_tokens: StoreToken[];
}

const storeTokens = async (store: string, tokenIds: string[]): Promise<ParsedDataReturn<StoreTokenResult>> => {
  const query = `
    query MyQuery {
      mb_views_nft_tokens(where: {nft_contract_id: {_eq: "${store}"}, token_id: {_in: ${JSON.stringify(tokenIds)}}}) {
        token_id
        title
        owner
        description
        base_uri
        media
        minter
        metadata_id
      }
    }`;

  const network = (process?.env?.NEXT_PUBLIC_NETWORK as Network) || "testnet";

  const { data, error } = await fetchGraphQl<StoreTokenResult>({
    query: query,
    variables: {},
    network,
  });

  const errorMsg = error ? `Error fetching store tokens, ${error}` : '';
  if (error) {
    console.error(errorMsg);
    return { error: error };
  }

  return { data: data };
};

const mapStoreTokens = (data: ParsedDataReturn<StoreTokenResult>) => ({
  tokens: data?.data?.mb_views_nft_tokens,
});

const useStoreTokens = (store: string, tokenIds: string[]) => {
  const { isLoading, error, data } = useQuery(
    ["storeTokens", store],
    () => storeTokens(store, tokenIds),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapStoreTokens,
      enabled: !!store && tokenIds && tokenIds.length > 0,
    }
  );

  return { ...data, error, loading: isLoading };
};

export { useStoreTokens };
