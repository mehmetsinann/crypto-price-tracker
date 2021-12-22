import { useEffect, useState } from "react";
import Coin from "./Coin";

interface type {
  favCoins: Array<object>;
  user: any;
}

const Favs: React.FC<type> = ({ favCoins, user }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const coins = favCoins;

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
      {user
        ? coins.length > 0
          ? filteredCoins.map((coin: any, index: any) => {
              return (
                <Coin
                  key={index}
                  id={coin?.id}
                  imgURL={coin?.image.large}
                  name={coin?.name}
                  symbol={coin?.symbol}
                  current_price={coin?.market_data.current_price.usd}
                  market_cap={coin?.market_data.market_cap.usd}
                  total_volume={coin?.market_data.total_volume.usd}
                  change={coin?.market_data.price_change_percentage_24h}
                  isFav={true}
                />
              );
            })
          : "favorin yok"
        : "giriş yap"}
    </div>
  );
};

export default Favs;
