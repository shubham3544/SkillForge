import { useState } from "react";

function DSAQuickAdd({ onAdd, loading, patterns }) {
    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("LeetCode");
    const [difficulty, setDifficulty] = useState("Easy");
    const [pattern, setPattern] = useState("");
    const [newPattern, setNewPattern] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        if (
            pattern === "other" &&
            !newPattern.trim()
        ) {
            return;
        }

        const success = await onAdd({
            title: title.trim(),
            platform,
            difficulty,
            pattern,
            newPattern: newPattern.trim(),
        });

        if (success) {
            setTitle("");
            setPlatform("LeetCode");
            setDifficulty("Easy");
            setPattern("");
            setNewPattern("");
            setIsOpen(false);
        }
    };

    return (
        <div
            className="
                mb-6
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
            "
        >
            <button
                type="button"
                onClick={() =>
                    setIsOpen(!isOpen)
                }
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-5
                    py-4
                    text-left
                    transition
                    hover:bg-slate-800/60
                "
            >
                <div>
                    <p className="text-sm font-semibold text-white">
                        {isOpen
                            ? "− Add Problem"
                            : "+ Add Problem"}
                    </p>

                    {!isOpen && (
                        <p className="mt-1 text-xs text-slate-500">
                            Quickly add a new DSA problem
                        </p>
                    )}
                </div>

                <span
                    className={`
                        text-slate-400
                        transition-transform
                        duration-200
                        ${
                            isOpen
                                ? "rotate-180"
                                : ""
                        }
                    `}
                >
                    ↓
                </span>
            </button>

            {isOpen && (
                <div className="border-t border-slate-800 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="
                            grid
                            grid-cols-1
                            gap-3
                            md:grid-cols-[1fr_150px_130px_150px_auto]
                        "
                    >
                        {/* Problem */}

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            placeholder="Problem name..."
                            className="
                                rounded-lg
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

                        {/* Platform */}

                        <select
                            value={platform}
                            onChange={(e) =>
                                setPlatform(
                                    e.target.value
                                )
                            }
                            className="
                                rounded-lg
                                border
                                border-slate-800
                                bg-slate-950
                                px-3
                                py-3
                                text-sm
                                text-slate-300
                                outline-none
                                transition
                                focus:border-slate-600
                            "
                        >
                            <option value="LeetCode">
                                LeetCode
                            </option>

                            <option value="Codeforces">
                                Codeforces
                            </option>

                            <option value="CodeChef">
                                CodeChef
                            </option>

                            <option value="GeeksforGeeks">
                                GeeksforGeeks
                            </option>

                            <option value="HackerRank">
                                HackerRank
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>

                        {/* Difficulty */}

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(
                                    e.target.value
                                )
                            }
                            className="
                                rounded-lg
                                border
                                border-slate-800
                                bg-slate-950
                                px-3
                                py-3
                                text-sm
                                text-slate-300
                                outline-none
                                transition
                                focus:border-slate-600
                            "
                        >
                            <option value="Easy">
                                Easy
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Hard">
                                Hard
                            </option>
                        </select>

                        {/* Pattern */}

                        <select
                            value={pattern}
                            onChange={(e) => {
                                setPattern(
                                    e.target.value
                                );

                                if (
                                    e.target.value !==
                                    "other"
                                ) {
                                    setNewPattern("");
                                }
                            }}
                            className="
                                rounded-lg
                                border
                                border-slate-800
                                bg-slate-950
                                px-3
                                py-3
                                text-sm
                                text-slate-300
                                outline-none
                                transition
                                focus:border-slate-600
                            "
                        >
                            <option value="">
                                No Pattern
                            </option>

                            {(patterns || []).map(
                                (item) => (
                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.name}
                                    </option>
                                )
                            )}

                            <option value="other">
                                Other
                            </option>
                        </select>

                        {/* Add */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                rounded-lg
                                bg-blue-600
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-blue-500
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Adding..."
                                : "Add"}
                        </button>
                    </form>

                    {/* New Pattern */}

                    {pattern === "other" && (
                        <input
                            type="text"
                            value={newPattern}
                            onChange={(e) =>
                                setNewPattern(
                                    e.target.value
                                )
                            }
                            placeholder="Enter new pattern..."
                            className="
                                mt-3
                                w-full
                                rounded-lg
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
                    )}
                </div>
            )}
        </div>
    );
}

export default DSAQuickAdd;