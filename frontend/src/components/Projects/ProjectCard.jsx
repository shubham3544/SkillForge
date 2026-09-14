function ProjectCard({ project, onEdit , onDelete , deleting }) {

    const {
        githubRepo,
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    } = project;

    const repositoryName =
        githubRepo
            ?.replace("https://github.com/", "")
            .replace(/\/$/, "");

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
            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-white">
                        {repositoryName}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                        GitHub Repository
                    </p>
                </div>

                <span
                    className="
                        shrink-0
                        rounded-full
                        bg-slate-800
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-slate-300
                    "
                >
                    {status}
                </span>

            </div>

            {/* Personal Notes */}
            {personalNotes && (
                <p className="mt-5 line-clamp-2 text-sm text-slate-400">
                    {personalNotes}
                </p>
            )}

            {/* Dates */}
            <div className="mt-5 flex flex-wrap gap-4">

                <div>
                    <p className="text-xs text-slate-600">
                        Started
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                            startDate
                        ).toLocaleDateString()}
                    </p>
                </div>

                {endDate && (
                    <div>
                        <p className="text-xs text-slate-600">
                            Completed
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            {new Date(
                                endDate
                            ).toLocaleDateString()}
                        </p>
                    </div>
                )}

            </div>

            {/* Actions */}
            <div
                className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    border-t
                    border-slate-800
                    pt-4
                "
            >

                {/* Edit */}
                <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="
                        rounded-lg
                        bg-slate-800
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-slate-300
                        transition
                        hover:bg-slate-700
                        hover:text-white
                    "
                >
                    Edit
                </button>
                

                <button
    type="button"
    onClick={() => {
        console.log("Project ID:", project._id);
        onDelete(project._id);
    }}
    className="
        rounded-lg
        bg-red-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-red-500
    "
>
    Delete
</button>

                {/* GitHub */}
                <a
                    href={githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="
                        rounded-lg
                        bg-slate-800
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-slate-300
                        transition
                        hover:bg-slate-700
                        hover:text-white
                    "
                >
                    GitHub ↗
                </a>

                {/* Live Demo */}
                {liveLink && (
                    <a
                        href={liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="
                            rounded-lg
                            bg-slate-800
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-slate-300
                            transition
                            hover:bg-slate-700
                            hover:text-white
                        "
                    >
                        Live Demo ↗
                    </a>
                )}

            </div>

        </div>
    );
}

export default ProjectCard;