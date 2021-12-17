import Coin from "./Coin";
import axios from "axios";
import { useEffect, useState } from "react";

const CoinContainer: React.FC = (props) => {
  const [coins, setCoins] = useState<Array<any>>([]);
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    handleSearch();
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      });
  }, []);

  const handleSearch = () => {
    document.addEventListener("keyup", function () {
      const search = (document.getElementById("search") as HTMLInputElement)
        .value;
      setCurrentSearch(search);
    });
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(currentSearch.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center">
      {filteredCoins.map((coin, index) => {
        console.log(coin);

        return (
          <Coin
            key={index}
            imgURL={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            current_price={coin.current_price}
            market_cap={coin.market_cap}
            total_volume={coin.total_volume}
            change={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
};

export default CoinContainer;
