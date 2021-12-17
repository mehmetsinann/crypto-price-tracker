const Coin: React.FC = () => {
  return (
    <div className="w-1/5 flex flex-col items-center m-4">
      <img src="/bitcoin.png" alt="coin" className="w-14 h-14" />
      <div className="flex flex-row items-center">
        <h1 className="font-semibold text-2xl">Bitcoin</h1>
        <p className="text-gray-300 pl-2 pt-2">BTC</p>
      </div>
      <p>$64000</p>
      <p>Market Cap: $785,678,987,678</p>
      <p>Volume (24H): $45,678,987</p>
      <div className="rounded-b-lg bg-green-500 w-full h-12 mt-2 flex items-center justify-center">
        <img src="/arrow.png" alt="arrow" className="w-4 h-4 bg-transparent" />
        <p className="bg-transparent">%8.5</p>
      </div>
    </div>
  );
};

export default Coin;
