import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-sm border border-border-default bg-background-elevated space-y-3 my-4",
        className
      )}
      {...props}
    >
      <div className="space-y-1 max-w-sm">
        <h3 className="text-sm font-semibold text-text-primary tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs font-normal text-text-secondary leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
