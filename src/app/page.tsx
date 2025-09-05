import Layout from "@/app/components/Layout";
import Section from "@/app/components/Section";
import ContactList from "@/app/components/ContactList";
import CertsList, { Certification } from "@/app/components/CertsList";
import ProjectList from "@/app/components/ProjectList";
import StatusComment from "@/app/components/StatusComment";
import { getVisibleCaseStudies } from "@/lib/case-studies";

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
    label: "X",
    value: "https://x.com/alialjaffer",
    showAs: "x/aliAljaffer",
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
    date: "Jan 2025",
    order: 1,
  },
  {
    certification: "AZ-900 Azure Fundamentals",
    provider: "Microsoft",
    date: "Jun 2025",
    order: 2,
  },
  {
    certification: "SC-900 Security, Compliance, and Identity Fundamentals",
    provider: "Microsoft",
    date: "Jun 2025",
    order: 3,
  },
  {
    certification: "Solutions Architect - Associate",
    provider: "AWS",
    date: "July 2025",
    order: 4,
    wip: false,
  },
  {
    certification: "Terraform Associate",
    provider: "Hashicorp",
    date: "Aug 2025",
    order: 5,
    wip: false,
  },
  {
    certification: "Solutions Architect - Professional",
    provider: "AWS",
    date: "",
    order: 6,
    wip: true,
  },
  {
    certification: "Certified Kubernetes Application Developer",
    provider: "Linux Foundation",
    date: "",
    order: 7,
    wip: true,
  },
];

const projectsData = getVisibleCaseStudies();

export default function Home() {
  if (!projectsData) return <p>Error occurred with projects data.</p>;
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
              Cloud Engineer & DevOps with a passion for automation,
              infrastructure as code, and building scalable systems. I&apos;m
              mostly working on projects that utilize AWS services, but will be
              expanding to Google Cloud Platform pretty soon!
            </p>
            <p className="ml-6 mt-4 mb-4 max-w-[560px] md:max-w-fit leading-5 md:ml-6">
              I built full-stack projects and I&apos;m in the process of
              containerizing and migrating them to AWS, so I&apos;m sharing my
              experience and case studies for each project as way of documenting
              the process for my future self. Check out the projects section for
              case studies, demos, screenshots, and architecture diagrams.
            </p>
            {/* Certs section within the notes */}
            <Section title="Certifications">
              <CertsList certs={certsData} />
            </Section>
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

          <section className="xl:w-full mb-4">
            <div className="ml-6 mt-4 mb-4 md:ml-6 text-sm lg:text-base">
              <StatusComment>
                Currently seeking opportunities in System Administration, Cloud
                Engineering and DevOps roles
              </StatusComment>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
