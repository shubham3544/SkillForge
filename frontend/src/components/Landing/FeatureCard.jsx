function FeatureCard({title, description}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:translate-y-1 hover:border-slate-700">
            <h3 className="text-xl font-semibold text-white">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
                {description}
            </p>
        </div>
    )
}

export default FeatureCard;