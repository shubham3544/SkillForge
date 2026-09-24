import { useState } from "react";

function ProjectForm({ onSubmit, onCancel, loading, initialData }) {
    const [formData, setFormData] = useState({
        githubRepo: initialData?.githubRepo || "",
        liveLink: initialData?.liveLink || "",
        status: initialData?.status || "Planning",
        startDate: initialData?.startDate
            ? initialData.startDate.slice(0, 10)
            : "",
        endDate: initialData?.endDate
            ? initialData.endDate.slice(0, 10)
            : "",
        personalNotes: initialData?.personalNotes || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onSubmit(formData);
    };

    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
                md:p-8
            "
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Create Project
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Add a project to your SkillForge workspace.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                {/* GitHub Repository */}
                <div>
                    <label
                        htmlFor="githubRepo"
                        className="text-sm font-medium text-slate-300"
                    >
                        GitHub Repository
                    </label>

                    <input
                        id="githubRepo"
                        name="githubRepo"
                        type="url"
                        required
                        value={formData.githubRepo}
                        onChange={handleChange}
                        placeholder="https://github.com/username/repository"
                        className="
                            mt-2
                            w-full
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-950
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    />
                </div>

                {/* Live Link */}
                <div className="mt-5">
                    <label
                        htmlFor="liveLink"
                        className="text-sm font-medium text-slate-300"
                    >
                        Live Demo
                    </label>

                    <input
                        id="liveLink"
                        name="liveLink"
                        type="url"
                        value={formData.liveLink}
                        onChange={handleChange}
                        placeholder="https://your-project.com"
                        className="
                            mt-2
                            w-full
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-950
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    />
                </div>

                {/* Status */}
                <div className="mt-5">
                    <label
                        htmlFor="status"
                        className="text-sm font-medium text-slate-300"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="
                            mt-2
                            w-full
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-950
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    >
                        <option value="Planning">
                            Planning
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="On Hold">
                            On Hold
                        </option>
                    </select>
                </div>

                {/* Dates */}
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label
                            htmlFor="startDate"
                            className="text-sm font-medium text-slate-300"
                        >
                            Start Date
                        </label>

                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-950
                                px-4
                                py-3
                                text-sm
                                text-white
                                outline-none
                                transition
                                focus:border-blue-500
                            "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="endDate"
                            className="text-sm font-medium text-slate-300"
                        >
                            End Date
                        </label>

                        <input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                border-slate-700
                                bg-slate-950
                                px-4
                                py-3
                                text-sm
                                text-white
                                outline-none
                                transition
                                focus:border-blue-500
                            "
                        />
                    </div>

                </div>

                {/* Personal Notes */}
                <div className="mt-5">
                    <label
                        htmlFor="personalNotes"
                        className="text-sm font-medium text-slate-300"
                    >
                        Personal Notes
                    </label>

                    <textarea
                        id="personalNotes"
                        name="personalNotes"
                        rows="4"
                        value={formData.personalNotes}
                        onChange={handleChange}
                        placeholder="Add notes about this project..."
                        className="
                            mt-2
                            w-full
                            resize-none
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-950
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    />
                </div>

                {/* Actions */}
                <div
                    className="
                        mt-7
                        flex
                        flex-col-reverse
                        gap-3
                        sm:flex-row
                        sm:justify-end
                    "
                >
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            rounded-lg
                            border
                            border-slate-700
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-slate-300
                            transition
                            hover:bg-slate-800
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>

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
                            ? "Creating..."
                            : "Create Project"}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default ProjectForm;