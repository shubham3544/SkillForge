import leetCodeLogo from "../../assets/leetcode.png"

function LeetCodeCard({ leetcode }) {

    const totalSolved = leetcode.totalSolved;

    const easy = leetcode.easy;
    const medium = leetcode.medium;
    const hard = leetcode.hard;


    /*
     * Total solved problems.
     */

    const total =
        easy + medium + hard;


    /*
     * Calculate the percentage
     * of each difficulty.
     */

    const easyPercentage =
        total > 0
            ? (easy / total) * 100
            : 0;

    const mediumPercentage =
        total > 0
            ? (medium / total) * 100
            : 0;

    const hardPercentage =
        total > 0
            ? (hard / total) * 100
            : 0;


    /*
     * SVG semi-circle geometry.
     */

    const radius = 90;

    const circumference =
        Math.PI * radius;


    /*
     * Convert percentages into
     * stroke lengths.
     */

    const easyLength =
        (easyPercentage / 100) *
        circumference;

    const mediumLength =
        (mediumPercentage / 100) *
        circumference;

    const hardLength =
        (hardPercentage / 100) *
        circumference;


    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-700
            "
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-400">
                        LeetCode
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        @{leetcode.username}
                    </p>

                </div>


                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-800
                        text-lg
                    "
                >
                    <img src={leetCodeLogo} alt="LeetCode"className="h-6 w-6"/>
                </div>

            </div>


            {/* Semi-Circle */}

            <div className="relative mx-auto mt-8 h-32 w-64">

                <svg
                    viewBox="0 0 200 110"
                    className="h-full w-full"
                >

                    {/* Background Arc */}

                    <path
                        d="M 10 100 A 90 90 0 0 1 190 100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="14"
                        strokeLinecap="round"
                        className="text-slate-800"
                    />


                    {/* Easy */}

                    {easy > 0 && (

                        <path
                            d="M 10 100 A 90 90 0 0 1 190 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeDasharray={`${easyLength} ${circumference}`}
                            strokeDashoffset="0"
                            className="text-emerald-400"
                        />

                    )}


                    {/* Medium */}

                    {medium > 0 && (

                        <path
                            d="M 10 100 A 90 90 0 0 1 190 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeDasharray={`${mediumLength} ${circumference}`}
                            strokeDashoffset={-easyLength}
                            className="text-yellow-400"
                        />

                    )}


                    {/* Hard */}

                    {hard > 0 && (

                        <path
                            d="M 10 100 A 90 90 0 0 1 190 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeDasharray={`${hardLength} ${circumference}`}
                            strokeDashoffset={
                                -(easyLength + mediumLength)
                            }
                            className="text-red-400"
                        />

                    )}

                </svg>


                {/* Center Text */}

                <div
                    className="
                        absolute
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        text-center
                    "
                >

                    <p className="text-4xl font-bold text-white">
                        {totalSolved}
                    </p>

                    <p className="text-xs text-slate-500">
                        Problems Solved
                    </p>

                </div>

            </div>


            {/* Difficulty Breakdown */}

            <div className="mt-8 grid grid-cols-3 gap-3">

                {/* Easy */}

                <div className="rounded-xl bg-slate-800/60 p-3">

                    <p className="text-xs text-emerald-400">
                        Easy
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                        {easy}
                    </p>

                </div>


                {/* Medium */}

                <div className="rounded-xl bg-slate-800/60 p-3">

                    <p className="text-xs text-yellow-400">
                        Medium
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                        {medium}
                    </p>

                </div>


                {/* Hard */}

                <div className="rounded-xl bg-slate-800/60 p-3">

                    <p className="text-xs text-red-400">
                        Hard
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                        {hard}
                    </p>

                </div>

            </div>


            {/* Total */}

            <div className="mt-5 flex items-center justify-between">

                <p className="text-sm text-slate-500">
                    Total solved
                </p>

                <p className="text-sm font-semibold text-white">
                    {totalSolved}
                </p>

            </div>

        </div>

    );
}


export default LeetCodeCard;