import { CaseStudy, CaseStudies } from "@/app/types";

const caseStudies: CaseStudies = {
  "image-captioning": {
    name: "Image Captioning with AWS and HuggingFace",
    caseStudyId: "image-captioning",
    description:
      "A serverless image captioning app using AWS services and a HuggingFace model on SageMaker.",
    repo: "",
    url: "https://textify.alialjaffer.com/",
    images: [
      {
        caption: "Step 1: Selecting an image to upload",
        "alt-text": "",
        url: "https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/image-captioning/photo.png",
      },
      {
        caption: "Step 2: Uploading the image and waiting for processing",
        "alt-text": "",
        url: "https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/image-captioning/loading.png",
      },
      {
        caption: "Step 3: Result is shown",
        "alt-text": "",
        url: "https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/image-captioning/result.png",
      },
    ],
    show: true,
  },
  "tuwaiq-tracker": {
    name: "Tuwaiq Tracker",
    caseStudyId: "tuwaiq-tracker",
    repo: "https://github.com/aliAljaffer/tuwaiq-tracker",
    url: "https://tuwaiqtracker.com/",
    description:
      "Responsive full-stack tracker that scrapes, stores, and displays course offerings from Tuwaiq Academy using Next.js and MongoDB.",
    images: [
      {
        caption: "Wide-screen view of the website, on an iPad screen",
        "alt-text": "",
        url: "https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/tuwaiq-academy/FinalDraft-Wide.png",
      },
      {
        caption: "Mobile view of the website",
        "alt-text": "",
        url: "https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/tuwaiq-academy/FinalDraft-Mobile.png",
      },
    ],
    show: true,
  },
  "catus-locatus": {
    name: "Catus Locatus",
    caseStudyId: "catus-locatus",
    repo: "https://github.com/aliAljaffer/catus-locatus",
    url: "https://cl.alialjaffer.com/",
    description:
      "Location-based pet recovery web app using React and Leaflet maps to report and view lost pets.",
    images: [
      {
        caption: "",
        "alt-text": "",
        url: "",
      },
    ],
    show: true,
  },
  "body-power-gym": {
    name: "Body & Power Gym",
    caseStudyId: "body-power-gym",
    repo: "",
    url: "",
    description:
      "Volunteer-built website for a local gym using Next.js, Docker, and Strapi CMS for fully managed and responsive content delivery.",
    images: [
      {
        caption: "",
        "alt-text": "",
        url: "",
      },
    ],
    show: false,
  },
  "soccer-predictor": {
    name: "Soccer Predictor",
    caseStudyId: "soccer-predictor",
    repo: "https://github.com/aliAljaffer/soccer-match-predictor",
    url: "",
    description:
      "Machine Learning project that predicts soccer outcomes using Python and data preprocessing techniques.",
    images: [
      {
        caption: "",
        "alt-text": "",
        url: "",
      },
    ],
    show: true,
  },
};

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies[id];
}

export function getAllCaseStudies(): CaseStudies {
  return caseStudies;
}

export function getAllCaseStudyIds(): string[] {
  return Object.keys(caseStudies);
}

export function getVisibleCaseStudies(): CaseStudy[] {
  return Object.values(caseStudies).filter((study) => study.show);
}
export default caseStudies;
