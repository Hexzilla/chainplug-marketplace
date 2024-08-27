import axios from "axios";
import getConfig from "./nearConfig";
import * as nearApi from "near-api-js";

const nearConfig = getConfig(process?.env?.RENTAL_NETWORK || "testnet");
const mintbaseApi = process.env.NEXT_PUBLIC_MINTBASEAPI || "testnet";

export const getFeatureItems = async () => {
  let featuredItems: any[] = [];

  await axios
    .get(
      mintbaseApi,
      // "https://surface-api-testnet-z3w7d7dnea-ew.a.run.app/categories/Featured/listings?limit=48&offset=0",
      {
        headers: {
          "mb-api-key": "anon",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      featuredItems = response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return featuredItems;
};

export async function initContract() {
  const near = await nearApi.connect({
    deps: {
      keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  const appKeyPrefix = "uniqueAppName";
  const walletConnection = new nearApi.WalletConnection(near, appKeyPrefix);

  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = walletConnection.getAccountId();
  }

  const contract: any = await new nearApi.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: [
        "list_listings_by_nft_contract_id",
        "list_allowed_nft_contract_ids",
        "list_allowed_ft_contract_ids",
        "get_listing_by_id",
        "get_rental_contract_id",
      ],
      changeMethods: [],
    }
  );

  const rentalContractId = await contract.get_rental_contract_id();

  const rentalContract = await new nearApi.Contract(
    walletConnection.account(),
    rentalContractId,
    {
      viewMethods: [
        "leases_by_borrower",
        "leases_by_owner",
        "lease_by_contract_and_token",
      ],
      changeMethods: ["claim_back"],
    }
  );
  return { contract, walletConnection, rentalContractId, rentalContract };
}
