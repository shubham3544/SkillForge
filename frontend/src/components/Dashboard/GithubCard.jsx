function GithubCard({ github }) {

    const {
        repositoryCount = 0,
        totalStars = 0,
        totalForks = 0,
        languages = {},
        recentRepositories = [],
    } = github || {};


    const languageEntries = Object.entries(
        languages
    );


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
                        GitHub
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Your GitHub activity
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
                    ◇
                </div>

            </div>


            {/* Main Statistics */}

            <div className="mt-6 grid grid-cols-3 gap-3">

                {/* Repositories */}

                <div className="rounded-xl bg-slate-800/60 p-4">

                    <p className="text-xs text-slate-500">
                        Repos
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                        {repositoryCount}
                    </p>

                </div>


                {/* Stars */}

                <div className="rounded-xl bg-slate-800/60 p-4">

                    <p className="text-xs text-slate-500">
                        Stars
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                        {totalStars}
                    </p>

                </div>


                {/* Forks */}

                <div className="rounded-xl bg-slate-800/60 p-4">

                    <p className="text-xs text-slate-500">
                        Forks
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                        {totalForks}
                    </p>

                </div>

            </div>


            {/* Languages */}

            <div className="mt-6">

                <p className="text-sm font-medium text-slate-300">
                    Languages
                </p>


                {languageEntries.length > 0 ? (

                    <div className="mt-3 flex flex-wrap gap-2">

                        {languageEntries.map(
                            ([language, count]) => (

                                <div
                                    key={language}
                                    className="
                                        rounded-lg
                                        bg-slate-800
                                        px-3
                                        py-2
                                        text-xs
                                        text-slate-300
                                    "
                                >

                                    {language}

                                    <span className="ml-2 text-slate-500">
                                        {count}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    <p className="mt-3 text-sm text-slate-500">
                        No language data available yet.
                    </p>

                )}

            </div>


            {/* Recent Repositories */}

            <div className="mt-6">

                <p className="text-sm font-medium text-slate-300">
                    Recent Repositories
                </p>


                {recentRepositories.length > 0 ? (

                    <div className="mt-3 space-y-2">

                        {recentRepositories.map(
                            (repo) => (

                                <a
                                    key={repo.fullName}
                                    href={repo.htmlUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        block
                                        rounded-xl
                                        bg-slate-800/50
                                        p-3
                                        transition
                                        hover:bg-slate-800
                                    "
                                >

                                    <div className="flex items-center justify-between">

                                        <p className="text-sm font-medium text-white">
                                            {repo.name}
                                        </p>

                                        <span className="text-xs text-slate-500">
                                            ★ {repo.stars}
                                        </span>

                                    </div>


                                    {repo.description && (

                                        <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                            {repo.description}
                                        </p>

                                    )}

                                </a>

                            )
                        )}

                    </div>

                ) : (

                    <div
                        className="
                            mt-3
                            rounded-xl
                            border
                            border-dashed
                            border-slate-800
                            p-4
                        "
                    >

                        <p className="text-sm text-slate-500">
                            No repositories connected yet.
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                            Add a GitHub repository to one of your projects
                            to see your GitHub statistics here.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}


export default GithubCard;