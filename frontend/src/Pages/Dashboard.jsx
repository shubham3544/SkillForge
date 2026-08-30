import { useEffect, useState } from "react";
import { getDashboardOverview,
         getLeetCodeDashboard
 } from "../api/dashboard.api.js";
import StatCard from "../components/Dashboard/StatCard.jsx";
import LeetCodeCard from "../components/Dashboard/LeetCodeCard.jsx";

function Dashboard() { 

    const [overview, setOverview] = useState(null);
    const [leetcode, setLeetcode] = useState(null);
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

                const leetcodeResponse = await getLeetCodeDashboard();

                console.log(
                    "LeetCode Dashboard:",
                    leetcodeResponse
                );

                setLeetcode(leetcodeResponse.data);

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

            <div className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                lg:grid-cols-3
            ">
            
               <StatCard
                   title="DSA Problems"
                   value={`${overview.dsa.solved} / ${overview.dsa.total}`}
                   subtitle={`${overview.dsa.todo} problems remaining`}
                   progress={
                       overview.dsa.total > 0
                           ? Math.round(
                               (overview.dsa.solved /
                                   overview.dsa.total) * 100
                           )
                           : 0
                   }
                   icon="◈"
               />
                
            
            
                <StatCard
                    title="Patterns"
                    value={overview.patterns.total}
                    subtitle="Patterns created"
                    icon="◆"
                />
            
            
               <StatCard
                    title="Projects"
                    value={overview.projects.total}
                    subtitle={`
                        ${overview.projects.inProgress} in progress •
                        ${overview.projects.completed} completed
                    `}
                    icon="◇"
                />

                {/* LeetCode */}

                <div className="mt-6">
                
                    {leetcode && (
                        <LeetCodeCard
                            leetcode={leetcode}
                        />
                    )}
                
                </div>
            
            </div>
            
                    </div>
                );
            }


export default Dashboard;