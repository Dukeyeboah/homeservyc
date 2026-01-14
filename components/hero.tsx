export function Hero() {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat pt-32 md:pt-40 pb-32 md:pb-48 px-4 relative"
      style={{
        backgroundImage: "url(/hero-home-services.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-balance text-white">
          Find trusted help for your home
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Trusted help. Happy homes.
        </p>
      </div>
    </section>
  )
}
