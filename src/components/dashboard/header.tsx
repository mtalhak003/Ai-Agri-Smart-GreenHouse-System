import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="font-headline text-xl font-semibold">Dashboard</h1>
    </header>
  );
}
