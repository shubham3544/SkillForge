import { useEffect, useState } from "react";
import { getDashboardOverview } from "../api/dashboard.api.js";


function Dashboard() {

    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await getDashboardOverview();

                console.log(
                    "Dashboard Overview:",
                    response
                );

                setOverview(response.data);

            } catch (error) {

                console.error(
                    "Dashboard Error:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);


    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <p className="text-slate-400">
                    Loading dashboard...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <p className="text-red-400">
                    {error}
                </p>

            </div>
        );

    }


    return (
        <div>

            {/* Dashboard Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-400">
                    Track your development progress.
                </p>

            </div>


            {/* Overview Cards */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">


                {/* DSA Card */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">
                        DSA Problems
                    </p>

                    <div className="mt-4">

                        <span className="text-4xl font-bold">
                            {overview.dsa.solved}
                        </span>

                        <span className="ml-2 text-slate-500">
                            / {overview.dsa.total}
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                        Problems solved
                    </p>

                </div>


                {/* Patterns Card */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">
                        Patterns
                    </p>

                    <div className="mt-4">

                        <span className="text-4xl font-bold">
                            {overview.patterns.total}
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                        Patterns created
                    </p>

                </div>


                {/* Projects Card */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">
                        Projects
                    </p>

                    <div className="mt-4">

                        <span className="text-4xl font-bold">
                            {overview.projects.total}
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                        Total projects
                    </p>

                </div>


            </div>

        </div>
    );
}


export default Dashboard;