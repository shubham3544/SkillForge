function Footer() {
    return(
        <footer className="mt-24 w-full border-t border-slate-800">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-center">
                <div>
                    <p className="text-lg font-bold">
                        SkillForge
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Your Developer Journey , in one place.
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-slate-400">
                     <button className=" hover:text-white hover:cursor-pointer">
                        GitHub
                     </button>

                     <button className=" hover:text-white hover:cursor-pointer">
                          About
                     </button>
                          
                     <button className=" hover:text-white hover:cursor-pointer">
                          Contact
                     </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;