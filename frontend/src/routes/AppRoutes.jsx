import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout"; 

import Home from "./pages/Home";

import GerenciarTurmas from "../pages/GerenciarTurmas";
import GerenciarQuests from "../pages/GerenciarQuests";
import GerenciarProfessores from "../pages/GerenciarProfessores";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="professores" element={<GerenciarProfessores />} />
        <Route path="turmas" element={<GerenciarTurmas />} />
        <Route path="quests" element={<GerenciarQuests />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;