import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "../lib/cn";

export type ToastVariant = "default" | "success" | "error" | "warning";

export interface ToastOptions {
  id?: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  default: "bg-surface border-surface-border text-text",
  success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
  error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastOptions[]>([]);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = options.id ?? Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...options, id }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toastItem) => (
          <ToastPrimitive.Root
            key={toastItem.id}
            duration={toastItem.duration ?? 5000}
            open
            onOpenChange={(open: boolean) => {
              if (!open && toastItem.id) dismiss(toastItem.id);
            }}
            className={cn(
              "relative rounded-card border p-4 shadow-card",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
              "data-[state=closed]:fade-out-80 data-[swipe=end]:animate-out data-[state=closed]:slide-out-to-right-full",
              variantStyles[toastItem.variant ?? "default"],
            )}
          >
            {toastItem.title && (
              <ToastPrimitive.Title className="text-sm font-semibold">
                {toastItem.title}
              </ToastPrimitive.Title>
            )}
            <ToastPrimitive.Description className="mt-1 text-sm opacity-90">
              {toastItem.description}
            </ToastPrimitive.Description>
            <ToastPrimitive.Close className="absolute top-2 right-2 rounded-button p-1 opacity-60 transition-opacity hover:opacity-100">
              <span className="sr-only">Dismiss</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 flex w-full max-w-sm flex-col gap-2 p-4 sm:p-6" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
