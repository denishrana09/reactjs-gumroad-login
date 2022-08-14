import { Routes, Route } from "react-router-dom";
import "./App.css";
import GumroadCallback from "./GumroadCallback";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="App">
              <button
                onClick={() => {
                  window.open(
                    `https://gumroad.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=view_profile+edit_products+view_sales`
                  );
                }}
              >
                Connect Gumroad
              </button>
            </div>
          </>
        }
      />
      <Route path="/callback" element={<GumroadCallback />} />
    </Routes>
  );
}

export default App;
