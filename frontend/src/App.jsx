import FeatureCard from "./components/Landing/FeatureCard";
import JourneySection from "./components/Landing/JourneySection";

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

               <div className="mt-8 flex gap-4">
                <button className=" rounded-lg border border-slate-700 px-6 py-3 font-medium hover:bg-blue-500">
                  Get Started
                </button>

                <button className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:border-slate-500 hover: text-white">
                  Explore SkillForge
                </button>
               </div>

               <div className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                 <div className="mb-6 flex items-center justify-between">
                  <div className="text-left">
                     <p className="text-sm text-slate-400">
                       Dashboard
                     </p>

                     <h2 className="mt-1 text-xl font-semibold">
                       Developer  Overview
                     </h2>
                   </div>
                   <div className="h-3 w-3 rounded-full bg-green-400"></div>
                 </div>

                 <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-slate-800 p-5 text-left">
                       <p className="text-sm text-slate-400">
                        Projects
                       </p>
                       <p className="mt-2 text-3xl font-bold">
                        08
                       </p>
                    </div>

                    <div className="rounded-xl bg-slate-800 p-5 text-left">
                      <p className="text-sm text-slate-400">
                        DSA Problem
                      </p>
                      <p className="mt-2 text-3xl font-bold">
                        142
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-800 p-5 text-left">
                       <p className="text-sm text-slate-400">
                         Patterns
                       </p>
                       <p className="mt-2 text-3xl font-bold">
                        18
                       </p>
                    </div>

                    <div className="rounded-xl bg-slate-800 p-5 text-left">
                      <p className="text-sm text-slate-400">
                        GitHub Repo 
                      </p>
                      <p className="mt-2 text-3xl font-bold">
                        24
                      </p>
                    </div>
                 </div>
               </div>

                <section className="mt-24 w-full max-w-6xl">
                <div className="text-center">
                  <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                    Everything You need 
                  </p>

                  <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                    One workspacae for your developer journey
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                    Keep your projects , DSA progress , patterns , resumes,
                    Github and Leetcode activity organized in one place.
                  </p>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                   <FeatureCard
                   title = "Project Manager"
                   description= "Track your projects , GitHub repositories , live links , status and development progress"
                   />

                   <FeatureCard
                     title="DSA Tracker"
                     description="Organize coding problems by platform, difficulty, status and DSA pattern."
                   />
               
                   <FeatureCard
                     title="Pattern Manager"
                     description="Create and manage your own collection of reusable DSA patterns."
                   />
               
                   <FeatureCard
                     title="Resume Vault"
                     description="Store multiple resumes, manage versions and keep one resume as your primary."
                   />
               
                   <FeatureCard
                     title="GitHub Integration"
                     description="View repositories, stars, forks, languages and recent GitHub activity."
                   />
               
                   <FeatureCard
                     title="LeetCode Integration"
                     description="Connect your LeetCode account and track your solved problems by difficulty."
                   />
                 </div>
              </section> 

              <JourneySection />

       </main>

    </div>
  );
}

export default App;