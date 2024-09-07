import "./index.css";
import About from "./components/About";
import Box from "./components/Box";
import Directions from "./components/Directions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

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
            " flex flex-col items-center justify-around overflow-auto bg-stone-700 py-2.5 sm:gap-1 sm:p-4 lg:justify-around lg:gap-4"
          }
        >
          <Routes>
            <Route index path="/" element={<About w={width} h={height} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
        <Directions width={width} />
      </main>
    </BrowserRouter>
  );
}

export default App;
