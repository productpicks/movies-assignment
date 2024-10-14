import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex h-[100vh] bg-background w-full p-4 sml:p-16">
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
