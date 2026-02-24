import { motion } from "framer-motion";
import { CheckCircle, Clock, Briefcase, Zap, Tag } from "lucide-react";
import { differenceInDays, differenceInHours, parseISO, format } from "date-fns";
import CoinBadge from "./CoinBadge";
import LucideIcon from "./LucideIcon";
import type { Task } from "@/data/mockData";

interface TaskCardProps {
  task: Task;
  onComplete?: (id: string) => void;
  muted?: boolean;
}

const TaskCard = ({ task, onComplete, muted }: TaskCardProps) => {
  const isOverdue = (() => {
    if (!task.deadline || task.completed) return false;
    return differenceInHours(parseISO(task.deadline), new Date()) < 0;
  })();

  const getDeadlineInfo = () => {
    if (!task.deadline || task.completed) return null;
    const now = new Date();
    const deadline = parseISO(task.deadline);
    const daysLeft = differenceInDays(deadline, now);
    const hoursLeft = differenceInHours(deadline, now);
    const isUrgent = daysLeft < 1;
    const dateStr = format(deadline, "dd.MM.yyyy");

    let timeLeftStr: string;
    if (hoursLeft < 0) timeLeftStr = "Просрочено";
    else if (daysLeft < 1) timeLeftStr = `Осталось ${hoursLeft} ч.`;
    else timeLeftStr = `Осталось ${daysLeft} дн.`;

    return { dateStr, timeLeftStr, isUrgent: isUrgent || hoursLeft < 0 };
  };

  const deadlineInfo = getDeadlineInfo();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 transition-opacity pointer-events-none select-none ${
        muted ? "opacity-50" : task.completed ? "opacity-60" : ""
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          task.completed
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {task.completed ? <CheckCircle size={20} /> : <LucideIcon name={task.icon} size={20} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4 className={`font-semibold text-sm truncate ${muted ? "text-gray-400" : task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
            {task.title}
          </h4>
          {task.category && (
            <span className="text-[10px] text-gray-400 px-1.5 py-0.5 rounded-full font-medium shrink-0 inline-flex items-center gap-0.5 border border-gray-200">
              <Tag size={8} /> {task.category}
            </span>
          )}
        </div>
        <p className={`text-xs truncate ${muted ? "text-gray-300" : "text-gray-500"}`}>{task.description}</p>
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          {task.profession && (
            <span className="text-[10px] text-blue-400 px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-0.5 border border-blue-200">
              <Briefcase size={8} /> {task.profession}
            </span>
          )}
          {task.skill && (
            <span className="text-[10px] text-amber-400 px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-0.5 border border-amber-200">
              <Zap size={8} /> {task.skill}
            </span>
          )}
          {deadlineInfo && (
            <span className={`text-[10px] font-medium inline-flex items-center gap-0.5 ${deadlineInfo.isUrgent ? "text-destructive" : "text-gray-400"}`}>
              <Clock size={10} /> {deadlineInfo.dateStr} · {deadlineInfo.timeLeftStr}
            </span>
          )}
          {muted && task.completedAt && (
            <span className="text-[10px] text-gray-300 font-medium inline-flex items-center gap-0.5">
              <Clock size={10} /> Выполнено: {format(parseISO(task.completedAt), "dd.MM.yyyy HH:mm")}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {task.completionPhoto && task.completed && (
          <img
            src={task.completionPhoto}
            alt="Фото выполнения"
            className="w-10 h-10 rounded-xl object-cover border border-gray-200"
          />
        )}
        {isOverdue ? (
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 line-through">{task.reward} FIN</span>
            <CoinBadge amount={Math.floor(task.reward / 2)} size="sm" />
          </div>
        ) : (
          <CoinBadge amount={task.reward} size="sm" />
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
