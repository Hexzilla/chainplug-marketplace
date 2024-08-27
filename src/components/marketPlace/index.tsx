import { useEffect, useState } from "react";
import ImageView from "./imageView";
import MenuBottom from "./MenuBottom";
import MenuCenter from "./MenuCenter";
import MenuTop from "./MenuTop";
import { getFeatureItems, initContract } from "@/api/minbaseApi";
import { LoadingItem } from "../Item";
import FeaturedItems from "./FeaturedItem";
import FeaturedCollection from "./FeaturedCollection";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { imageUrl } from "@/utils";
import { SelectedNft, WalletConnect } from "@/types/types";

const GET_TOKEN = gql`
  query GetTokens($contract_id: String!, $token_id: String!) {
    mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $contract_id }
        token_id: { _eq: $token_id }
      }
    ) {
      base_uri
      media
      description
      nft_contract_id
      nft_contract_icon
      nft_contract_name
      metadata_id
      owner
      title
      token_id
    }
  }
`;

const GET_TOKENS = gql`
  query GetTokens($nft_contract_id: String!, $nft_token_ids: [String!]!) {
    mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $nft_contract_id }
        token_id: { _in: $nft_token_ids }
        burned_timestamp: { _is_null: true }
      }
    ) {
      owner
      media
      title
      token_id
    }
  }
`;

interface Props {
  showModal: (item: SelectedNft)=> void
}
const Marketplace = ({showModal}: Props) => {
  const [featuredItems, setFeaturedItems] = useState<any>([]);
  const [featuredData, setFeaturedData] = useState<any>([]);
  const [rentalListings, setRentalListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const contractId = process.env.NEXT_PUBLIC_STORES;
  useEffect(() => {
    const featuredItems = async () => {
      setLoading(true);
      const walletConnect = await initContract();
      const listings =
        await walletConnect.contract.list_listings_by_nft_contract_id({
          nft_contract_id: contractId,
        });
      setRentalListings(listings);
      const data = await getFeatureItems();
      setFeaturedItems(data);
    };

    featuredItems();
  }, []);

  const description = "This NFT has no descrition.";

  const collectionData = [
    {
      title: "This is the title of the collection",
      describe:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      url: "marketPlace/image2.jpg",
    },
    {
      title: "This is the title of the collection",
      describe:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      url: "marketPlace/image2.jpg",
    },
    {
      title: "This is the title of the collection",
      describe:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      url: "marketPlace/image2.jpg",
    },
  ];

  const [getToken, { data, error }] = useLazyQuery(GET_TOKEN);
  
  useEffect(() => {
    setLoading(true);
    const fetchAllData = async () => {
      const results = [];
      for (const item of featuredItems) {
        const response = await getToken({
          variables: {
            contract_id: item.nft_contract_id,
            token_id: item.token_id,
          },
        });

        if (response.data) {
          results.push(response.data.mb_views_nft_tokens[0]);
        }
      }
      setFeaturedData(results);
      setLoading(false);
    };

    fetchAllData();
  }, [featuredItems, getToken]);

  const { error: RentalNFTError, data: RentalNFTData } = useQuery(GET_TOKENS, {
    variables: {
      nft_contract_id: contractId,
      nft_token_ids: rentalListings.map((listing) => listing.nft_token_id),
    },
  });
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-12">
        <LoadingItem />
      </div>
    );
  } else if (!featuredData.length) {
    return <div>error</div>;
  }

  return (
    <div className="relative w-full h-full p-8 bg-[#111111] overflow-x-hidden">
      <MenuTop />
      <div className="w-full h-[1056px] bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#1E70F5] to-[#031126] border-l-2 border-t-2 border-r-2 border-[#4E4E4E] overflow-auto custom-scrollbar">
        <div className="w-full mt-32 pl-12 pr-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-2 text-white w-full h-[587px]">
              <ImageView
                url={imageUrl(
                  featuredData[0]?.base_uri,
                  featuredData[0]?.media
                )}
                height="457px"
              />
            </div>
            <div className="grid text-white h-full content-center  ml-5">
              <FeaturedItems item={featuredData[0]} />
              <div>
                <div
                  className="text-base mt-5 "
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {featuredData[0]?.description || description}
                </div>
                <button className="bg-white w-[154px] h-[28px] mt-5 font-medium text-base text-black">
                  See details
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-full mt-14">
            <div className="text-[44px] font-medium text-white">
              Featured Items
            </div>
            <div className="flex flex-wrap w-grid full justify-between justify-items-center gap-8 mt-8">
              {(featuredData || []).map((item: any, index: any) => (
                <div key={index} onClick={() => showModal({ metadataId: item.metadata_id })}>
                  <div className="w-[501px] h-[501px] text-white">
                    <ImageView
                      url={imageUrl(item.base_uri, item.media)}
                      width="400px"
                      height="400px"
                    />
                  </div>
                  <div className="mt-5 text-white">
                    <FeaturedItems item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-full mt-14 pb-14">
            <div className="text-[44px] font-medium text-white">
              Featured Collections
            </div>
            <div className="flex flex-wrap justify-between justify-items-center w-full mt-8">
              {collectionData.map((item, index) => (
                <div className="w-[772px]  mt-12" key={index}>
                  <img
                    src={item.url}
                    className="w-full h-[434px]"
                    alt="Background"
                  />
                  <div className="mt-5 text-white">
                    <FeaturedCollection
                      collection={item}
                      button="See Collection"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MenuCenter />
      <MenuBottom />
    </div>
  );
};

export default Marketplace;
