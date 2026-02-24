import KpiCardDemo from "./KpiCardDemo";
import MetricTrendDemo from "./MetricTrendDemo";
import SparklineDemo from "./SparklineDemo";
import ComparisonRowDemo from "./ComparisonRowDemo";
import BarChartDemo from "./BarChartDemo";
import LineChartDemo from "./LineChartDemo";
import AreaChartDemo from "./AreaChartDemo";
import DataTableDemo from "./DataTableDemo";
import FilterBarDemo from "./FilterBarDemo";
import DateRangePickerDemo from "./DateRangePickerDemo";
import SidebarNavDemo from "./SidebarNavDemo";
import PageHeaderDemo from "./PageHeaderDemo";
import ButtonDemo from "./ButtonDemo";
import BadgeDemo from "./BadgeDemo";
import CardDemo from "./CardDemo";
import SectionDemo from "./SectionDemo";
import StatCardDemo from "./StatCardDemo";
import TestimonialCardDemo from "./TestimonialCardDemo";
import PricingCardDemo from "./PricingCardDemo";
import LogoGridDemo from "./LogoGridDemo";
import FooterDemo from "./FooterDemo";
import FadeInDemo from "./FadeInDemo";
import ScaleInDemo from "./ScaleInDemo";
import StaggerContainerDemo from "./StaggerContainerDemo";

const demoMap: Record<string, React.ComponentType> = {
  "kpi-card": KpiCardDemo,
  "metric-trend": MetricTrendDemo,
  sparkline: SparklineDemo,
  "comparison-row": ComparisonRowDemo,
  "bar-chart": BarChartDemo,
  "line-chart": LineChartDemo,
  "area-chart": AreaChartDemo,
  "data-table": DataTableDemo,
  "filter-bar": FilterBarDemo,
  "date-range-picker": DateRangePickerDemo,
  "sidebar-nav": SidebarNavDemo,
  "page-header": PageHeaderDemo,
  button: ButtonDemo,
  badge: BadgeDemo,
  card: CardDemo,
  section: SectionDemo,
  "stat-card": StatCardDemo,
  "testimonial-card": TestimonialCardDemo,
  "pricing-card": PricingCardDemo,
  "logo-grid": LogoGridDemo,
  footer: FooterDemo,
  "fade-in": FadeInDemo,
  "scale-in": ScaleInDemo,
  "stagger-container": StaggerContainerDemo,
};

export default function DemoRenderer({ slug }: { slug: string }) {
  const Demo = demoMap[slug];
  if (!Demo) return null;
  return <Demo />;
}
