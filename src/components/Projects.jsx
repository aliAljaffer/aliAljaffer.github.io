import { Fragment, useRef, useState } from "react";
import projects from "../lib/projects.json";
import Project from "./Project";
function Projects() {
  const [showFinished, setShowFinished] = useState(true);
  const ref = useRef(null);
  const inProgressProjects = projects.filter((project) => !project.isFinished);
  const finishedProjects = projects.filter((project) => project.isFinished);
  const showProjects = showFinished ? finishedProjects : inProgressProjects;

  const handleProjects = () => {
    setShowFinished((old) => !old);
  };

  const handleScroll = (e) => {
    // console.log(e.deltaY, e.deltaX);
    // if (e.deltaX === -0) return;
    // const element = ref.current;
    // element.scrollLeft += e.deltaY * 6;
    // console.log(e);
  };

  return (
    <div className="text-md col-span-2 row-span-2 flex h-[90dvh] w-full flex-col items-start justify-start gap-4 overflow-auto text-wrap p-4 sm:text-xl lg:text-2xl xl:h-[50dvh]">
      <div className="flex w-full flex-row items-center justify-center">
        <p className="text-md tracking-tight">
          {showFinished ? "Past projects:" : "Currently working on:"}
        </p>
        <button
          onClick={handleProjects}
          className="ml-auto inline w-fit cursor-pointer place-self-start rounded-lg bg-stone-300 px-4 py-1.5 text-xs text-stone-600 shadow-md shadow-stone-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50 hover:font-extrabold sm:text-sm"
        >
          {`${showFinished ? "In-progress" : "Finished"} projects`} &rarr;
        </button>
      </div>
      <div
        ref={ref}
        onWheel={handleScroll}
        className="mt-auto flex h-[95%] w-full items-center gap-12 overflow-x-scroll scroll-smooth lg:flex-row lg:scrollbar-thin lg:scrollbar-track-stone-600 lg:scrollbar-thumb-stone-400"
      >
        {showProjects.map((project, i) => (
          <Fragment key={project.projectId}>
            <Project
              idx={i}
              numProjects={showProjects.length}
              project={project}
              tech={project.tech}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Projects;
