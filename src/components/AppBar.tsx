const AppBar: React.FC = () => {
  return (
    <div className="mx-auto flex flex-row items-center justify-between py-4">
      <h1 className="font-semibold text-3xl">CoinTracker</h1>
      <div className="h-full">
        <input
          placeholder="search coin..."
          className="rounded-lg px-2 py-1 border border-white"
        />
      </div>
    </div>
  );
};

export default AppBar;
