import { useState, useEffect } from "react";
import FormTurma from "../forms/FormTurma";
import TabelaTurmas from "../tables/TabelaTurmas";
import TurmaDAO from "../../objetos/dao/TurmaDAO.mjs";
import ProfessorDAO from "../../objetos/dao/ProfessorDAO.mjs";

export default function GerenciarTurmas() {
    const [turmas, setTurmas] = useState([]);
    const [professores, setProfessores] = useState([]);
    
    const turmaDAO = new TurmaDAO();
    const profDAO = new ProfessorDAO();

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        setTurmas(await turmaDAO.listar());
        setProfessores(await profDAO.listar());
    };

    const salvar = async (obj) => {
        await turmaDAO.salvar(obj);
        carregar();
    };

    const excluir = async (id) => {
        if(confirm("Excluir turma?")) {
            await turmaDAO.excluir(id);
            carregar();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Turmas</h2>
            <FormTurma aoSalvar={salvar} listaProfessores={professores} />
            <TabelaTurmas listaTurmas={turmas} aoExcluir={excluir} />
        </div>
    );
}