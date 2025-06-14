import TechStack from "./TechStack";
function About({ className, w, h }) {
  const message =
    "Fresh Computer Science graduate with a minor in Mathematics from Wright State University, Dayton, Ohio. Interested in Web Development, System Adminstration, Cloud Infra, and DevOps. I started Web Development in 2023 during my 3rd year of university, and have been working on improving my skillset in this topic ever since. I also started learning mobile development early 2024, so I'm excited to start working on real-world apps on both iOS and Android platforms!";
  const freeTime =
    "In my free time, I build mechanical keyboards, do photography and astrophotography, both digital and analog, and I love to cook! ";
  return (
    <div className="flex h-full w-full shrink-0 grow flex-col justify-around gap-0">
      <p className="h-fit w-full text-wrap px-4 py-1.5 text-sm sm:text-xl xl:text-2xl">
        Ali Aljaffer
        <br />
        DevOps, Software, and Web
      </p>
      <p className="w-full text-wrap px-4 py-1.5 indent-4 text-sm sm:text-xl xl:text-2xl">
        {message}
      </p>
      <p className="w-full text-wrap px-4 py-1.5 indent-4 text-sm sm:text-xl xl:text-2xl">
        {freeTime}
      </p>
      <TechStack />
    </div>
  );
}

export default About;
