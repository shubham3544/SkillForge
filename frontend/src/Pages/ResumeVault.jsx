import { useEffect, useState } from "react";

import {
    createResume,
    getAllResumes,
    setPrimaryResume,
    deleteResume,
} from "../api/resume.api.js";


function ResumeVault() {

    const [resumes, setResumes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [settingPrimary, setSettingPrimary] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");

    const [showUpload, setShowUpload] = useState(false);

    const [resumeName, setResumeName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);


    // --------------------------------
    // Fetch Resumes
    // --------------------------------

    const fetchResumes = async () => {

        try {

            setError("");

            const response = await getAllResumes();

            setResumes(response.data || []);

        } catch (error) {

            console.error(
                "Resume Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load resumes."
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------
    // Initial Load
    // --------------------------------

    useEffect(() => {

        fetchResumes();

    }, []);


    // --------------------------------
    // File Selection
    // --------------------------------

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) {

            setSelectedFile(null);

            return;
        }

        if (file.type !== "application/pdf") {

            setError(
                "Only PDF files are allowed."
            );

            setSelectedFile(null);

            return;
        }

        setError("");

        setSelectedFile(file);
    };


    // --------------------------------
    // Upload Resume
    // --------------------------------

    const handleUpload = async (e) => {

        e.preventDefault();

        if (!resumeName.trim()) {

            setError(
                "Resume name is required."
            );

            return;
        }

        if (!selectedFile) {

            setError(
                "Please select a resume file."
            );

            return;
        }

        if (resumes.length >= 5) {

            setError(
                "Maximum 5 resumes are allowed."
            );

            return;
        }

        try {

            setUploading(true);

            setError("");

            const formData = new FormData();

            formData.append(
                "name",
                resumeName.trim()
            );

            formData.append(
                "resume",
                selectedFile
            );

            await createResume(formData);

            setResumeName("");

            setSelectedFile(null);

            setShowUpload(false);

            await fetchResumes();

        } catch (error) {

            console.error(
                "Upload Resume Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to upload resume."
            );

        } finally {

            setUploading(false);

        }
    };


    // --------------------------------
    // Set Primary Resume
    // --------------------------------

    const handleSetPrimary = async (resumeId) => {

        try {

            setSettingPrimary(true);

            setError("");

            await setPrimaryResume(resumeId);

            await fetchResumes();

        } catch (error) {

            console.error(
                "Set Primary Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to set primary resume."
            );

        } finally {

            setSettingPrimary(false);

        }
    };


    // --------------------------------
    // Delete Resume
    // --------------------------------

    const handleDelete = async (resumeId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setDeleting(true);

            setError("");

            await deleteResume(resumeId);

            await fetchResumes();

        } catch (error) {

            console.error(
                "Delete Resume Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to delete resume."
            );

        } finally {

            setDeleting(false);

        }
    };


    // --------------------------------
    // Cancel Upload
    // --------------------------------

    const handleCancelUpload = () => {

        setShowUpload(false);

        setResumeName("");

        setSelectedFile(null);

        setError("");

    };


    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <p className="text-slate-400">
                    Loading resumes...
                </p>

            </div>
        );
    }


    return (
        <div>

            {/* ================================
                Header
            ================================= */}

            <div
                className="
                    mb-8
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                "
            >

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Resume Vault
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Keep your resumes organized in one place.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() => {

                        setError("");

                        setShowUpload(true);

                    }}
                    disabled={resumes.length >= 5}
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
                    + Upload Resume
                </button>

            </div>


            {/* ================================
                Error
            ================================= */}

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


            {/* ================================
                Upload Modal
            ================================= */}

            {showUpload && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        px-4
                    "
                >

                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-2xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-6
                            shadow-2xl
                        "
                    >

                        <div className="mb-6">

                            <h2 className="text-xl font-semibold text-white">
                                Upload Resume
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload a PDF resume to your vault.
                            </p>

                        </div>


                        <form onSubmit={handleUpload}>

                            {/* Resume Name */}

                            <div>

                                <label
                                    htmlFor="resumeName"
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    "
                                >
                                    Resume Name
                                </label>

                                <input
                                    id="resumeName"
                                    type="text"
                                    value={resumeName}
                                    onChange={(e) =>
                                        setResumeName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Software Developer Resume"
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
                                        placeholder:text-slate-600
                                        focus:border-blue-500
                                    "
                                />

                            </div>


                            {/* File */}

                            <div className="mt-5">

                                <label
                                    htmlFor="resumeFile"
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    "
                                >
                                    Resume PDF
                                </label>

                                <input
                                    id="resumeFile"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleFileChange}
                                    className="
                                        mt-2
                                        block
                                        w-full
                                        cursor-pointer
                                        rounded-lg
                                        border
                                        border-slate-700
                                        bg-slate-950
                                        text-sm
                                        text-slate-400
                                        file:mr-4
                                        file:border-0
                                        file:bg-slate-800
                                        file:px-4
                                        file:py-3
                                        file:text-sm
                                        file:font-medium
                                        file:text-slate-300
                                        hover:file:bg-slate-700
                                    "
                                />


                                {selectedFile && (

                                    <p className="mt-2 text-xs text-slate-500">
                                        Selected: {selectedFile.name}
                                    </p>

                                )}

                            </div>


                            {/* Actions */}

                            <div
                                className="
                                    mt-7
                                    flex
                                    justify-end
                                    gap-3
                                "
                            >

                                <button
                                    type="button"
                                    onClick={handleCancelUpload}
                                    disabled={uploading}
                                    className="
                                        rounded-lg
                                        border
                                        border-slate-700
                                        px-4
                                        py-2.5
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
                                    disabled={uploading}
                                    className="
                                        rounded-lg
                                        bg-blue-600
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-blue-500
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >

                                    {uploading
                                        ? "Uploading..."
                                        : "Upload"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* ================================
                Resume Count
            ================================= */}

            <div className="mb-5">

                <p className="text-sm text-slate-500">
                    {resumes.length} / 5 resumes
                </p>

            </div>


            {/* ================================
                Resume List
            ================================= */}

            {resumes.length > 0 ? (

                <div className="space-y-4">

                    {resumes.map((resume) => (

                        <div
                            key={resume._id}
                            className="
                                flex
                                flex-col
                                gap-4
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-900
                                p-5
                                transition
                                hover:border-slate-700
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            {/* Resume Info */}

                            <div className="min-w-0">

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <h2
                                        className="
                                            truncate
                                            text-base
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {resume.name}
                                    </h2>


                                    {resume.isPrimary && (

                                        <span
                                            className="
                                                rounded-full
                                                border
                                                border-blue-900/50
                                                bg-blue-950/40
                                                px-2.5
                                                py-1
                                                text-xs
                                                font-medium
                                                text-blue-400
                                            "
                                        >
                                            Primary
                                        </span>

                                    )}

                                </div>


                                <p className="mt-2 text-xs text-slate-500">

                                    Uploaded{" "}

                                    {new Date(
                                        resume.createdAt
                                    ).toLocaleDateString()}

                                </p>

                            </div>


                            {/* Actions */}

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                "
                            >

                                {/* Open */}

                                <a
                                    href={resume.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        rounded-lg
                                        border
                                        border-slate-700
                                        px-3
                                        py-2
                                        text-xs
                                        font-medium
                                        text-slate-300
                                        transition
                                        hover:bg-slate-800
                                        hover:text-white
                                    "
                                >
                                    Open
                                </a>


                                {/* Set Primary */}

                                {!resume.isPrimary && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSetPrimary(
                                                resume._id
                                            )
                                        }
                                        disabled={settingPrimary}
                                        className="
                                            rounded-lg
                                            border
                                            border-blue-900/50
                                            bg-blue-950/30
                                            px-3
                                            py-2
                                            text-xs
                                            font-medium
                                            text-blue-400
                                            transition
                                            hover:bg-blue-900/40
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >

                                        {settingPrimary
                                            ? "Updating..."
                                            : "Set Primary"}

                                    </button>

                                )}


                                {/* Delete */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            resume._id
                                        )
                                    }
                                    disabled={deleting}
                                    className="
                                        rounded-lg
                                        border
                                        border-red-900/50
                                        bg-red-950/30
                                        px-3
                                        py-2
                                        text-xs
                                        font-medium
                                        text-red-400
                                        transition
                                        hover:bg-red-900/40
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >

                                    {deleting
                                        ? "Deleting..."
                                        : "Delete"}

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

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
                        No resumes yet
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Upload your first resume to get started.
                    </p>

                </div>

            )}

        </div>
    );
}

export default ResumeVault;