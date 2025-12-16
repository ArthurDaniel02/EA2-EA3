import { useState, useEffect } from "react";
import FormQuest from "../forms/FormQuest";
import TabelaQuests from "../tables/TabelaQuests";
import QuestDAO from "../../objetos/dao/QuestDAO.mjs";
import TurmaDAO from "../../objetos/dao/TurmaDAO.mjs";

export default function GerenciarQuests() {
    const [quests, setQuests] = useState([]);
    const [turmas, setTurmas] = useState([]);
    
    const questDAO = new QuestDAO();
    const turmaDAO = new TurmaDAO();

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        const listaQ = await questDAO.listar();
        setQuests(listaQ);

        const listaT = await turmaDAO.listar();
        setTurmas(listaT);
    };

    const salvarQuest = async (novaQuest) => {
        await questDAO.salvar(novaQuest);
        carregarDados(); 
        alert("Quest salva com sucesso!");
    };

    const excluirQuest = async (id) => {
        if (window.confirm("Deseja realmente excluir esta missão?")) {
            await questDAO.excluir(id);
            carregarDados();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Gerenciar Missões (Quests)</h2>
            
            <FormQuest aoSalvar={salvarQuest} listaTurmas={turmas} />
            
            <TabelaQuests listaQuests={quests} aoExcluir={excluirQuest} />
        </div>
    );
}