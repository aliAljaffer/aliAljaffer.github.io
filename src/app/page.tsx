import Layout from "@/app/components/Layout";
import Section from "@/app/components/Section";
import ContactList from "@/app/components/ContactList";
import CertsList, { Certification } from "@/app/components/CertsList";
import ProjectList from "@/app/components/ProjectList";
// import StatusComment from "@/app/components/StatusComment";
import { getVisibleCaseStudies } from "@/lib/case-studies";

const contactData = [
  {
    label: "Resume/CV",
    value:
      "https://alialjaffer-website.s3.me-south-1.amazonaws.com/documents/ali_aljaffer_cv.pdf",
    showAs: "Resume",
  },
  {
    label: "Email",
    value: "ali.h.aljaffer@gmail.com",
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
    label: "YouTube",
    value: "https://www.youtube.com/@aliAljaffer",
    showAs: "youtube/aliAljaffer",
  },
  // {
  //   label: "Credly",
  //   value: "https://www.credly.com/users/ali-aljaffer",
  //   showAs: "credly/ali-aljaffer",
  // },
];

const certsData: Certification[] = [
  // {
  //   certification: "Certified Cloud Practitioner",
  //   provider: "AWS",
  //   date: "Jan 2025",
  //   order: 1,
  // },
  // {
  //   certification: "AZ-900 Azure Fundamentals",
  //   provider: "Microsoft",
  //   date: "Jun 2025",
  //   order: 2,
  // },
  // {
  //   certification: "SC-900 Security, Compliance, and Identity Fundamentals",
  //   provider: "Microsoft",
  //   date: "Jun 2025",
  //   order: 3,
  // },
  {
    certification: "AWS Solutions Architect - Associate",
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
    certification: "Certified Kubernetes Application Developer",
    provider: "Linux Foundation",
    date: "Dec 2025",
    order: 6,
    wip: false,
  },
  {
    certification: "Certified Kubernetes Administrator",
    provider: "Linux Foundation",
    date: "Dec 2025",
    order: 7,
    wip: false,
  },
  // {
  //   certification: "DASA DevOps Fundamentals",
  //   provider: "DevOps Agile Skills Association",
  //   date: "Jan 2026",
  //   order: 8,
  //   wip: false,
  // },
  {
    certification: "Certified Kubernetes Security Specialist",
    provider: "Linux Foundation",
    date: "Feb 2026",
    order: 9,
    wip: false,
  },
];

const projectsData = getVisibleCaseStudies("project");
const blogPosts = getVisibleCaseStudies("blog");

export default function Home() {
  if (!projectsData) return <p>Error occurred with projects data.</p>;
  return (
    <Layout className="text-base sm:text-lg px-6 py-5 md:px-8 md:py-8">
      {/* Large screen: centered container with max width */}
      <div className=" lg:flex lg:items-center lg:justify-center lg:min-h-[calc(100vh-4rem)] ">
        <div className="md:flex md:flex-wrap md:w-full lg:max-w-304 md:mx-auto max-h-fit">
          {/* About Section */}

          <div className="flex flex-col gap-2 justify-start items-start w-full md:w-1/2">
            <Section title="About" className="w-full lg:pl-4">
              <p className="ml-6 mt-4 mb-4 max-w-[560px] md:max-w-fit leading-5 md:ml-6">
                Hi, I&apos;m{" "}
                <strong className="font-normal text-terminal-strong">
                  Ali Aljaffer 🙋🏽‍♂️😊&nbsp;
                </strong>
                a DevOps Engineer who is passionate about automation,
                infrastructure as code, and building scalable, reliable systems.
                I come from a web development background and absolutely love
                drawing system architecture diagrams. I&apos;m sharing my
                experience and case studies for each project as a way of
                documenting the process for my future self, and to help inspire
                others that are on this journey! <br />
                <br />
                Check out the{" "}
                <strong className="font-normal text-terminal-strong">
                  projects
                </strong>{" "}
                section for case studies, demos, screenshots, and architecture
                diagrams.
              </p>
              {/* Certs section within the notes */}
              <Section title="Contact" className="lg:pl-4 ">
                <ContactList contacts={contactData} />
              </Section>
            </Section>
            <Section title="Blog Posts" className="lg:pl-4">
              <em className="pl-6">~ Newest to oldest ~</em>
              <ProjectList projects={blogPosts!} />
            </Section>
          </div>
          {/* Projects Section */}
          <Section title="Projects" className="w-full md:w-1/2 lg:pl-4">
            <ProjectList projects={projectsData} />
            <Section title="Certifications">
              <CertsList certs={certsData} />
            </Section>
          </Section>
          {/* Status/Notes Section */}

          {/* <section className="xl:w-full mb-4">
            <div className="ml-6 mt-4 mb-4 md:ml-6 text-sm lg:text-base">
              <StatusComment>
                Currently seeking opportunities in System Administration, Cloud
                Engineering and DevOps roles
              </StatusComment>
            </div>
          </section> */}
        </div>
      </div>
    </Layout>
  );
}
