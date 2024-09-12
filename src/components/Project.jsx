import { useState } from "react";

function Project({ project, tech, idx, numProjects }) {
  const [showSummary, setShowSummary] = useState(false);
  const {
    projectName,
    projectType,
    githubRepoURL,
    hostedSiteURL,
    isFinished,
    reasonNotFinished,
    description,
  } = project;

  const handleShowSummary = () => {
    setShowSummary((old) => !old);
  };

  const showDescription = (
    <p className="row-span-3 inline h-full overflow-y-auto text-wrap text-xs transition-all duration-300">
      {description}
    </p>
  );

  return (
    <div className="relative mt-10 grid h-[65%] w-full shrink-0 grid-cols-1 grid-rows-[fit_fit_fit_fit] gap-2 overflow-visible rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-stone-600 sm:px-3 md:w-[40%] md:gap-8 lg:w-[33%] xl:h-[85%] xl:w-[25%]">
      <span className="absolute -top-0.5 right-0 text-xs">
        ({idx + 1} / {numProjects}) {idx + 1 < numProjects ? <>&rarr;</> : ""}
      </span>
      <p className="w-full text-xl font-bold capitalize tracking-wide sm:tracking-wide">
        {projectName}
      </p>
      {showSummary ? (
        showDescription
      ) : (
        <>
          <p className="inline h-full text-wrap text-sm text-stone-500">
            {projectType}
          </p>

          <p className="text-wrap text-sm capitalize text-stone-400">
            {tech.map((t, i) => t + (i === tech.length - 1 ? "" : ", "))}
          </p>
          <div className="flex h-fit items-start justify-between">
            {githubRepoURL ? (
              <a
                href={githubRepoURL}
                target="_blank"
                rel="noreferrer"
                alt={`${projectName} github repository`}
                className="flex w-fit cursor-pointer items-center gap-2 place-self-start rounded-lg bg-stone-300 px-4 py-1.5 text-sm text-stone-600 shadow-md shadow-stone-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50 hover:font-extrabold"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 30 30"
                    className="fill-stone-600"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                </span>{" "}
                Repo
              </a>
            ) : (
              <span className="cursor-pointer text-sm line-through">
                {"Repo not ready"}
              </span>
            )}
            {hostedSiteURL && (
              <a
                href={hostedSiteURL}
                target="_blank"
                rel="noreferrer"
                alt={`${projectName} hosted website`}
                className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-stone-300 px-4 py-1.5 text-sm text-stone-600 shadow-md shadow-stone-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50 hover:font-extrabold"
              >
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5"
                        className="stroke-stone-600"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>
                Website
              </a>
            )}
          </div>
        </>
      )}
      <button
        className="inline w-full cursor-pointer border-none text-sm tracking-wide text-stone-100 underline transition-all duration-300 hover:translate-y-0.5"
        onClick={handleShowSummary}
      >
        {`${!showSummary ? "Show" : "Hide"} project summary`}
      </button>
    </div>
  );
}

export default Project;
