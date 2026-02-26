export default function Discounts() {
  const items = ["Laptop 20% OFF", "Headphones 30% OFF", "Courses 50% OFF"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white p-10">
      <h1 className="text-3xl text-center mb-8">Student Discount Store 🎓</h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item) => (
          <div key={item} className="bg-white/10 p-6 rounded-2xl text-center">
            <h2>{item}</h2>
            <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-full">
              Claim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}