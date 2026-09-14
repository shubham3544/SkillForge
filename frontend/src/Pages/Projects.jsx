import { useEffect, useState } from "react";

import {
    createProject,
    getAllProjects,
} from "../api/project.api.js";

import ProjectCard from "../components/Projects/ProjectCard.jsx";
import ProjectForm from "../components/Projects/ProjectForm.jsx";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [creating, setCreating] = useState(false);

    const fetchProjects = async () => {
        try {
            setError("");

            const response = await getAllProjects();

            setProjects(response.data || []);
        } catch (error) {
            console.error("Projects Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load projects."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (formData) => {
        try {
            setCreating(true);
            setError("");

            await createProject(formData);

            setShowForm(false);

            await fetchProjects();
        } catch (error) {
            console.error("Create Project Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to create project."
            );
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-slate-400">
                    Loading projects...
                </p>
            </div>
        );
    }

    return (
        <div>

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Projects
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Manage and track your development projects.
                    </p>
                </div>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
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
                        "
                    >
                        + Add Project
                    </button>
                )}

            </div>

            {/* Error */}
            {error && (
                <div
                    className="
                        mb-6
                        rounded-lg
                        border
                        border-red-900/50
                        bg-red-950/30
                        px-4
                        py-3
                    "
                >
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                </div>
            )}

            {/* Create Form */}
            {showForm && (
                <div className="mb-8">
                    <ProjectForm
                        onSubmit={handleCreateProject}
                        onCancel={() => setShowForm(false)}
                        loading={creating}
                    />
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 ? (
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                        />
                    ))}
                </div>
            ) : (
                !showForm && (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-700
                            bg-slate-900/50
                            px-6
                            py-16
                            text-center
                        "
                    >
                        <h2 className="text-lg font-semibold text-white">
                            No projects yet
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Start by adding your first development project.
                        </p>
                    </div>
                )
            )}

        </div>
    );
}

export default Projects;