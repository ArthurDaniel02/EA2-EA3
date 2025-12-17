import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout"; 

import GerenciarTurmas from "../pages/GerenciarTurmas";
import GerenciarQuests from "../pages/GerenciarQuests";
import GerenciarProfessores from "../pages/GerenciarProfessores";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h1>Bem-vindo ao RPG Educacional</h1>} />
        {/* Rotas das Turmas */}
        <Route path="turmas" element={<GerenciarTurmas />} />
        {/* Rotas das Quests */}
        <Route path="quests" element={<GerenciarQuests />} />
         {/* Rotas dos Professores */}
        <Route path="professores" element={<GerenciarProfessores />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;