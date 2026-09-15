function DSADifficultyChart({ problems }) {
    const easy = problems.filter(
        (problem) => problem.difficulty === "Easy"
    ).length;

    const medium = problems.filter(
        (problem) => problem.difficulty === "Medium"
    ).length;

    const hard = problems.filter(
        (problem) => problem.difficulty === "Hard"
    ).length;

    const total = problems.length;

    const easyPercentage =
        total > 0 ? (easy / total) * 100 : 0;

    const mediumPercentage =
        total > 0 ? (medium / total) * 100 : 0;

    const hardPercentage =
        total > 0 ? (hard / total) * 100 : 0;

    const easyEnd = easyPercentage;

    const mediumEnd =
        easyPercentage + mediumPercentage;

    const gradient =
        total > 0
            ? `conic-gradient(
                from 270deg,
                #10b981 0deg ${easyEnd * 1.8}deg,
                #facc15 ${easyEnd * 1.8}deg ${mediumEnd * 1.8}deg,
                #ef4444 ${mediumEnd * 1.8}deg 180deg,
                transparent 180deg 360deg
            )`
            : "conic-gradient(from 270deg, #1e293b 0deg 180deg, transparent 180deg 360deg)";

    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-5
            "
        >
            <div className="mb-5">
                <h2 className="text-sm font-semibold text-white">
                    Difficulty
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                    Your DSA problem distribution
                </p>
            </div>

            <div className="relative mx-auto h-32 w-64 overflow-hidden">

                <div
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-64
                        w-64
                        -translate-x-1/2
                        rounded-full
                    "
                    style={{
                        background: gradient,
                    }}
                />

                <div
                    className="
                        absolute
                        left-1/2
                        top-[18px]
                        h-[220px]
                        w-[220px]
                        -translate-x-1/2
                        rounded-full
                        bg-slate-900
                    "
                />

                <div
                    className="
                        absolute
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        text-center
                    "
                >
                    <p className="text-2xl font-bold text-white">
                        {total}
                    </p>

                    <p className="text-xs text-slate-500">
                        Problems
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-3">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                        <span className="text-sm text-slate-400">
                            Easy
                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="text-sm font-medium text-white">
                            {easy}
                        </span>

                        <span className="text-xs text-slate-600">
                            {Math.round(easyPercentage)}%
                        </span>

                    </div>
                </div>


                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

                        <span className="text-sm text-slate-400">
                            Medium
                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="text-sm font-medium text-white">
                            {medium}
                        </span>

                        <span className="text-xs text-slate-600">
                            {Math.round(mediumPercentage)}%
                        </span>

                    </div>
                </div>


                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                        <span className="text-sm text-slate-400">
                            Hard
                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="text-sm font-medium text-white">
                            {hard}
                        </span>

                        <span className="text-xs text-slate-600">
                            {Math.round(hardPercentage)}%
                        </span>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default DSADifficultyChart;