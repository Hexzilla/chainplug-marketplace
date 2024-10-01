import { ParsedDataReturn } from '@mintbase-js/data';
import { fetchGraphQl } from '@mintbase-js/data';
import { useQuery } from 'react-query';
import { Network } from '@mintbase-js/sdk';

export interface TokenIdByMetadata {
  token_id: string;
  title: string;
  owner: string;
  description: string;
  base_uri: string;
  media: string;
  minter: string;
  metadata_id: string;
}

interface TokenIdByMetadaResult {
  mb_views_nft_tokens: TokenIdByMetadata[];
}

const tokenIdByMetadataId = async (
  metadataId: string
): Promise<ParsedDataReturn<TokenIdByMetadaResult>> => {
  const query = `
    query MyQuery {
    mb_views_nft_tokens(
      where: {metadata_id: {_eq: "${metadataId}"}}
    ) {
      token_id
      title
    }
    }
  `;

  const network = (process?.env?.NEXT_PUBLIC_NETWORK as Network) || 'testnet';

  const { data, error } = await fetchGraphQl<TokenIdByMetadaResult>({
    query: query,
    variables: {},
    network,
  });

  const errorMsg = error ? `Error fetching metadataId tokens, ${error}` : '';
  if (error) {
    console.error(errorMsg);
    return { error: error };
  }

  return { data: data };
};

const mapStoreTokens = (data: ParsedDataReturn<TokenIdByMetadaResult>) => ({
  tokenInfo: data?.data?.mb_views_nft_tokens[0].token_id,
});

const useTokenIdByMetadataId = (metadataId?: string) => {
  const { isLoading, error, data } = useQuery(
    ['tokenIdByMetadataId', metadataId],
    () => tokenIdByMetadataId(metadataId!),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapStoreTokens,
      enabled: !!metadataId,
    }
  );

  return { ...data, error, loading: isLoading };
};

export { useTokenIdByMetadataId };
