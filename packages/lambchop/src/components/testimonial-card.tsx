import * as React from "react";
import { cn } from "../lib/cn";

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatarUrl,
  rating,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "rounded-card border-2 border-foreground/40 p-6",
        className,
      )}
      {...props}
    >
      {/* decorative quote mark */}
      <span className="font-display text-4xl leading-none text-primary" aria-hidden="true">
        &ldquo;
      </span>

      {rating && (
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={cn("h-4 w-4", i < rating ? "text-primary" : "text-muted-foreground")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <blockquote className="text-sm leading-relaxed text-foreground">
        {quote}
      </blockquote>

      <div className="mt-4 flex items-center gap-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={author}
            className="h-10 w-10 rounded-full border-2 border-foreground/20 object-cover"
          />
        )}
        <div>
          <div className="text-sm font-semibold text-foreground">{author}</div>
          {role && (
            <div className="text-xs text-muted-foreground">{role}</div>
          )}
        </div>
      </div>
    </div>
  );
}
