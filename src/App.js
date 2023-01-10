import Page1 from "./page1/index";
import Transaction from "./page1/transaction";
import TransactionDetails from "./page2/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/transfer-amount" element={<Transaction />} />
          <Route path="/transaction-details" element={<TransactionDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
