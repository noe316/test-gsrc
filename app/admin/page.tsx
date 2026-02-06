import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect("/admin/login");
    }

    // Fetch site content
    const { data: content, error: contentError } = await supabase
      .from("site_content")
      .select("*")
      .order("section", { ascending: true });

    if (contentError) {
      console.error("[v0] Content fetch error:", contentError);
    }

    return <AdminDashboard user={user} initialContent={content || []} />;
  } catch (error) {
    console.error("[v0] Admin page error:", error);
    redirect("/admin/login");
  }
}
