// Central source of truth for the home page's hand-maintained lists:
// contact/social links, certifications, and the "currently learning" topics.
// Blog posts and projects are NOT here — those are sourced from the markdown
// files in src/data via src/lib/case-studies.ts.
//
// To add/remove an entry, edit the relevant array below. Icons are either
// FontAwesome `IconDefinition`s (rendered with <FontAwesomeIcon />) for
// contacts, or `IconType`-compatible components for certs/learning (mostly
// react-icons; AWS uses a small FontAwesome wrapper to match the brand glyph).
import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AzmIcon } from "@/app/components/AzmIcon";
import { ManafaIcon } from "@/app/components/ManafaIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import {
  faAws,
  faGithub,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  SiGooglecloud,
  SiKubernetes,
  SiTerraform,
  SiBackstage,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { RiAlibabaCloudLine } from "react-icons/ri";

type CertIcon = ComponentType<{ className?: string }>;

export type ContactLink = {
  label: string;
  handle: string;
  value: string;
  icon: IconDefinition;
};

export type Certification = {
  name: string;
  date: string;
  order: number;
  url: string;
  Icon?: CertIcon;
};

export type LearningTopic = {
  name: string;
  icon: IconType;
  url: string;
};

export type Experience = {
  company: string;
  title: string;
  current: boolean;
  Icon?: CertIcon;
};

const faAwsIcon: CertIcon = ({ className }) => (
  <FontAwesomeIcon icon={faAws} className={className} />
);

export const contactData: ContactLink[] = [
  {
    label: "Resume",
    handle: "resume.alialjaffer.com",
    value: "https://resume.alialjaffer.com",
    icon: faFileLines,
  },
  {
    label: "GitHub",
    handle: "github/aliAljaffer",
    value: "https://github.com/alialjaffer",
    icon: faGithub,
  },
  {
    label: "LinkedIn",
    handle: "linkedin/aliAljaffer",
    value: "https://linkedin.com/in/alialjaffer",
    icon: faLinkedin,
  },
  {
    label: "X",
    handle: "x/aliAljaffer",
    value: "https://x.com/alialjaffer",
    icon: faXTwitter,
  },
  {
    label: "YouTube",
    handle: "youtube/aliAljaffer",
    value: "https://www.youtube.com/@aliAljaffer",
    icon: faYoutube,
  },
];

export const certsData: Certification[] = [
  {
    name: "GCP Professional Cloud Architect",
    date: "May 2026",
    order: 10,
    url: "https://www.credly.com/badges/f576ddd7-17b9-4a15-aa0e-86dca295cc37/public_url",
    Icon: SiGooglecloud,
  },
  {
    name: "Certified Kubernetes Security Specialist",
    date: "Feb 2026",
    order: 9,
    url: "https://www.credly.com/badges/6d3a6109-76a3-4873-9305-5679d128f6ba/public_url",
    Icon: SiKubernetes,
  },
  {
    name: "Certified Kubernetes Administrator",
    date: "Dec 2025",
    order: 7,
    url: "https://www.credly.com/badges/460fb1fe-342c-45e0-8b17-c6225e43ec7a/public_url",
    Icon: SiKubernetes,
  },
  {
    name: "Certified Kubernetes Application Developer",
    date: "Dec 2025",
    order: 6,
    url: "https://www.credly.com/badges/574c7848-77e6-4c25-a1b6-d7d4f70a130c/public_url",
    Icon: SiKubernetes,
  },
  {
    name: "Terraform Associate",
    date: "Aug 2025",
    order: 5,
    url: "https://www.credly.com/badges/2abf40d1-88d1-4d75-a79e-73d1c7ec94d9/public_url",
    Icon: SiTerraform,
  },
  {
    name: "AWS Solutions Architect – Associate",
    date: "Jul 2025",
    order: 4,
    url: "https://www.credly.com/badges/90df08a0-de5d-4eab-9ed3-013e17556f71/public_url",
    Icon: faAwsIcon,
  },
];

export const learning: LearningTopic[] = [
  { name: "Golang", icon: FaGolang, url: "https://go.dev" },
  { name: "Backstage", icon: SiBackstage, url: "https://backstage.io" },
  { name: "Alibaba Cloud", icon: RiAlibabaCloudLine, url: "https://sccc.sa" },
];

export const experienceData: Experience[] = [
  {
    company: "Saudi AZM",
    title: "DevOps Engineer",
    current: true,
    Icon: AzmIcon,
  },
  {
    company: "Manafa",
    title: "DevOps Engineer Intern",
    current: false,
    Icon: ManafaIcon,
  },
];
