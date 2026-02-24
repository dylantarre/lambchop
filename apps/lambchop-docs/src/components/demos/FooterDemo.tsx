import { Footer } from "lmbchp";

export default function FooterDemo() {
  return (
    <div className="-mx-10 -mb-8">
      <Footer
        columns={[
          {
            heading: "Network",
            links: [
              { label: "lambgoat", href: "#" },
              { label: "noecho", href: "#" },
              { label: "ghost cult", href: "#" },
            ],
          },
          {
            heading: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" },
            ],
          },
          {
            heading: "Resources",
            links: [
              { label: "Blog", href: "#" },
              { label: "Documentation", href: "#" },
            ],
          },
          {
            heading: "Legal",
            links: [
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ],
          },
        ]}
      />
    </div>
  );
}
