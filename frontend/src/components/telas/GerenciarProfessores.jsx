import { useState, useEffect } from "react";
import FormProfessor from "../forms/FormProfessor";
import TabelaProfessores from "../tables/TabelaProfessores";
import ProfessorDAO from "../../objetos/dao/ProfessorDAO.mjs";

export default function GerenciarProfessores() {
    const [professores, setProfessores] = useState([]);
    
    const dao = new ProfessorDAO();


    useEffect(() => {
        carregarProfessores();
    }, []);

    const carregarProfessores = async () => {
        const dados = await dao.listar();
        setProfessores(dados);
    };

    const salvarProfessor = async (novoProf) => {
        try {
            await dao.salvar(novoProf);
            carregarProfessores(); 
            alert("Professor cadastrado com sucesso!");
        } catch (erro) {
            console.error(erro);
            alert("Erro ao salvar professor.");
        }
    };

    const excluirProfessor = async (id) => {
        if (window.confirm("Tem certeza? Isso pode apagar as turmas vinculadas!")) {
            await dao.excluir(id);
            carregarProfessores();
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Gerenciar Professores
            </h2>
            
    
            <FormProfessor aoSalvar={salvarProfessor} />
            
            <h3 className="text-xl font-semibold mb-3 mt-8 text-gray-700">Lista de Professores</h3>
            <TabelaProfessores listaProfessores={professores} aoExcluir={excluirProfessor} />
        </div>
    );
}