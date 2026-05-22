import type { IconType } from "react-icons";
import {
  FaBriefcase,
  FaClock,
  FaGraduationCap,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";

export const jobCategoryItems = [
  {
    href: "/jobs/companies",
    icon: FaBriefcase,
    id: "open-jobs",
    name: "Vagas abertas",
  },
  { href: undefined, icon: FaUserTie, id: "freelancer", name: "Freelancer" },
  { href: undefined, icon: FaClock, id: "part-time", name: "Meio periodo" },
  { href: undefined, icon: FaGraduationCap, id: "internship", name: "Estagio" },
  {
    href: undefined,
    icon: FaUserGraduate,
    id: "young-apprentice",
    name: "Jovem aprendiz",
  },
] as const satisfies readonly {
  href?: string;
  icon: IconType;
  id: string;
  name: string;
}[];
