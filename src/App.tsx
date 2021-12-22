import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import CoinContainer from "./components/CoinContainer";
import Favs from "./components/Favs";
import { auth, db } from "./firebase";

function App() {
  const [favs, setFavs] = useState<boolean>(false);
  const [allCoins, setAllCoins] = useState<Array<object>>([]);
  const [favCoins, setFavCoins] = useState<Array<object>>([]);
  const [user, setUser] = useState<any>(null);

  async function fetchAllCoins() {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setAllCoins(res.data);
      });
  }

  async function fetchFavCoins(user: any) {
    let tempCoins: Array<object> = [];
    let tempCoins2: Array<object> = [];
    await db
      .collection("users")
      .doc(user?.uid)
      .collection("coins")
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          const data = snap.data();
          tempCoins.push({ ...data });
        });
      });
    tempCoins.forEach(async (coin: any) => {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((res) => {
          const data = res.data[0];
          tempCoins2.push({ ...data });
        });
    });
    setFavCoins(tempCoins2);
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      fetchFavCoins(user);
    });
    fetchAllCoins();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <AppBar />
      <div className="flex justify-center mx-auto gap-4">
        <button
          className="border border-white rounded-lg px-2 py w-24"
          style={
            !favs
              ? {
                  backgroundColor: "white",
                  color: "black",
                }
              : { backgroundColor: "transparent", color: "white" }
          }
          onClick={() => {
            setFavs(false);
          }}
        >
          All Coins
        </button>
        <button
          className="border border-white rounded-lg px-2 py w-24"
          style={
            favs
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "transparent", color: "white" }
          }
          onClick={() => {
            setFavs(true);
          }}
        >
          Favs
        </button>
      </div>
      {favs ? (
        <Favs favCoins={favCoins} user={user} />
      ) : (
        <CoinContainer allCoins={allCoins} favCoins={favCoins} />
      )}
    </div>
  );
}

export default App;
