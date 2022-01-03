import Coin from "./Coin";
import { useEffect, useState } from "react";

interface type {
  allCoins: Array<object>;
  favCoins: Array<object>;
}

const CoinContainer: React.FC<type> = ({ allCoins, favCoins }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const coins = allCoins;
  let order = 0;
  // console.log(coins);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    document.addEventListener("keyup", function () {
      const search = (document.getElementById("search") as HTMLInputElement)
        .value;
      setCurrentSearch(search);
    });
  };

  const filteredCoins: any = coins.filter((coin: any) =>
    coin.name.toLowerCase().includes(currentSearch.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center">
      {filteredCoins.map((coin: any, index: any) => {
        order++;
        return (
          <Coin
            key={index}
            number={order}
            id={coin.id}
            imgURL={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            current_price={coin.current_price}
            market_cap={coin.market_cap}
            total_volume={coin.total_volume}
            change={coin.price_change_percentage_24h}
            isFav={false}
            favCoins={favCoins}
          />
        );
      })}
    </div>
  );
};

export default CoinContainer;
