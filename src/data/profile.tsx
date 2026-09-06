// Central source of truth for the home page's hand-maintained lists:
// contact/social links, certifications, and the "currently learning" topics.
// Blog posts and projects are NOT here - those are sourced from the markdown
// files in src/data via src/lib/case-studies.ts.
//
// To add/remove an entry, edit the relevant array below. Icons are either
// FontAwesome `IconDefinition`s (rendered with <FontAwesomeIcon />) for
// contacts, or `IconType`-compatible components for learning/experience
// (mostly react-icons; AWS experience uses a small FontAwesome wrapper to
// match the brand glyph).
import type { ComponentType } from "react";import type { IconType } from "react-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AzmIcon } from "@/app/components/AzmIcon";
import { ManafaIcon } from "@/app/components/ManafaIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { SiBackstage } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";

type CertIcon = ComponentType<{ className?: string }>;

export type ContactLink = {
  label: string;
  handle: string;
  value: string;
  icon: IconDefinition;
};

export type Certification = {
  name: string;
  /** Compact label shown on narrow screens so cert rows never ellipsize. */
  short?: string;
  date: string;
  order: number;
  url: string;
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
    short: "GCP Prof. Cloud Architect",
    date: "May 2026",
    order: 10,
    url: "https://www.credly.com/badges/f576ddd7-17b9-4a15-aa0e-86dca295cc37/public_url",
  },
  {
    name: "Certified Kubernetes Security Specialist",
    short: "CKS - Kubernetes Security",
    date: "Feb 2026",
    order: 8,
    url: "https://www.credly.com/badges/6d3a6109-76a3-4873-9305-5679d128f6ba/public_url",
  },
  {
    name: "CNCF Kubestronaut",
    short: "Kubestronaut",
    date: "Feb 2026",
    order: 9,
    url: "https://www.cncf.io/training/kubestronaut/?_sft_lf-country=sa#:~:text=Ali-,Aljaffer,-(He/Him)",
  },
  {
    name: "Certified Kubernetes Administrator",
    short: "CKA - Kubernetes Admin",
    date: "Dec 2025",
    order: 7,
    url: "https://www.credly.com/badges/460fb1fe-342c-45e0-8b17-c6225e43ec7a/public_url",
  },
  {
    name: "Certified Kubernetes Application Developer",
    short: "CKAD - Kubernetes Dev",
    date: "Dec 2025",
    order: 6,
    url: "https://www.credly.com/badges/574c7848-77e6-4c25-a1b6-d7d4f70a130c/public_url",
  },
  {
    name: "Terraform Associate",
    date: "Aug 2025",
    order: 5,
    url: "https://www.credly.com/badges/2abf40d1-88d1-4d75-a79e-73d1c7ec94d9/public_url",
  },
  {
    name: "AWS Solutions Architect - Associate",
    short: "AWS SA - Associate",
    date: "Jul 2025",
    order: 4,
    url: "https://www.credly.com/badges/90df08a0-de5d-4eab-9ed3-013e17556f71/public_url",
  },
];

export const learning: LearningTopic[] = [
  { name: "Golang", icon: FaGolang, url: "https://go.dev" },
  { name: "Backstage", icon: SiBackstage, url: "https://backstage.io" },
];

export const experienceData: Experience[] = [
  {
    company: "Saudi AZM",
    title: "Platform Engineer",
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
