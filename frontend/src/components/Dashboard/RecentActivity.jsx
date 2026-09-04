function RecentActivity({ activities }) {

    const recentActivities = activities?.slice(0, 4) || [];

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
            "
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-300">
                        Recent Activity
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Your latest development activity
                    </p>

                </div>

            </div>


            {/* Activities */}

            <div className="mt-5">

                {recentActivities.length > 0 ? (

                    <div>

                        {recentActivities.map(
                            (activity, index) => (

                                <div
                                    key={activity._id}
                                    className={`
                                        flex
                                        items-center
                                        gap-3
                                        py-3
                                        ${
                                            index !==
                                            recentActivities.length - 1
                                                ? "border-b border-slate-800"
                                                : ""
                                        }
                                    `}
                                >

                                    {/* Activity Indicator */}

                                    <div
                                        className="
                                            h-2
                                            w-2
                                            shrink-0
                                            rounded-full
                                            bg-slate-500
                                        "
                                    />


                                    {/* Message */}

                                    <p
                                        className="
                                            min-w-0
                                            flex-1
                                            truncate
                                            text-sm
                                            text-slate-400
                                        "
                                    >
                                        {activity.message}
                                    </p>


                                    {/* Time */}

                                    <p
                                        className="
                                            shrink-0
                                            text-xs
                                            text-slate-600
                                        "
                                    >
                                        {new Date(
                                            activity.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    <div
                        className="
                            rounded-xl
                            border
                            border-dashed
                            border-slate-800
                            p-5
                            text-center
                        "
                    >

                        <p className="text-sm text-slate-500">
                            No recent activity yet.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}


export default RecentActivity;