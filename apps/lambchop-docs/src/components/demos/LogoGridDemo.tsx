import { LogoGrid } from "lmbchp";

const logos = [
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=lambgoat", alt: "lambgoat" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=noecho", alt: "noecho" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=ghostcult", alt: "ghost cult" },
  { src: "https://placehold.co/120x40/1a1a1a/e6ddd0?text=metalinsider", alt: "metal insider" },
];

export default function LogoGridDemo() {
  return <LogoGrid logos={logos} columns={4} />;
}
