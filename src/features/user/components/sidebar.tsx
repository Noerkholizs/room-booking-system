import { Navigation } from "./navigation";


export const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <Navigation />
    </aside>
    );
};