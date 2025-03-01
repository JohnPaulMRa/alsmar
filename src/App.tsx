import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import GesturesPage from "./pages/gestures";
import TranslatorPage from "./pages/translator";
import ProgressPage from "./pages/progress";
import ThemeProvider from "./components/theme/ThemeProvider";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gestures" element={<GesturesPage />} />
            <Route path="/translator" element={<TranslatorPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
