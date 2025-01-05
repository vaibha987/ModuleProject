import React, { useState, useEffect } from "react";
import axios from "axios"

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  // Fetch using .then
  const fetchDataUsingThen = () => {
    axios.get(API_URL).then((response) => {
      setCoins(response.data);
    });
  };

  // Fetch using async/await
  const fetchDataUsingAsyncAwait = async () => {
    try {
      const response = await axios.get(API_URL);
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataUsingAsyncAwait(); // Default fetch
  }, []);

  // Filter based on search
  const handleSearch = () => {
    if (!search) {
      fetchDataUsingAsyncAwait(); // Reset
    } else {
      const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
      setCoins(filteredCoins);
    }
  };

  // Sort by Market Cap
  const handleSort = (key) => {
    const sortedCoins = [...coins].sort((a, b) => {
      return sortOrder === "asc"
        ? a[key] - b[key]
        : b[key] - a[key];
    });
    setCoins(sortedCoins);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h1>Cryptocurrency Market</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => handleSort("market_cap")}>Sort by Market Cap</button>
        <button onClick={() => handleSort("price_change_percentage_24h")}>
          Sort by Percentage Change
        </button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} width="50" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>{coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
