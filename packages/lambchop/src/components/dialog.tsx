import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../lib/cn";

const CONTENT_WIDTHS = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

export type DialogProps = RadixDialog.DialogProps;

function DialogRoot(props: DialogProps) {
  return <RadixDialog.Root {...props} />;
}

const DialogTrigger = RadixDialog.Trigger;

type RadixDialogContentProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Content>;

export interface DialogContentProps
  extends Omit<RadixDialogContentProps, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  maxWidth?: keyof typeof CONTENT_WIDTHS;
}

function DialogContent({
  className,
  children,
  title,
  description,
  maxWidth = "md",
  ...props
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-card border border-surface-border bg-surface p-6 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "max-h-[90vh] overflow-y-auto",
          CONTENT_WIDTHS[maxWidth],
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6 space-y-2">
            {title && (
              <RadixDialog.Title className="text-lg font-semibold text-text">
                {title}
              </RadixDialog.Title>
            )}
            {description && (
              <RadixDialog.Description className="text-sm text-text-secondary">
                {description}
              </RadixDialog.Description>
            )}
          </div>
        )}
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div className={cn("mt-6 flex items-center justify-end gap-3", className)} {...props} />
  );
}

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Footer: DialogFooter,
});
