export interface ComponentMeta {
  name: string;
  slug: string;
  description: string;
  category: "Primitives" | "Data Display" | "Charts" | "Data Management" | "Layout" | "Marketing" | "Animation";
  sourceFile: string;
  storyId: string;
}

export const components: ComponentMeta[] = [
  // Primitives
  {
    name: "Button",
    slug: "button",
    description: "Multi-variant button with CVA styling and Radix Slot for asChild composition.",
    category: "Primitives",
    sourceFile: "button.tsx",
    storyId: "components-button",
  },
  {
    name: "Badge",
    slug: "badge",
    description: "Rounded pill label with default, primary, outline, and muted variants.",
    category: "Primitives",
    sourceFile: "badge.tsx",
    storyId: "components-badge",
  },
  {
    name: "Card",
    slug: "card",
    description: "Compound component with Header, Title, Description, Content, and Footer sub-components.",
    category: "Primitives",
    sourceFile: "card.tsx",
    storyId: "components-card",
  },
  // Data Display
  {
    name: "KpiCard",
    slug: "kpi-card",
    description:
      "Key performance indicator card with optional trend, sparkline, and icon.",
    category: "Data Display",
    sourceFile: "kpi-card.tsx",
    storyId: "components-kpicard",
  },
  {
    name: "MetricTrend",
    slug: "metric-trend",
    description: "Compact metric display with delta percentage indicator.",
    category: "Data Display",
    sourceFile: "metric-trend.tsx",
    storyId: "components-metrictrend",
  },
  {
    name: "ComparisonRow",
    slug: "comparison-row",
    description:
      "Side-by-side comparison of current vs previous values with delta.",
    category: "Data Display",
    sourceFile: "comparison-row.tsx",
    storyId: "components-comparisonrow",
  },
  {
    name: "Sparkline",
    slug: "sparkline",
    description: "Compact inline SVG chart for trend visualization.",
    category: "Data Display",
    sourceFile: "sparkline.tsx",
    storyId: "components-sparkline",
  },
  // Charts
  {
    name: "BarChart",
    slug: "bar-chart",
    description:
      "Multi-series bar chart with vertical and horizontal layouts.",
    category: "Charts",
    sourceFile: "bar-chart.tsx",
    storyId: "components-barchart",
  },
  {
    name: "LineChart",
    slug: "line-chart",
    description: "Line chart with multiple lines, tooltips, and legends.",
    category: "Charts",
    sourceFile: "line-chart.tsx",
    storyId: "components-linechart",
  },
  {
    name: "AreaChart",
    slug: "area-chart",
    description: "Stacked area chart with gradient fills.",
    category: "Charts",
    sourceFile: "area-chart.tsx",
    storyId: "components-areachart",
  },
  // Data Management
  {
    name: "DataTable",
    slug: "data-table",
    description:
      "Feature-rich table with sorting, pagination, and search.",
    category: "Data Management",
    sourceFile: "data-table.tsx",
    storyId: "components-datatable",
  },
  {
    name: "FilterBar",
    slug: "filter-bar",
    description: "Dropdown filter system with single and multi-select.",
    category: "Data Management",
    sourceFile: "filter-bar.tsx",
    storyId: "components-filterbar",
  },
  {
    name: "DateRangePicker",
    slug: "date-range-picker",
    description: "Date range selector with configurable presets.",
    category: "Data Management",
    sourceFile: "date-range-picker.tsx",
    storyId: "components-daterangepicker",
  },
  // Layout
  {
    name: "SidebarNav",
    slug: "sidebar-nav",
    description: "Collapsible sidebar navigation with icons and active states.",
    category: "Layout",
    sourceFile: "sidebar-nav.tsx",
    storyId: "components-sidebarnav",
  },
  {
    name: "PageHeader",
    slug: "page-header",
    description: "Page title with breadcrumbs, description, and action slots.",
    category: "Layout",
    sourceFile: "page-header.tsx",
    storyId: "components-pageheader",
  },
  {
    name: "Section",
    slug: "section",
    description: "Page section wrapper with default, muted, and bordered variants.",
    category: "Layout",
    sourceFile: "section.tsx",
    storyId: "components-section",
  },
  // Marketing
  {
    name: "StatCard",
    slug: "stat-card",
    description: "Inverted display card with large value and decorative corner dots.",
    category: "Marketing",
    sourceFile: "stat-card.tsx",
    storyId: "components-statcard",
  },
  {
    name: "TestimonialCard",
    slug: "testimonial-card",
    description: "Quote card with decorative mark, star rating, and author attribution.",
    category: "Marketing",
    sourceFile: "testimonial-card.tsx",
    storyId: "components-testimonialcard",
  },
  {
    name: "PricingCard",
    slug: "pricing-card",
    description: "Pricing tier card with feature list, badge, and CTA button.",
    category: "Marketing",
    sourceFile: "pricing-card.tsx",
    storyId: "components-pricingcard",
  },
  {
    name: "LogoGrid",
    slug: "logo-grid",
    description: "Responsive logo grid with grayscale-to-color hover effect.",
    category: "Marketing",
    sourceFile: "logo-grid.tsx",
    storyId: "components-logogrid",
  },
  {
    name: "Footer",
    slug: "footer",
    description: "Multi-column footer with link groups and bottom bar.",
    category: "Marketing",
    sourceFile: "footer.tsx",
    storyId: "components-footer",
  },
  // Animation
  {
    name: "FadeIn",
    slug: "fade-in",
    description: "Scroll-triggered fade animation with directional variants.",
    category: "Animation",
    sourceFile: "fade-in.tsx",
    storyId: "components-fadein",
  },
  {
    name: "ScaleIn",
    slug: "scale-in",
    description: "Scroll-triggered scale entrance animation.",
    category: "Animation",
    sourceFile: "scale-in.tsx",
    storyId: "components-scalein",
  },
  {
    name: "StaggerContainer",
    slug: "stagger-container",
    description: "Container that staggers child entrance animations with configurable delay.",
    category: "Animation",
    sourceFile: "stagger-container.tsx",
    storyId: "components-staggercontainer",
  },
];

export const categories = [
  "Primitives",
  "Data Display",
  "Charts",
  "Data Management",
  "Layout",
  "Marketing",
  "Animation",
] as const;

export function getComponentsByCategory() {
  return categories.map((cat) => ({
    category: cat,
    items: components.filter((c) => c.category === cat),
  }));
}
