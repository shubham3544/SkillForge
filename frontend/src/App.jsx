function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
     
       <nav className="flex items-center justify-between pz-8 py-5">
          
            <div className="text-2xl font-bold">
              SkillForge
            </div>

            <div className="flex items-center gap-6">
                <button className="text-slate-300 hover:text-white">
                  login
                </button>

                <button className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium hover:bg-blue-500">
                  Get Started
                </button>
            </div>
       </nav>

       <main className="flex flex-col items-center px-6 py-20 text-center">

               <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-400">
                Developor Operating System
               </p>

               <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
                Your Developer journey,
                <span className="block text-blue-500">   
                  in one place.
                </span>
               </h1>

               <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                Manage your Projects , DSA progress , coding patterns,
                resumes, Github activity and LeetCode progress from
                one powerful workspace.
               </p>

       </main>

    </div>
  );
}

export default App;