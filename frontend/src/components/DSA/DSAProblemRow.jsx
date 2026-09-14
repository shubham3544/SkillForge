function DSAProblemRow({
    problem,
    onStatusChange,
    onDelete,
    deleting,
}) {
    // --------------------------------
    // Difficulty Styles
    // --------------------------------

    const difficultyStyles = {
        Easy: "bg-emerald-950/40 text-emerald-400 border-emerald-900/50",

        Medium: "bg-yellow-950/40 text-yellow-400 border-yellow-900/50",

        Hard: "bg-red-950/40 text-red-400 border-red-900/50",
    };


    // --------------------------------
    // Status Styles
    // --------------------------------

    const statusStyles = {
        Todo: "border-slate-700 text-slate-300",

        Solved: "border-emerald-900/50 text-emerald-400",

        Revisit: "border-yellow-900/50 text-yellow-400",
    };


    return (
        <div
            className="
                grid
                grid-cols-1
                gap-4
                border-b
                border-slate-800
                px-4
                py-4
                transition
                hover:bg-slate-900/60
                md:grid-cols-[1fr_140px_130px_130px_80px]
                md:items-center
            "
        >

            {/* ================================
                Problem
            ================================= */}

            <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-white">
                    {problem.title}
                </h3>

                {problem.problemLink && (
                    <a
                        href={problem.problemLink}
                        target="_blank"
                        rel="noreferrer"
                        className="
                            mt-1
                            inline-block
                            text-xs
                            text-blue-400
                            hover:text-blue-300
                        "
                    >
                        Open Problem ↗
                    </a>
                )}
            </div>


            {/* ================================
                Platform
            ================================= */}

            <div>
                <span className="text-sm text-slate-400">
                    {problem.platform}
                </span>
            </div>


            {/* ================================
                Difficulty
            ================================= */}

            <div>
                <span
                    className={`
                        inline-flex
                        items-center
                        rounded-full
                        border
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        ${difficultyStyles[problem.difficulty]}
                    `}
                >
                    {problem.difficulty}
                </span>
            </div>


            {/* ================================
                Status
            ================================= */}

            <div>
                <select
                    value={problem.status}
                    onChange={(e) =>
                        onStatusChange(
                            problem._id,
                            e.target.value
                        )
                    }
                    className={`
                        rounded-lg
                        border
                        bg-slate-950
                        px-3
                        py-2
                        text-xs
                        font-medium
                        outline-none
                        transition
                        focus:border-blue-500
                        ${statusStyles[problem.status]}
                    `}
                >
                    <option
                        value="Todo"
                        className="bg-slate-950 text-slate-300"
                    >
                        Todo
                    </option>

                    <option
                        value="Solved"
                        className="bg-slate-950 text-emerald-400"
                    >
                        Solved
                    </option>

                    <option
                        value="Revisit"
                        className="bg-slate-950 text-yellow-400"
                    >
                        Revisit
                    </option>
                </select>
            </div>


            {/* ================================
                Delete
            ================================= */}

            <div>
                <button
                    type="button"
                    onClick={() =>
                        onDelete(problem._id)
                    }
                    disabled={deleting}
                    className="
                        rounded-lg
                        border
                        border-red-900/50
                        bg-red-950/30
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-red-400
                        transition
                        duration-200
                        hover:border-red-800
                        hover:bg-red-900/40
                        hover:text-red-300
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {deleting
                        ? "Deleting..."
                        : "Delete"}
                </button>
            </div>

        </div>
    );
}

export default DSAProblemRow;