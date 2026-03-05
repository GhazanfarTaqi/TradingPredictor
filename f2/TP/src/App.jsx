// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import TradingDashboard from './TradingDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/" element={<TradingDashboard />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TradingDashboard from './TradingDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* We changed the path to "/" so the dashboard is the first thing you see */}
        <Route path="/" element={<TradingDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;