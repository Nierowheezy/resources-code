import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import { ResourceProvider } from "./context/ResourceContext";

function App() {
  return (
    <ResourceProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      </Suspense>
    </ResourceProvider>
  );
}

export default App;
