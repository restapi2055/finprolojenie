import LucideIcon from "./LucideIcon";
import type { Skill } from "@/data/mockData";

interface SkillBarProps {
  skill: Skill;
  maxSkillLevel?: number;
}

const SkillBar = ({ skill, maxSkillLevel = 10 }: SkillBarProps) => {

  const percent = (skill.level / maxSkillLevel) * 60;

  return (
    <div className="flex items-center gap-3">
      <LucideIcon name={skill.icon} size={18} className="text-primary shrink-0" />
      <div className="flex-1">
        <span className="text-xs font-semibold text-gray-900 mb-1 block">{skill.name}</span>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillBar;

