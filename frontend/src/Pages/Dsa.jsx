import { useEffect, useState } from "react";

import {
    createProblem,
    getAllProblems,
    deleteProblem,
    updateProblem,
} from "../api/dsa.api.js";

import { getAllPatterns } from "../api/pattern.api.js";

import DSAQuickAdd from "../components/DSA/DSAQuickAdd.jsx";
import DSAProblemRow from "../components/DSA/DSAProblemRow.jsx";
import DSAStatCard from "../components/DSA/DSAStatCard.jsx";
import DSADifficultyChart from "../components/DSA/DSADifficultyChart.jsx";

function DSA() {
    const [problems, setProblems] = useState([]);
    const [patterns, setPatterns] = useState([]);

    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [activeTab, setActiveTab] = useState("all");

    const [selectedPattern, setSelectedPattern] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setError("");

                const [
                    problemResponse,
                    patternResponse,
                ] = await Promise.all([
                    getAllProblems(),
                    getAllPatterns(),
                ]);

                setProblems(problemResponse.data || []);
                setPatterns(patternResponse.data || []);
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

    const handleAddProblem = async (problemData) => {
        try {
            setAdding(true);
            setError("");

            await createProblem(problemData);

            const response = await getAllProblems();

            setProblems(response.data || []);

            return true;
        } catch (error) {
            console.error(
                "Add DSA Problem Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to add DSA problem."
            );

            return false;
        } finally {
            setAdding(false);
        }
    };

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
                previousProblems.map(
                    (problem) =>
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

    const handleNotesUpdate = async (
        problemId,
        notes
    ) => {
        try {
            setError("");

            await updateProblem(
                problemId,
                {
                    notes,
                }
            );

            setProblems((previousProblems) =>
                previousProblems.map(
                    (problem) =>
                        problem._id === problemId
                            ? {
                                ...problem,
                                notes,
                            }
                            : problem
                )
            );

            return true;
        } catch (error) {
            console.error(
                "Notes Update Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update notes."
            );

            return false;
        }
    };

    const handleDeleteProblem = async (
        problemId
    ) => {
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

    const filteredProblems = problems.filter(
        (problem) =>
            (problem.title || "")
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const revisionProblems =
        filteredProblems.filter(
            (problem) =>
                problem.status === "Revisit"
        );

    const selectedPatternData =
        patterns.find(
            (pattern) =>
                pattern._id === selectedPattern
        );

    const patternProblems =
        filteredProblems.filter(
            (problem) =>
                problem.pattern?._id ===
                selectedPattern
        );

    const problemsToDisplay =
        activeTab === "revision"
            ? revisionProblems
            : filteredProblems;

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-slate-400">
                    Loading DSA problems...
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    DSA Problems
                </h1>

                <p className="mt-2 text-slate-400">
                    Track and manage your problem-solving progress.
                </p>
            </div>


            {/* Stats */}

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


            {/* Error */}

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


            {/* Main Workspace */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-6
                    xl:grid-cols-[minmax(0,1fr)_280px]
                "
            >

                {/* LEFT SIDE */}

                <div className="min-w-0">

                    {/* Quick Add */}

                    <DSAQuickAdd
                        onAdd={handleAddProblem}
                        loading={adding}
                        patterns={patterns}
                    />


                    {/* Tabs */}

                    <div className="mb-6 border-b border-slate-800">
                        <div className="flex items-center gap-6">

                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab("all");
                                    setSelectedPattern(null);
                                }}
                                className={`
                                    border-b-2
                                    pb-3
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        activeTab === "all"
                                            ? "border-blue-500 text-white"
                                            : "border-transparent text-slate-500 hover:text-slate-300"
                                    }
                                `}
                            >
                                All Problems
                            </button>


                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab("revision");
                                    setSelectedPattern(null);
                                }}
                                className={`
                                    border-b-2
                                    pb-3
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        activeTab === "revision"
                                            ? "border-blue-500 text-white"
                                            : "border-transparent text-slate-500 hover:text-slate-300"
                                    }
                                `}
                            >
                                Revision
                            </button>


                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab("patterns");
                                    setSelectedPattern(null);
                                }}
                                className={`
                                    border-b-2
                                    pb-3
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        activeTab === "patterns"
                                            ? "border-blue-500 text-white"
                                            : "border-transparent text-slate-500 hover:text-slate-300"
                                    }
                                `}
                            >
                                Patterns
                            </button>

                        </div>
                    </div>


                    {/* Search */}

                    {activeTab !== "patterns" && (
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
                    )}


                    {/* PATTERNS TAB */}

                    {activeTab === "patterns" ? (

                        selectedPattern ? (

                            <div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedPattern(null)
                                    }
                                    className="
                                        mb-5
                                        text-sm
                                        text-slate-400
                                        transition
                                        hover:text-white
                                    "
                                >
                                    ← Back to Patterns
                                </button>


                                <div
                                    className="
                                        mb-5
                                        rounded-xl
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        p-5
                                    "
                                >
                                    <div className="flex items-center gap-3">

                                        <span
                                            className="h-3 w-3 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    selectedPatternData?.color,
                                            }}
                                        />

                                        <h2 className="text-lg font-semibold text-white">
                                            {selectedPatternData?.name}
                                        </h2>

                                    </div>


                                    {selectedPatternData?.description && (
                                        <p className="mt-2 text-sm text-slate-500">
                                            {selectedPatternData.description}
                                        </p>
                                    )}


                                    <p className="mt-3 text-xs text-slate-500">
                                        {patternProblems.length}{" "}
                                        {patternProblems.length === 1
                                            ? "problem"
                                            : "problems"}
                                    </p>

                                </div>


                                {/* Pattern Problems */}

                                <div
                                    className="
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-800
                                        bg-slate-950
                                    "
                                >

                                    <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">

                                        <div className="min-w-[980px]">

                                            <div
                                                className="
                                                    grid
                                                    grid-cols-[1fr_140px_110px_130px_60px_80px_80px]
                                                    items-center
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
                                                "
                                            >
                                                <span>Problem</span>
                                                <span>Platform</span>
                                                <span>Difficulty</span>
                                                <span>Pattern</span>
                                                <span>Note</span>
                                                <span>Status</span>
                                                <span>Action</span>
                                            </div>


                                            {patternProblems.length > 0 ? (

                                                patternProblems.map(
                                                    (problem) => (
                                                        <DSAProblemRow
                                                            key={problem._id}
                                                            problem={problem}
                                                            onStatusChange={
                                                                handleStatusChange
                                                            }
                                                            onNotesUpdate={
                                                                handleNotesUpdate
                                                            }
                                                            onDelete={
                                                                handleDeleteProblem
                                                            }
                                                            deleting={
                                                                deleting
                                                            }
                                                        />
                                                    )
                                                )

                                            ) : (

                                                <div className="px-6 py-16 text-center">

                                                    <h2 className="text-lg font-semibold text-white">
                                                        No problems found
                                                    </h2>

                                                    <p className="mt-2 text-sm text-slate-500">
                                                        No problems have been assigned to this pattern yet.
                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            /* Pattern List */

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950
                                    p-6
                                "
                            >

                                <div className="mb-5">

                                    <h2 className="text-lg font-semibold text-white">
                                        Patterns
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Organize your DSA problems by patterns.
                                    </p>

                                </div>


                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-3
                                        sm:grid-cols-2
                                        lg:grid-cols-3
                                    "
                                >

                                    {patterns.length > 0 ? (

                                        patterns.map(
                                            (pattern) => {

                                                const count =
                                                    problems.filter(
                                                        (problem) =>
                                                            problem.pattern?._id ===
                                                            pattern._id
                                                    ).length;

                                                return (
                                                    <button
                                                        type="button"
                                                        key={pattern._id}
                                                        onClick={() =>
                                                            setSelectedPattern(
                                                                pattern._id
                                                            )
                                                        }
                                                        className="
                                                            rounded-xl
                                                            border
                                                            border-slate-800
                                                            bg-slate-900
                                                            p-4
                                                            text-left
                                                            transition
                                                            hover:-translate-y-0.5
                                                            hover:border-slate-700
                                                        "
                                                    >

                                                        <div className="flex items-center justify-between">

                                                            <div className="flex items-center gap-3">

                                                                <span
                                                                    className="h-3 w-3 rounded-full"
                                                                    style={{
                                                                        backgroundColor:
                                                                            pattern.color,
                                                                    }}
                                                                />

                                                                <p
                                                                    className="text-sm font-medium"
                                                                    style={{
                                                                        color:
                                                                            pattern.color,
                                                                    }}
                                                                >
                                                                    {pattern.name}
                                                                </p>

                                                            </div>


                                                            <span className="text-xs text-slate-500">
                                                                {count}
                                                            </span>

                                                        </div>


                                                        {pattern.description && (
                                                            <p className="mt-3 text-xs text-slate-500">
                                                                {pattern.description}
                                                            </p>
                                                        )}

                                                    </button>
                                                );
                                            }
                                        )

                                    ) : (

                                        <div className="col-span-full py-12 text-center">

                                            <h2 className="text-lg font-semibold text-white">
                                                No patterns found
                                            </h2>

                                            <p className="mt-2 text-sm text-slate-500">
                                                Create patterns to organize your DSA problems.
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        )

                    ) : (

                        /* ALL / REVISION */

                        <div
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-950
                            "
                        >

                            <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">

                                <div className="min-w-[980px]">

                                    <div
                                        className="
                                            grid
                                            grid-cols-[1fr_140px_110px_130px_60px_80px_80px]
                                            items-center
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
                                        "
                                    >
                                        <span>Problem</span>
                                        <span>Platform</span>
                                        <span>Difficulty</span>
                                        <span>Pattern</span>
                                        <span>Note</span>
                                        <span>Status</span>
                                        <span>Action</span>
                                    </div>


                                    {problemsToDisplay.length > 0 ? (

                                        problemsToDisplay.map(
                                            (problem) => (
                                                <DSAProblemRow
                                                    key={problem._id}
                                                    problem={problem}
                                                    onStatusChange={
                                                        handleStatusChange
                                                    }
                                                    onNotesUpdate={
                                                        handleNotesUpdate
                                                    }
                                                    onDelete={
                                                        handleDeleteProblem
                                                    }
                                                    deleting={
                                                        deleting
                                                    }
                                                />
                                            )
                                        )

                                    ) : (

                                        <div className="px-6 py-16 text-center">

                                            <h2 className="text-lg font-semibold text-white">
                                                No problems found
                                            </h2>

                                            <p className="mt-2 text-sm text-slate-500">
                                                {activeTab === "revision"
                                                    ? "You don't have any problems marked for revision."
                                                    : search
                                                        ? "Try a different problem name."
                                                        : "Add your first DSA problem to get started."
                                                }
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    )}

                </div>


                {/* RIGHT SIDE */}

                <div className="xl:sticky xl:top-6 xl:self-start">
                    <DSADifficultyChart
                        problems={problems}
                    />
                </div>

            </div>
        </div>
    );
}

export default DSA;