import { AdminNavigation } from "./navigation";

export const AdminSidebar = () => {
  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <AdminNavigation />
    </aside>
  );
};