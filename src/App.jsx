import { lazy, Suspense } from "react";
import "./index.css";
import About from "./components/About";
import Box from "./components/Box";
import Directions from "./components/Directions";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/Spinner";
// import PageNotFound from "./components/PageNotFound";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";
// import Images from "./components/Images";
const Images = lazy(() => import("./components/Images"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));

function App() {
  const width = " w-[85dvw] sm:w-[85dvw] lg:w-[80dvw] lg:max-w-[1024px]";
  const height =
    " h-[75dvh] max-h-[75dvh]  lg:h-[69dvh] lg:max-h-[90dvh] xl:max-h-[80dvh] ";

  return (
    <BrowserRouter>
      {" "}
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-stone-200 text-sm text-c5 lg:gap-3">
        <Box
          className={
            height +
            " " +
            width +
            " flex flex-col items-center overflow-auto bg-stone-700 py-2.5 sm:justify-between sm:gap-1 sm:p-4 lg:gap-4"
          }
        >
          <Routes>
            <Route index path="/" element={<About w={width} h={height} />} />
            <Route
              path="/photography"
              element={
                <Suspense fallback={<Spinner />}>
                  <Images />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<Spinner />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<Spinner />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Routes>
        </Box>
        <Directions width={width} />
      </main>
    </BrowserRouter>
  );
}

export default App;
