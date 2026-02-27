import { BottomNav, type NavItem } from "lmbchp";

const items: NavItem[] = [
  {
    label: "Dashboard",
    href: "#",
    active: true,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    label: "Revenue",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 1v14M4.5 4C4.5 2.9 6 2 8 2s3.5.9 3.5 2-1.5 2-3.5 2-3.5.9-3.5 2 1.5 2 3.5 2 3.5.9 3.5 2-1.5 2-3.5 2-3.5-.9-3.5-2" />
      </svg>
    ),
  },
  {
    label: "Writers",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 14v-1a3 3 0 00-3-3H5a3 3 0 00-3 3v1M6.5 7a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
  {
    label: "Articles",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 3h12M2 6h12M2 9h8M2 12h6" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="8" cy="8" r="2" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
      </svg>
    ),
  },
];

export default function BottomNavDemo() {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-card border border-surface-border">
      <div className="space-y-2 p-4 pb-2">
        <div className="h-3 w-2/3 rounded bg-surface-tertiary" />
        <div className="h-3 w-full rounded bg-surface-tertiary" />
        <div className="h-3 w-1/2 rounded bg-surface-tertiary" />
      </div>
      <BottomNav items={items} fixed={false} />
    </div>
  );
}
