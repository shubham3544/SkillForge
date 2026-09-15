import { useState } from "react";

function DSAProblemRow({
    problem,
    onStatusChange,
    onNotesUpdate,
    onDelete,
    deleting,
}) {
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState(problem.notes || "");
    const [savingNotes, setSavingNotes] = useState(false);


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


    // --------------------------------
    // Save Notes
    // --------------------------------

    const handleSaveNotes = async () => {
        try {
            setSavingNotes(true);

            const success = await onNotesUpdate(
                problem._id,
                notes
            );

            if (success) {
                setShowNotes(false);
            }

        } finally {
            setSavingNotes(false);
        }
    };


    return (
        <>
            {/* ================================
                Problem Row
            ================================= */}

            <div
                className="
                    grid
                    grid-cols-[1fr_140px_110px_130px_60px_80px_80px]
                    items-center
                    gap-0
                    border-b
                    border-slate-800
                    px-4
                    py-4
                    transition
                    hover:bg-slate-900/60
                "
            >

                {/* ================================
                    Problem
                ================================= */}

                <div className="min-w-0 pr-4">
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
                    Pattern
                ================================= */}

                <div>
                    {problem.pattern ? (
                        <span
                            className="
                                inline-flex
                                items-center
                                rounded-full
                                border
                                px-2.5
                                py-1
                                text-xs
                                font-medium
                            "
                            style={{
                                color: problem.pattern.color,
                                borderColor: `${problem.pattern.color}66`,
                                backgroundColor: `${problem.pattern.color}15`,
                            }}
                        >
                            {problem.pattern.name}
                        </span>
                    ) : (
                        <span className="text-xs text-slate-600">
                            —
                        </span>
                    )}
                </div>


                {/* ================================
                    Notes
                ================================= */}

                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => {
                            setNotes(problem.notes || "");
                            setShowNotes(true);
                        }}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-sm
                            transition
                            hover:bg-slate-800
                        "
                        title={
                            problem.notes
                                ? "View notes"
                                : "Add note"
                        }
                    >
                        {problem.notes ? (
                            <span>📝</span>
                        ) : (
                            <span className="text-lg text-slate-500">
                                +
                            </span>
                        )}
                    </button>
                </div>


                {/* ================================
                    Status
                ================================= */}

                <div className="flex items-center">
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
                            px-2
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

                <div className="flex items-center">
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


            {/* ================================
                Notes Modal
            ================================= */}

            {showNotes && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        px-4
                    "
                    onClick={() =>
                        setShowNotes(false)
                    }
                >
                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-5
                            shadow-2xl
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Notes
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {problem.title}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNotes(false)
                                }
                                className="
                                    rounded-lg
                                    px-2
                                    py-1
                                    text-lg
                                    text-slate-500
                                    transition
                                    hover:bg-slate-800
                                    hover:text-white
                                "
                            >
                                ×
                            </button>
                        </div>


                        {/* Textarea */}

                        <textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            placeholder="Write something you want to remember..."
                            rows={5}
                            className="
                                mt-5
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-slate-800
                                bg-slate-950
                                px-4
                                py-3
                                text-sm
                                text-white
                                outline-none
                                placeholder:text-slate-600
                                transition
                                focus:border-slate-600
                            "
                        />


                        {/* Actions */}

                        <div className="mt-4 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNotes(false)
                                }
                                className="
                                    rounded-lg
                                    px-4
                                    py-2
                                    text-sm
                                    text-slate-400
                                    transition
                                    hover:bg-slate-800
                                    hover:text-white
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveNotes}
                                disabled={savingNotes}
                                className="
                                    rounded-lg
                                    bg-blue-600
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-blue-500
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                {savingNotes
                                    ? "Saving..."
                                    : "Save"}
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </>
    );
}

export default DSAProblemRow;