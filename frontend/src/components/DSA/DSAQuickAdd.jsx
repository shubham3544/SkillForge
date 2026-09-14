import { useState } from "react";

function DSAQuickAdd({ onAdd, loading }) {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("LeetCode");
    const [difficulty, setDifficulty] = useState("Easy");
    const [problemLink, setProblemLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        await onAdd({
            title: title.trim(),
            platform,
            difficulty,
            problemLink: problemLink.trim(),
        });

        setTitle("");
        setProblemLink("");
    };

    return (
        <div
            className="
                mb-6
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
            "
        >
            <form
                onSubmit={handleSubmit}
                className="
                    grid
                    grid-cols-1
                    gap-3
                    md:grid-cols-[1fr_150px_130px_1.3fr_auto]
                "
            >
                {/* Problem Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    placeholder="Problem name..."
                    required
                    className="
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        focus:border-blue-500
                    "
                />

                {/* Platform */}
                <select
                    value={platform}
                    onChange={(e) =>
                        setPlatform(e.target.value)
                    }
                    className="
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        focus:border-blue-500
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
                        setDifficulty(e.target.value)
                    }
                    className="
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        focus:border-blue-500
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

                {/* Problem Link */}
                <input
                    type="url"
                    value={problemLink}
                    onChange={(e) =>
                        setProblemLink(e.target.value)
                    }
                    placeholder="Problem URL..."
                    className="
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        focus:border-blue-500
                    "
                />

                {/* Add Button */}
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
                        : "+ Add"}
                </button>
            </form>
        </div>
    );
}

export default DSAQuickAdd;