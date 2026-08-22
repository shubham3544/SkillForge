import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
      <div className="min-h-screen bg-slate-950 text-white" >
          <div className="flex min-h-screen">
             <aside className="w-64  border-r border-slate-800 bg-slate-900">
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    SkillForge
                  </h1>
                </div>

                <nav>
                    <p className="px-2 text-sm text-slate-500">
                        Navigation
                    </p>
                </nav>
            </aside>

            <main className="flex-1">
                <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
                    <h2 className="text-lg font-semibold">
                        Dashboard
                    </h2>
                </header>

                <section>
                    <Outlet />
                </section>
            </main>
          </div>
      </div>
    );
}

export default DashboardLayout;