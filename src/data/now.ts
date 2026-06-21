import { IconType } from "react-icons";
import { SiBackstage } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { RiAlibabaCloudLine } from "react-icons/ri";

type LearningTopic = {
  name: string;
  icon: IconType;
  url: string;
};
export const learning: LearningTopic[] = [
  {
    name: "Go",
    icon: FaGolang,
    url: "https://go.dev",
  },
  { name: "Backstage", icon: SiBackstage, url: "https://backstage.io" },
  {
    name: "Alibaba Cloud",
    icon: RiAlibabaCloudLine,
    url: "https://sccc.sa",
  },
];
