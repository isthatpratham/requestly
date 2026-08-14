import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  description,
  actions,
  badge,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 pb-6 pt-2 md:flex-row md:items-end md:justify-between border-b border-border-default mb-8",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        {badge && <div className="mb-2">{badge}</div>}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-normal text-text-secondary max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 pt-2 md:pt-0 shrink-0">{actions}</div>}
    </div>
  );
};
