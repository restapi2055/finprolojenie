import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User, Users } from "lucide-react";

interface PageHeaderProps {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  hideNavIcons?: boolean;
}

const PageHeader = ({ title, icon, subtitle, children, rightContent, leftContent, hideNavIcons }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[hsl(245,60%,18%)] rounded-b-3xl -mx-4 -mt-4 px-5 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {leftContent}
          <h1 className="text-2xl font-extrabold text-white tracking-tight inline-flex items-center gap-2">
            {title} {icon}
          </h1>
        </div>
        <div className="flex items-center gap-1.5">
          {!hideNavIcons && (
            <div className="flex gap-1.5">
              {[
                { path: "/profile", Icon: User },
                { path: "/friends", Icon: Users },
              ].map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white transition-all"
                >
                  <item.Icon size={22} />
                </button>
              ))}
            </div>
          )}
          {rightContent}
        </div>
      </div>
      {subtitle && <p className="text-sm text-white/60 mt-1">{subtitle}</p>}
      {children}
    </div>
  );
};

export default PageHeader;

