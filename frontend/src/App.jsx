import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home.jsx";
import Transactions from "./components/transaction.jsx";
import PieChartStatistics from "./components/PieChartStatistics";
import Statistics from "./components/transctionsStatistics.jsx";
import BarChartStatistics from "./components/BarChartStatistics.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route
              path="/pieChartStatistics"
              element={<PieChartStatistics />}
            />
            <Route
              path="/barChartStatistics"
              element={<BarChartStatistics />}
            />
            
          </Routes>
        </div>
      </Router>
      {/* <Home /> */}
      {/* <Transactions /> */}
      {/* <Statistics /> */}
      {/* <BarChartStatistics /> */}
      {/* <PieChartStatistics /> */}
    </div>
  );
};

export default App;
