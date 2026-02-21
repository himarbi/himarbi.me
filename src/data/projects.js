export const projects = [
    {
        id: 1,
        title: "Enterprise Dashboard Application",
        description: "A comprehensive dashboard for enterprise data visualization and management, handling complex datasets with real-time updates.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "TypeScript", "Chakra UI", "Redux", "Recharts"],
        problem: "The client needed a way to consolidate multiple data streams into a single, high-performance dashboard without lagging under heavy load.",
        solution: "Implemented a virtualization strategy for tables and fine-grained state management to reduce render cycles, paired with a custom dark/light theme.",
        results: "Improved dashboard load time by 40% and received 98% positive feedback from internal users on the new UI.",
        githubLink: "https://github.com/himarbi",
        liveLink: "#"
    },
    {
        id: 2,
        title: "SaaS Marketing Platform",
        description: "A fast, SEO-optimized marketing website built for a B2B SaaS company focusing on conversion and accessibility.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
        problem: "The previous marketing site was slow, non-responsive, and lacked a cohesive design language.",
        solution: "Rebuilt from the ground up using React and Framer Motion for smooth animations, ensuring all interactive elements are keyboard navigable.",
        results: "Increased organic traffic by 25% and boosted the conversion rate significantly.",
        githubLink: "https://github.com/himarbi",
        liveLink: "#"
    },
    {
        id: 3,
        title: "E-Commerce Checkout Flow",
        description: "A streamlined, accessible checkout flow for a major retail brand, optimizing the user journey from cart to purchase.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "React Query", "Jest", "React Testing Library"],
        problem: "High cart abandonment rate due to a clunky, multi-step checkout process that confused users.",
        solution: "Redesigned as a seamless single-page checkout flow with inline validation, robust error handling, and comprehensive unit tests.",
        results: "Reduced cart abandonment by 15% within the first month of deployment.",
        githubLink: "https://github.com/himarbi",
        liveLink: "#"
    },
    {
        id: 4,
        title: "Design System Library",
        description: "An internal collection of reusable bespoke UI components used across multiple company applications.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Storybook", "Chakra UI", "Rollup"],
        problem: "Inconsistent UI patterns across different teams and difficult maintenance for global design updates.",
        solution: "Built a centralized component library exported as an NPM package, wrapped in Chakra UI styles for easy consumption.",
        results: "Cut down new feature development time by 30% across 5 development teams.",
        githubLink: "https://github.com/himarbi",
        liveLink: "#"
    }
];
