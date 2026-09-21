import { createFileRoute } from "@tanstack/react-router";
import { Platform } from "@/components/operations-platform";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "综合态势看板 — 智维云设备运维平台" }, { name: "description", content: "工业设备综合态势、运行健康与实时故障监控。" }, { property: "og:title", content: "综合态势看板 — 智维云" }, { property: "og:description", content: "工业设备综合态势、运行健康与实时故障监控。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <Platform page="overview" />;
}
