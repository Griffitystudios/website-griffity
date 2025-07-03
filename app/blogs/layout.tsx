import Breadcrumbs from "@/components/breadcrumbs";
import Footer from "@/components/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#081c26]">
        
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
