import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
    const [workspaceOpen, setWorkspaceOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Top Navigation */}
            <header className="border-b border-slate-800 bg-slate-900">

                <div className="flex h-16 items-center justify-between px-6">

                    {/* Logo */}
                    <div>
                        <h1 className="text-2xl font-bold">
                            SkillForge
                        </h1>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">

                        {/* Workspace Dropdown */}
                        <div className="relative">

                            <button
                                onClick={() =>
                                    setWorkspaceOpen(!workspaceOpen)
                                }
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                            >
                                Workspace

                                <span
                                    className={`inline-flex transition-transform duration-300 ${
                                        workspaceOpen
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </span>
                            </button>

                            {workspaceOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-xl">

                                    <NavLink
                                        to="/dashboard"
                                        onClick={() =>
                                            setWorkspaceOpen(false)
                                        }
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        Overview
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/learning"
                                        onClick={() =>
                                            setWorkspaceOpen(false)
                                        }
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        Learning
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/dsa"
                                        onClick={() =>
                                            setWorkspaceOpen(false)
                                        }
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        DSA
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/patterns"
                                        onClick={() =>
                                            setWorkspaceOpen(false)
                                        }
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        Patterns
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/projects"
                                        onClick={() =>
                                            setWorkspaceOpen(false)
                                        }
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        Projects
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/resumes"
                                        onClick={() =>
                                            setWorkspaceOpen(false)
                                        }
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                    >
                                        Resumes
                                    </NavLink>

                                </div>
                            )}

                        </div>

                        {/* Profile */}
                        <button className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white">
                            Profile
                        </button>

                    </div>

                </div>

            </header>

            {/* Main Content */}
            <main className="min-h-[calc(100vh-4rem)]">

                <div className="mx-auto max-w-7xl px-6 py-8">

                    <Outlet />

                </div>

            </main>

        </div>
    );
}

export default DashboardLayout;