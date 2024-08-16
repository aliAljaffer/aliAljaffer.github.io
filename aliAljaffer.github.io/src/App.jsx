import { useState } from "react";
import "./index.css";
import Heading from "./components/Heading";
import TechStack from "./components/TechStack";
import List from "./components/List";

function App() {
  const year = new Date().getFullYear();
  const contactsList = ["Contact 1", "Contact 2", "Contact 3"];
  const projectsList = ["Project 1", "Project 2", "Project 3"];
  const message =
    "Fresh Computer Science graduate with a minor in Mathematics from Wright State University, Dayton, Ohio. Interested in Web Development, Mathematics";
  return (
    <>
      <main className="text-c5 bg-c1 relative flex min-h-screen w-full flex-col items-center justify-center gap-1 bg-blue-950 text-sm">
        <div className="flex max-w-full flex-col items-center gap-4 p-12">
          <div className="flex flex-col items-center justify-around gap-4 sm:flex-row-reverse sm:gap-2.5 md:gap-4 lg:gap-8">
            <TechStack className="grid w-72 grid-cols-3 items-center justify-center gap-2 place-self-center sm:w-auto lg:gap-5" />
            <div className="flex w-full flex-col items-center justify-center gap-2 sm:items-start md:w-[50%]">
              <Heading
                className="text-3xl sm:text-4xl md:text-5xl"
                message={"Ali Aljaffer"}
              />
              <Heading
                className="text-lg sm:text-xl md:text-xl lg:text-2xl"
                message={"Software Engineer and Front-End Developer"}
              />
            </div>
          </div>
          <Heading
            message={message}
            className="mt-16 text-wrap p-4 text-left text-xl md:text-2xl lg:text-3xl xl:max-w-[65dvw]"
          />
        </div>
        <div className="left-50 absolute bottom-0 animate-bounce text-3xl transition-all duration-300">
          &darr;
        </div>
      </main>
      <div className="text-c5 bg-c2 relative flex min-h-screen w-full flex-col justify-around bg-blue-950 p-20 text-sm">
        <List
          className="flex w-full flex-col items-start justify-center gap-8 text-lg md:text-2xl"
          headingStyle="text-2xl  md:text-4xl"
          headingTitle="Projects"
          listContent={projectsList}
        />
        <List
          className="flex w-full flex-col items-end justify-center gap-8 text-lg md:text-2xl"
          headingStyle="text-2xl md:text-4xl"
          headingTitle="Contacts"
          listContent={contactsList}
        />

        <footer className="absolute bottom-1 left-5 m-0 p-0">
          Ali Aljaffer &copy; {year}
        </footer>
      </div>
    </>
  );
}

export default App;
