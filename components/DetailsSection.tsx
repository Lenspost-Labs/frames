"use client";

export const DetailsSection = ({
  allowedMints,
  isFollow,
  isLike,
  isRecast,
  isTopUp,
  minters,
  owner,
  tokenUri,
}: any) => {
  return (
    <div className="rounded-lg overflow-hidden border border-white p-2 h-[500px] w-[500px]">
      <div className="flex flex-col">
        <p>Owner: {owner}</p>
        <p>Allowed Mints: {allowedMints}</p>
        <p>Is Top Up: {isTopUp ? "True" : "Fasle"}</p>
        <p>Is Like: {isLike ? "True" : "Fasle"}</p>
        <p>Is Recast: {isRecast ? "True" : "Fasle"}</p>
        <p>Is Follow: {isFollow ? "True" : "Fasle"}</p>
        <p>No of NFTs Minted: {minters.length}</p>
        <button
        className=" w-full p-2 text-center bg-blue-600 rounded-lg"
          onClick={() => window.open("https://app.lenspost.xyz", "_blank")}
        >
          Remix on Lenspost
        </button>
      </div>
    </div>
  );
};
