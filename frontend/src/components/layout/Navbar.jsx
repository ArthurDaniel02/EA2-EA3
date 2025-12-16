import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <Link to="/" className="text-xl font-bold text-yellow-400 hover:text-yellow-300">
            🛡️ RPG Educacional
          </Link>

          {/* Links de Navegação */}
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-blue-300 transition">
              Home
            </Link>
            
            <Link to="/professores" className="hover:text-blue-300 transition">
              Professores
            </Link>
            
            <Link to="/turmas" className="hover:text-blue-300 transition">
              Turmas
            </Link>
            
            <Link to="/quests" className="hover:text-blue-300 transition">
              Quests (Missões)
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}