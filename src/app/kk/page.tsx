import { SiteHome } from "@/components/SiteHome";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("kk");

export default function Page() {
  return <SiteHome lang="kk" />;
}
