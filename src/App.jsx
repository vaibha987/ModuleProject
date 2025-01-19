import React, { useState, useEffect } from "react";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data using .then
  const fetchDataWithThen = () => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching data with .then:", error));
  };

  // Fetch data using async/await
  const fetchDataWithAsync = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await response.json();
      setCryptoData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data with async/await:", error);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    const filtered = cryptoData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Sort by market cap
  const sortByMarketCap = () => {
    const sorted = [...filteredData].sort((a, b) => b.market_cap - a.market_cap);
    setFilteredData(sorted);
  };

  // Sort by percentage change (24h)
  const sortByChange = () => {
    const sorted = [...filteredData].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setFilteredData(sorted);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDataWithAsync(); // Change to fetchDataWithThen() to test .then
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crypto Market Data</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={sortByMarketCap}>Sort by Market Cap</button>
        <button onClick={sortByChange}>Sort by % Change</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
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
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} width="30" />
              </td>
              <td>{item.name}</td>
              <td>{item.symbol.toUpperCase()}</td>
              <td>${item.current_price.toLocaleString()}</td>
              <td>{item.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
