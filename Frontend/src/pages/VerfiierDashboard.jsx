import { NavLink, Outlet } from "react-router-dom";

export default function VerifierDashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">

      {/* Sidebar */}
     <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col">

  <h2 className="text-2xl font-semibold mb-8 text-center">
    Services Portal
  </h2>

  <nav className="flex flex-col gap-4">

    <NavLink
      to="/verifier-dashboard"
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition ${
          isActive ? "bg-white text-indigo-600" : "hover:bg-white/10"
        }`
      }
    >
      Scholarship
    </NavLink>

    <NavLink
      to="discounts"
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition ${
          isActive ? "bg-white text-indigo-600" : "hover:bg-white/10"
        }`
      }
    >
      Student Discounts
    </NavLink>

    <NavLink
      to="age-restricted"
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition ${
          isActive ? "bg-white text-indigo-600" : "hover:bg-white/10"
        }`
      }
    >
      18+ Area
    </NavLink>

    <NavLink
      to="events"
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg transition ${
          isActive ? "bg-white text-indigo-600" : "hover:bg-white/10"
        }`
      }
    >
      Events
    </NavLink>

  </nav>

  <div className="mt-auto text-sm opacity-80 text-center">
    ✔ Privacy Verified Access
  </div>

</aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>

    </div>
  );
}