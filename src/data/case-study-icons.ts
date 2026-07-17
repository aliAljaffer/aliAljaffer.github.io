// Registry of icons available to case-study frontmatter (`icon: SiKubernetes`).
// Hand-picked imports only, not a dynamic lookup across all of react-icons,
// so the bundle only ships icons actually referenced and a typo in
// frontmatter just renders nothing instead of importing everything.
import type { IconType } from "react-icons";
import {
  SiKubernetes,
  SiHuggingface,
  SiGithub,
  SiRaspberrypi,
  SiK3S,
  SiGithubactions,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import { RiAlibabaCloudLine, RiShapesLine } from "react-icons/ri";
import { TbChartDots3 } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import { PiCatThin, PiBinoculars } from "react-icons/pi";
import { AiOutlineKubernetes } from "react-icons/ai";
import { MdMoneyOff } from "react-icons/md";
import { CgGym } from "react-icons/cg";

export const caseStudyIcons: Record<string, IconType> = {
  SiKubernetes,
  MdMoneyOff,
  SiGithubactions,
  CgGym,
  AiOutlineKubernetes,
  TbChartDots3,
  SiHuggingface,
  PiBinoculars,
  PiCatThin,
  SiGithub,
  SiRaspberrypi,
  FaGolang,
  SiK3S,
  RxUpdate,
  VscAzure,
  RiAlibabaCloudLine,
  RiShapesLine,
};
