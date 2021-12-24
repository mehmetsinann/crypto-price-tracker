import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { auth, db } from "../firebase";

interface types {
  id: string;
  imgURL: string;
  name: string;
  symbol: string;
  current_price: string;
  market_cap: string;
  total_volume: string;
  change: string;
  isFav: boolean;
  favCoins: Array<object>;
}

const Coin: React.FC<types> = ({
  id,
  imgURL,
  name,
  symbol,
  current_price,
  market_cap,
  total_volume,
  change,
  isFav,
  favCoins,
}) => {
  const [user, setUser] = useState<any>(null);
  const price_change = parseFloat(change);
  const alert = useAlert();

  const coin = {
    id,
  };

  useEffect(() => {
    auth.onAuthStateChanged((tempUser) => {
      setUser(tempUser);
    });
  }, []);

  const addFav = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("coins")
        .doc(coin.id)
        .set(coin)
        .then(async () => {
          await axios
            .get(
              `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            )
            .then((res) => {
              const data = res.data[0];
              const tempcoin = favCoins.find((x: any) => x.id === data.id);
              if (tempcoin === undefined) {
                favCoins.push({ ...data });
                alert.success(
                  <div
                    style={{
                      backgroundColor: "#22C55E",
                      padding: "16px 8px",
                      borderRadius: "8px",
                    }}
                  >
                    Coin favorilerinize başarıyla eklendi.
                  </div>
                );
              } else {
                alert.success(
                  <div
                    style={{
                      backgroundColor: "#1C4A82",
                      padding: "16px 8px",
                      borderRadius: "8px",
                    }}
                  >
                    Coin zaten favorilerinizde bulunuyor.
                  </div>
                );
              }
            });
        })
        .catch((e) => console.log(e));
    } else {
      alert.info(
        <div
          style={{
            backgroundColor: "#1C4A82",
            padding: "16px 8px",
            borderRadius: "8px",
          }}
        >
          Lütfen giriş yapınız.
        </div>
      );
    }
  };

  const removeFav = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("coins")
        .doc(coin.id)
        .delete()
        .then(() => {
          const tempcoin = favCoins.find((x: any) => x.id === coin.id);
          if (tempcoin) {
            const index = favCoins.indexOf(tempcoin);
            favCoins.splice(index, 1);
            console.log(favCoins);
            alert.success(
              <div
                style={{
                  backgroundColor: "#22C55E",
                  padding: "16px 8px",
                  borderRadius: "8px",
                }}
              >
                Coin favorilerden başarıyla silindi.
              </div>
            );
            const doc = document.getElementById(coin.id);
            doc?.classList.add("hidden");
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div
      id={coin.id}
      className="relative w-1/4 flex flex-col items-center m-4 border border-white p-4 rounded-xl shadow-sm shadow-purple-500"
    >
      <button
        className="absolute top-2 right-4 text-3xl"
        onClick={isFav ? removeFav : addFav}
      >
        {isFav ? "-" : "+"}
      </button>
      <img src={imgURL} alt="coin" className="w-14 h-14" />
      <div className="flex flex-row items-center">
        <h1 className="font-semibold text-2xl">{name}</h1>
        <p className="text-gray-300 pl-2 pt-2">{symbol.toUpperCase()}</p>
      </div>
      <p className="text-xl">${current_price}</p>
      <div className="flex flex-row">
        <p className="text-gray-400">Market Cap:</p> &nbsp;
        <p>${market_cap.toLocaleString()}</p>
      </div>
      <div className="flex flex-row">
        <p className="text-gray-400">Total Volume:</p> &nbsp;
        <p>${total_volume.toLocaleString()}</p>
      </div>
      {price_change > 0 ? (
        <div className="rounded-b-lg bg-green-500 w-full h-12 mt-2 flex items-center justify-center">
          <img
            src="/arrow.png"
            alt="arrow"
            className="w-5 h-5 bg-transparent mr-2"
          />
          <p className="bg-transparent">%{price_change.toFixed(2)}</p>
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
