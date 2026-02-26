import React from 'react'

const Home = () => {
  return (
     <section className="min-h-screen flex items-center justify-center font-primary bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white px-6">
      
      <div className="max-w-4xl text-center">
        
        <p className="uppercase tracking-widest text-sm opacity-80 mb-4">
          Privacy-Preserving Digital Authentication
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
          Authenticate Without Revealing Your Identity
        </h1>

        <p className="text-lg md:text-xl opacity-90 mb-10">
          Secure access powered by Zero-Knowledge Proofs and 
          cryptographic credentials — no passwords, no identity databases.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="cursor-pointer bg-white text-indigo-600 font-medium px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">
            Try Demo
          </button>

          <button className="cursor-pointer border border-white/40 px-8 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button>
        </div>

        {/* Feature highlights */}
        <div className="mt-14 grid sm:grid-cols-3 gap-6 text-base opacity-90">
          <div>🔐 Zero-Knowledge Login</div>
          <div>🛡 No Identity Database</div>
          <div>⚡ Reusable Credentials</div>
        </div>

      </div>

    </section>
  )
}

export default Home