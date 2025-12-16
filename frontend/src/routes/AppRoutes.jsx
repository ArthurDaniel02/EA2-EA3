import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout"; 

import GerenciarTurmas from "../components/telas/GerenciarTurmas";
import GerenciarQuests from "../components/telas/GerenciarQuests";

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