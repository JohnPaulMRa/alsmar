import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ThemeProvider from "./components/theme/ThemeProvider";
import MainLayout from "./components/layout/MainLayout";
import PageTransition from "./components/layout/PageTransition";
import LoadingSpinner from "./components/ui/loading-spinner";
import routes from "tempo-routes";

// Lazy load pages for better performance
const GesturesPage = lazy(() => import("./pages/gestures"));
const TranslatorPage = lazy(() => import("./pages/translator"));
const ProgressPage = lazy(() => import("./pages/progress"));
const LoginPage = lazy(() => import("./pages/login"));

function App() {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/gestures"
                element={
                  <PageTransition>
                    <GesturesPage />
                  </PageTransition>
                }
              />
              <Route
                path="/translator"
                element={
                  <PageTransition>
                    <TranslatorPage />
                  </PageTransition>
                }
              />
              <Route
                path="/progress"
                element={
                  <PageTransition>
                    <ProgressPage />
                  </PageTransition>
                }
              />
            </Route>

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
