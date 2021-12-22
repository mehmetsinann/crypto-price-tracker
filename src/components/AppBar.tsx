import { useEffect, useState } from "react";
import { auth, db, signInWithGoogle, signOut } from "../firebase";

const AppBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((tempUser) => {
      setUser(tempUser);
      localStorage.setItem("coin-tracker-user", JSON.stringify(tempUser));
    });
  }, []);

  if (user) {
    db.collection("users")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
  }

  return (
    <div className="flex flex-row items-center justify-between py-4 px-4">
      <h1 className="font-semibold text-3xl">
        <a href="/">CoinTracker</a>
      </h1>
      <div className="h-full">
        <input
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="search coin..."
          className="rounded-lg px-2 py-1 border border-white"
        />
      </div>
      <button id="sign-buton" onClick={user ? signOut : signInWithGoogle}>
        {user ? "sign out" : "sign in"}
      </button>
    </div>
  );
};

export default AppBar;
