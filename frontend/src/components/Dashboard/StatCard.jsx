function StatCard({
    title,
    value,
    subtitle,
    progress,
    icon,
}) {

    return (
        <div
            className="
                group
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-700
                hover:bg-slate-900/90
            "
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    {/* Icon */}

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
                            transition
                            duration-300
                            group-hover:bg-slate-700
                        "
                    >
                        {icon}
                    </div>


                    {/* Title */}

                    <p className="text-sm font-medium text-slate-400">
                        {title}
                    </p>

                </div>

            </div>


            {/* Main Value */}

            <div className="mt-6">

                <span className="text-4xl font-bold tracking-tight text-white">
                    {value}
                </span>

            </div>


            {/* Progress */}

            {progress !== undefined && (

                <div className="mt-5">

                    <div
                        className="
                            h-2
                            overflow-hidden
                            rounded-full
                            bg-slate-800
                        "
                    >

                        <div
                            className="
                                h-full
                                rounded-full
                                bg-blue-500
                                transition-all
                                duration-700
                            "
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>


                    <p className="mt-2 text-xs text-slate-500">
                        {progress}% completed
                    </p>

                </div>

            )}


            {/* Subtitle */}

            <p className="mt-4 text-sm text-slate-500">
                {subtitle}
            </p>

        </div>
    );
}


export default StatCard;