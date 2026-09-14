function ProjectCard({ project}) {

    const {
        githubRepo,
        livelink,
        status,
        startDate,
        endDate,
        perosnalNotes,
    } = project;

    const repositoryName = 
             githubRepo
             ?.replace("https://github.com/","")
             .replace(/\/$/, "");

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover: -translate-y-1 hover:border-slate-700 ">
           <div className="flex items-start justify-between gap-4">
            <div className="min-w-8">
                <h3 className=" truncate text-lg font-semibold text-white ">
                    {repositoryName}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    Github Repository
                </p>
            </div>

            <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                {status}
            </span>
          
        </div>

        {perosnalNotes && (
            <p className="mt-5 line-clamp-2 text-sm text-slate-400">
             {perosnalNotes}
            </p>
        )}

        <div className="mt-5 flex flex-wrap gap-4">
           <div>
                <p className="text-xs  text-slate-600">
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
                    completed
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {new Date(
                        endDate
                    ).toLocaleDateString()}
                </p>
            </div>
           )}
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-slate-800 pt-4">
            <a href={githubRepo} 
               target="_blank"
               rel="noreferror"
               className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white">
                 Github
               </a>

               {livelink && (
                <a 
                  href= {livelink}
                  target="_blank"
                  rel="noreferror"
                  className=" rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  >
                       Live Demo
                </a>
               )}
            
            

        </div>
    </div>
    );



}

export default ProjectCard;