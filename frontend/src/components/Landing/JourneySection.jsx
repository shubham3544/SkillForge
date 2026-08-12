function JourneySection() {
  const steps = [
    {
      title: "Track",
      description: "Keep your developer progress organized."
    },
    {
      title: "Build",
      description: "Manage your projects and development work."
    },
    {
      title: "Solve",
      description: "Practice DSA and master coding patterns."
    },
    {
      title: "Improve",
      description: "Understand your progress and identify areas to improve."
    },
    {
      title: "Grow",
      description: "Build a stronger developer profile and career."
    }
  ];

  return (
    <section className="mt-24 w-full max-w-6xl">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
          Your developer journey
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          From learning to becoming a better developer
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          SkillForge brings the important parts of your developer journey
          together so you can track progress and keep moving forward.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-5">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-lg font-semibold text-blue-400">
              {index + 1}
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JourneySection;