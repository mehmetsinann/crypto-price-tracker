import { useEffect, useState } from "react";
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
}) => {
  const [user, setUser] = useState<any>(null);
  const price_change = parseFloat(change);

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
        .then(() => {
          alert("başarıyla kaydedildi");
          window.location.reload();
        });
    } else {
      alert("lütfen giriş yapın");
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
          alert("başarıyla silindi");
          window.location.reload();
        });
    }
  };

  return (
    <div className="relative w-1/4 flex flex-col items-center m-4 border border-white p-4 rounded-xl shadow-sm shadow-purple-500">
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
      <p>${current_price.toLocaleString()}</p>
      <p>Market Cap: ${market_cap.toLocaleString()}</p>
      <p>Total Volume: ${total_volume.toLocaleString()}</p>
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
