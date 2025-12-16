import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 1. Menu Fixo no Topo */}
      <Navbar />

      {/* 2. Área de Conteúdo */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* O Outlet é onde as telas (GerenciarTurmas, etc) serão renderizadas */}
        <Outlet />
      </main>

      {/* 3. Rodapé Fixo embaixo */}
      <Footer />
    </div>
  );
}