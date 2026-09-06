// Per-post icons, keyed by caseStudyId (the markdown file name). Hand-picked
// react-icons imports only, so the bundle only ships icons actually mapped.
import type { IconType } from "react-icons";
import {
  SiHuggingface,
  SiGithub,
  SiRaspberrypi,
  SiK3S,
  SiTalos,
  SiGithubactions,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { BiHeadphone } from "react-icons/bi";
import { VscAzure } from "react-icons/vsc";
import { RiAlibabaCloudLine, RiShapesLine } from "react-icons/ri";
import { TbChartDots3 } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import { PiCatThin, PiBinoculars } from "react-icons/pi";
import { AiOutlineKubernetes } from "react-icons/ai";
import { MdMoneyOff } from "react-icons/md";
import { CgGym } from "react-icons/cg";

export const postIcons: Record<string, IconType> = {
  "airpods-status": BiHeadphone,
  "alb-in-ack": RiAlibabaCloudLine,
  "author-clock": SiRaspberrypi,
  "aws-budget-discord-notifs": MdMoneyOff,
  "azure-3t-app": VscAzure,
  "body-power-gym": CgGym,
  "catus-locatus": PiCatThin,
  "certification-roadmap": RiShapesLine,
  "deployment-strategies": RxUpdate,
  "e2e-automated-deployment-azure": SiGithubactions,
  homelab: SiTalos,
  "image-captioning": SiHuggingface,
  "k3s-homelab": SiK3S,
  "k8s-adventures": AiOutlineKubernetes,
  "k8s-adventures-pt2": AiOutlineKubernetes,
  keda: TbChartDots3,
  s2t: FaGolang,
  "teamwork-and-collaboration": SiGithub,
  "tuwaiq-tracker": PiBinoculars,
};
