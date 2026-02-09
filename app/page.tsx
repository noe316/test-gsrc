import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/crew/navigation"
import { Hero } from "@/components/crew/hero"
import { About } from "@/components/crew/about"
import { Rules } from "@/components/crew/rules"
import { Training } from "@/components/crew/training"
import { Join } from "@/components/crew/join"
import { Footer } from "@/components/crew/footer"

// Deploy trigger
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient()
  const { data: content, error } = await supabase
    .from("site_content")
    .select("*")
    .order("section", { ascending: true })

  if (error) {
    console.error("Error fetching content:", error);
  } else {
    console.log("Fetched content count:", content?.length);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero content={content || []} />
      <About content={content || []} />
      <Rules content={content || []} />
      <Training content={content || []} />
      <Join content={content || []} />
      <Footer />
    </main>
  )
}
