import React, { useState, useEffect } from 'react';

export default function TradingDashboard() {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState({ won: 0, lost: 0, pending: 0, winRate: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the history from your Django API
    fetch('http://localhost:8000/api/history/')
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        setTrades(data);
        
        // Calculate the accuracy statistics
        const won = data.filter(t => t.accuracy_status === 'Won').length;
        const lost = data.filter(t => t.accuracy_status === 'Lost').length;
        const pending = data.filter(t => t.accuracy_status === 'Pending').length;
        
        const totalResolved = won + lost;
        const winRate = totalResolved > 0 ? ((won / totalResolved) * 100).toFixed(2) : 0;

        setStats({ won, lost, pending, winRate });
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-center">Loading AI Data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Trading Accuracy Dashboard</h1>
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-semibold">Overall Win Rate</h3>
          <p className="text-2xl font-bold">{stats.winRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-semibold">Trades Won</h3>
          <p className="text-2xl font-bold text-green-600">{stats.won}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-semibold">Trades Lost</h3>
          <p className="text-2xl font-bold text-red-600">{stats.lost}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-semibold">Pending (Active)</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Recent Signals</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Signal</th>
              <th className="py-3 px-6">Entry Price</th>
              <th className="py-3 px-6">Take Profit</th>
              <th className="py-3 px-6">Stop Loss</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {trades.map((trade, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{new Date(trade.created_at).toLocaleString()}</td>
                <td className="py-3 px-6 font-bold flex items-center gap-2">
                  <span className={trade.signal === 'BUY' ? 'text-green-500' : 'text-red-500'}>
                    {trade.signal}
                  </span>
                </td>
                <td className="py-3 px-6">{trade.trade_entry}</td>
                <td className="py-3 px-6 text-green-600">{trade.trade_tp}</td>
                <td className="py-3 px-6 text-red-600">{trade.trade_sl}</td>
                <td className="py-3 px-6">
                  <span className={`py-1 px-3 rounded-full text-xs font-bold
                    ${trade.accuracy_status === 'Won' ? 'bg-green-200 text-green-700' : 
                      trade.accuracy_status === 'Lost' ? 'bg-red-200 text-red-700' : 
                      'bg-yellow-200 text-yellow-700'}`}>
                    {trade.accuracy_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trades.length === 0 && (
          <div className="p-6 text-center text-gray-500">No trades recorded yet.</div>
        )}
      </div>
    </div>
  );
}