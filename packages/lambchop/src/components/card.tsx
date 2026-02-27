import * as React from "react";
import { cn } from "../lib/cn";

/* ---------- sub-components ---------- */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("flex flex-col gap-1.5 p-6 pb-0", className)} {...props} />;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("font-display text-xl uppercase tracking-wider text-card-foreground", className)}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
}

/* ---------- root ---------- */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardRoot({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border-2 border-surface-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
