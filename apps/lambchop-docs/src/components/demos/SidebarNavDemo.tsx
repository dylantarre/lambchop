import { useState } from "react";
import { SidebarNav, type NavItem } from "lambchop";

const items: NavItem[] = [
  {
    label: "Dashboard",
    href: "#",
    active: true,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 2h5v5H2V2zm7 0h5v5H9V2zm-7 7h5v5H2V9zm7 0h5v5H9V9z" />
      </svg>
    ),
  },
  {
    label: "Revenue",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a.5.5 0 0 1 .5.5v2.793l1.854-1.853a.5.5 0 0 1 .707.707L9.207 5H12.5a.5.5 0 0 1 0 1H8.5v4h4a.5.5 0 0 1 0 1H8.5v3.5a.5.5 0 0 1-1 0V11h-4a.5.5 0 0 1 0-1h4V6H3.5a.5.5 0 0 1 0-1h3.793L5.44 3.147a.5.5 0 1 1 .707-.707L8 4.293V1.5A.5.5 0 0 1 8 1z" />
      </svg>
    ),
  },
  {
    label: "Writers",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
      </svg>
    ),
  },
  {
    label: "Articles",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        <path d="M4.5 3h7v1h-7V3zm0 2h7v1h-7V5zm0 2h4v1h-4V7z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
      </svg>
    ),
  },
];

export default function SidebarNavDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-72 overflow-hidden rounded-card border border-surface-border">
      <SidebarNav
        items={items}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        header={
          <span className="text-sm font-semibold text-text">
            {collapsed ? "LGM" : "LGM Dashboard"}
          </span>
        }
      />
    </div>
  );
}
