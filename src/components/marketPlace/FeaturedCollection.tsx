interface Props {
  collection?: any;
  button?: string;
}
const FeaturedCollection = ({
  collection,
  button = "See details",
}: Props) => {
  return (
    <div className="grid content-center h-full">
      <div
        className="bg-transparent w-[418px] text-2xl mt-5"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        {collection?.title || "This NFT has no title"}
      </div>

      <div>
        <div
          className="text-base mt-5"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {collection.describe}
        </div>
        <button className="bg-white w-[154px] h-[28px] mt-5 font-medium text-base text-black">
          {button}
        </button>
      </div>
    </div>
  );
};

export default FeaturedCollection;
