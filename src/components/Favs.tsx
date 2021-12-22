import { useEffect, useState } from "react";
import Coin from "./Coin";

interface type {
  favCoins: Array<object>;
  user: any;
}

const Favs: React.FC<type> = ({ favCoins, user }) => {
  const [currentSearch, setCurrentSearch] = useState("");

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

  const filteredCoins: any = favCoins.filter((coin: any) =>
    coin.name.toLowerCase().includes(currentSearch.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center">
      {user
        ? favCoins.length > 0
          ? filteredCoins.map((coin: any, index: any) => {
              return (
                <Coin
                  key={index}
                  id={coin.id}
                  imgURL={coin.image}
                  name={coin.name}
                  symbol={coin.symbol}
                  current_price={coin.current_price}
                  market_cap={coin.market_cap}
                  total_volume={coin.total_volume}
                  change={coin.price_change_percentage_24h}
                  isFav={true}
                  favCoins={favCoins}
                />
              );
            })
          : "favorin yok"
        : "giriş yap"}
    </div>
  );
};

export default Favs;
