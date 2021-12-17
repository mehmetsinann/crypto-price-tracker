import { useState } from "react";

const AppBar: React.FC = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="mx-auto flex flex-row items-center justify-between py-4 px-4">
      <h1 className="font-semibold text-3xl">CoinTracker</h1>
      <div className="h-full">
        <input
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="search coin..."
          className="rounded-lg px-2 py-1 border border-white"
        />
      </div>
    </div>
  );
};

export default AppBar;
