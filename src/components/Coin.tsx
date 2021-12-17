interface types {
  imgURL: string;
  name: string;
  symbol: string;
  current_price: string;
  market_cap: string;
  total_volume: string;
  change: string;
}

const Coin: React.FC<types> = ({
  imgURL,
  name,
  symbol,
  current_price,
  market_cap,
  total_volume,
  change,
}) => {
  const price_change = parseFloat(change);
  return (
    <div className="w-1/4 flex flex-col items-center m-4 border border-white p-4 rounded-xl shadow-md shadow-white">
      <img src={imgURL} alt="coin" className="w-14 h-14" />
      <div className="flex flex-row items-center">
        <h1 className="font-semibold text-2xl">{name}</h1>
        <p className="text-gray-300 pl-2 pt-2">{symbol.toUpperCase()}</p>
      </div>
      <p>${current_price}</p>
      <p>Market Cap: ${market_cap}</p>
      <p>Volume (24H): ${total_volume}</p>
      {price_change > 0 ? (
        <div className="rounded-b-lg bg-green-500 w-full h-12 mt-2 flex items-center justify-center">
          <img
            src="/arrow.png"
            alt="arrow"
            className="w-5 h-5 bg-transparent mr-2"
          />
          <p className="bg-transparent">%{change}</p>
        </div>
      ) : (
        <div className="rounded-b-lg bg-red-500 w-full h-12 mt-2 flex items-center justify-center">
          <img
            src="/arrow.png"
            alt="arrow"
            className="w-5 h-5 bg-transparent rotate-180 mr-2"
          />
          <p className="bg-transparent">%{price_change.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Coin;
