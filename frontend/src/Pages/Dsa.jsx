import { useEffect, useState } from "react";

import {
    createProblem,
    getAllProblems,
    deleteProblem,
    updateProblem,
} from "../api/dsa.api.js";

import DSAQuickAdd from "../components/DSA/DSAQuickAdd.jsx";
import DSAProblemRow from "../components/DSA/DSAProblemRow.jsx";
import DSAStatCard from "../components/DSA/DSAStatCard.jsx";


function DSA() {
    const [problems, setProblems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    // --------------------------------
    // Fetch Problems
    // --------------------------------

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setError("");

                const response = await getAllProblems();

                setProblems(response.data || []);
            } catch (error) {
                console.error(
                    "DSA Problems Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load DSA problems."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);


    // --------------------------------
    // Add Problem
    // --------------------------------

    const handleAddProblem = async (problemData) => {
        try {
            setAdding(true);
            setError("");

            await createProblem(problemData);

            const response = await getAllProblems();

            setProblems(response.data || []);
        } catch (error) {
            console.error(
                "Add DSA Problem Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to add DSA problem."
            );
        } finally {
            setAdding(false);
        }
    };


    // --------------------------------
    // Change Status
    // --------------------------------

    const handleStatusChange = async (
        problemId,
        status
    ) => {
        try {
            setError("");

            await updateProblem(
                problemId,
                {
                    status,
                }
            );

            setProblems((previousProblems) =>
                previousProblems.map((problem) =>
                    problem._id === problemId
                        ? {
                              ...problem,
                              status,
                          }
                        : problem
                )
            );
        } catch (error) {
            console.error(
                "Status Update Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update status."
            );
        }
    };


    // --------------------------------
    // Delete Problem
    // --------------------------------

    const handleDeleteProblem = async (problemId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this problem?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await deleteProblem(problemId);

            setProblems((previousProblems) =>
                previousProblems.filter(
                    (problem) =>
                        problem._id !== problemId
                )
            );
        } catch (error) {
            console.error(
                "Delete DSA Problem Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to delete DSA problem."
            );
        } finally {
            setDeleting(false);
        }
    };


    // --------------------------------
    // Statistics
    // --------------------------------

    const totalProblems = problems.length;

    const solvedProblems = problems.filter(
        (problem) =>
            problem.status === "Solved"
    ).length;

    const todoProblems = problems.filter(
        (problem) =>
            problem.status === "Todo"
    ).length;

    const revisitProblems = problems.filter(
        (problem) =>
            problem.status === "Revisit"
    ).length;


    // --------------------------------
    // Search Problems
    // --------------------------------

    const filteredProblems = problems.filter(
        (problem) =>
            problem.title
                .toLowerCase()
                .includes(search.toLowerCase())
    );


    // --------------------------------
    // Loading State
    // --------------------------------

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-slate-400">
                    Loading DSA problems...
                </p>
            </div>
        );
    }


    // --------------------------------
    // UI
    // --------------------------------

    return (
        <div>

            {/* ================================
                Header
            ================================= */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    DSA Problems
                </h1>

                <p className="mt-2 text-slate-400">
                    Track and manage your problem-solving progress.
                </p>
            </div>


            {/* ================================
                Statistics
            ================================= */}

            <div
                className="
                    mb-6
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-4
                "
            >

                <DSAStatCard
                    title="Total Problems"
                    value={totalProblems}
                    subtitle="Problems in your tracker"
                />

                <DSAStatCard
                    title="Solved"
                    value={solvedProblems}
                    subtitle="Problems completed"
                />

                <DSAStatCard
                    title="Todo"
                    value={todoProblems}
                    subtitle="Problems to solve"
                />

                <DSAStatCard
                    title="Revisit"
                    value={revisitProblems}
                    subtitle="Problems to review"
                />

            </div>


            {/* ================================
                Error
            ================================= */}

            {error && (
                <div
                    className="
                        mb-6
                        rounded-lg
                        border
                        border-red-900/50
                        bg-red-950/30
                        px-4
                        py-3
                    "
                >
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                </div>
            )}


            {/* ================================
                Quick Add
            ================================= */}

            <DSAQuickAdd
                onAdd={handleAddProblem}
                loading={adding}
            />


            {/* ================================
                Search
            ================================= */}

            <div className="relative mb-6">

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search problems by name..."
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-900
                        px-4
                        py-3
                        pr-20
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        transition
                        focus:border-slate-600
                    "
                />

                {search && (
                    <button
                        type="button"
                        onClick={() =>
                            setSearch("")
                        }
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            rounded-md
                            px-2
                            py-1
                            text-xs
                            text-slate-500
                            transition
                            hover:bg-slate-800
                            hover:text-white
                        "
                    >
                        Clear
                    </button>
                )}

            </div>


            {/* ================================
                Problem List
            ================================= */}

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950
                "
            >

                {/* --------------------------------
                    Table Header
                --------------------------------- */}

                <div
                    className="
                        hidden
                        border-b
                        border-slate-800
                        bg-slate-900
                        px-4
                        py-3
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-500
                        md:grid
                        md:grid-cols-[1fr_140px_130px_130px_80px]
                    "
                >
                    <span>Problem</span>

                    <span>Platform</span>

                    <span>Difficulty</span>

                    <span>Status</span>

                    <span>Action</span>
                </div>


                {/* --------------------------------
                    Problems
                --------------------------------- */}

                {filteredProblems.length > 0 ? (

                    filteredProblems.map(
                        (problem) => (
                            <DSAProblemRow
                                key={problem._id}
                                problem={problem}
                                onStatusChange={
                                    handleStatusChange
                                }
                                onDelete={
                                    handleDeleteProblem
                                }
                                deleting={deleting}
                            />
                        )
                    )

                ) : (

                    /* --------------------------------
                        Empty State
                    --------------------------------- */

                    <div className="px-6 py-16 text-center">

                        <h2 className="text-lg font-semibold text-white">
                            No problems found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {search
                                ? "Try a different problem name."
                                : "Add your first DSA problem to get started."
                            }
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}


export default DSA;