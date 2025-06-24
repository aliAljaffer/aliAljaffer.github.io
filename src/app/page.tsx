"use client";
import Layout from "@/app/components/Layout";
import Section from "@/app/components/Section";
import ContactList from "@/app/components/ContactList";
import CertsList, { Certification } from "@/app/components/CertsList";
import ProjectList from "@/app/components/ProjectList";
import StatusComment from "@/app/components/StatusComment";
import { Project } from "./types";
import { getVisibleCaseStudies } from "@/data/case-studies";

const contactData = [
  {
    label: "Email",
    value: "mailto:ali.h.aljaffer@gmail.com?subject=Collaboration",
    showAs: "ali.h.aljaffer@gmail.com",
  },
  {
    label: "GitHub",
    value: "https://github.com/alialjaffer",
    showAs: "github/aliAljaffer",
  },
  {
    label: "LinkedIn",
    value: "https://linkedin.com/in/alialjaffer",
    showAs: "linkedin/aliAljaffer",
  },
  {
    label: "Credly",
    value: "https://www.credly.com/users/ali-aljaffer",
    showAs: "credly/ali-aljaffer",
  },
];

const certsData: Certification[] = [
  {
    certification: "Certified Cloud Practitioner",
    provider: "AWS",
  },
  { certification: "AZ-900 Azure Fundamentals", provider: "Microsoft" },
  {
    certification: "System Administrator",
    provider: "Red Hat",
    wip: true,
  },
  {
    certification: "Solutions Architect - Associate",
    provider: "AWS",
    wip: true,
  },
];

const projectsData = getVisibleCaseStudies().map((item) => {
  return {
    name: item.name,
    description: item.description,
    url: item.url,
    caseStudyId: item.caseStudyId,
    repo: item.repo,
    show: item.show,
  } as Project;
});

export default function Home() {
  return (
    <Layout className="text-base sm:text-lg px-6 py-5 md:px-8 md:py-8">
      {/* Large screen: centered container with max width */}
      <div className=" lg:flex lg:items-center lg:justify-center lg:min-h-[calc(100vh-4rem)] ">
        <div className="md:flex md:flex-wrap md:w-full lg:max-w-[60rem] md:mx-auto max-h-[fit-content]">
          {/* About Section */}
          <Section title="About" className="w-full lg:pl-4">
            <p className="ml-6 mt-4 mb-4 max-w-[560px] md:ml-6">
              Hi, I&apos;m{" "}
              <strong className="font-normal text-terminal-strong">
                Ali Aljaffer 🙋🏽‍♂️
              </strong>
            </p>
            <p className="ml-6 mt-4 mb-4 max-w-[560px] md:max-w-fit leading-5 md:ml-6">
              Aspiring Cloud Engineer & DevOps with a passion for automation,
              infrastructure as code, and building scalable systems. Currently
              preparing for{" "}
              <strong className="font-normal text-terminal-strong">
                AWS Solutions Architect Certification
              </strong>
              {", "}
              so I&apos;m mostly working on projects that utilize AWS services.
            </p>
            <p className="ml-6 mt-4 mb-4 max-w-[560px] md:max-w-fit leading-5 md:ml-6">
              I built web development projects and I&apos;m in the process of
              migrating them to AWS, so I&apos;m sharing my experience and case
              studies for each project as way of documenting the process for my
              future self. Check out the projects section for case studies,
              demos, screenshots, and architecture diagrams.
            </p>

            {true && (
              <Section title="Certifications">
                <CertsList certs={certsData} />
              </Section>
            )}
          </Section>

          {/* Contact Section */}
          <Section title="Contact" className="w-auto min-w-1/3 lg:pl-4 ">
            <ContactList contacts={contactData} />
          </Section>
          {/* Projects Section */}
          <Section title="Projects" className="md:w-max lg:pl-4">
            <ProjectList projects={projectsData} />
          </Section>
          {/* Status/Notes Section */}
          {true && (
            <section className="xl:w-full mb-4">
              <div className="ml-6 mt-4 mb-4 md:ml-6">
                <StatusComment>
                  Currently seeking opportunities in System Administration,
                  Cloud Engineering and DevOps roles
                </StatusComment>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
