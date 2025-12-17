import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TabelaProfessores from '../components/tables/TabelaProfessores';
import FormProfessor from '../components/forms/FormProfessor';

import ProfessorDAO from '../objetos/dao/ProfessorDAO.mjs';
import Professor from '../objetos/entidades/Professor.mjs';

export default function GerenciarProfessores() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [professorEmEdicao, setProfessorEmEdicao] = useState(null);

  const dao = new ProfessorDAO();

  const carregarProfessores = async () => {
    setLoading(true);
    try {
      const dados = await dao.listar();
      setProfessores([...dados]);
    } catch (erro) {
      message.error('Erro ao carregar professores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProfessores();
  }, []);
 const prepararEdicao = (professor) => {
    setProfessorEmEdicao(professor);
    setIsModalOpen(true); 
  };
  const abrirModalNovo = () => {
    setProfessorEmEdicao(null); 
    setIsModalOpen(true);
  };
  const salvarProfessor = async (values) => {
    try {
      if (professorEmEdicao) {
        const profAtualizado = new Professor(
            professorEmEdicao.getId(), 
            values.nome,
            values.email,
            values.especialidade,
            values.nivel,
            values.telefone
        );

        await dao.atualizar(professorEmEdicao.getId(), profAtualizado);
        message.success('Professor atualizado!');

      } else {

        const novoProf = new Professor(
          null, 
          values.nome,
          values.email,
          values.especialidade,
          values.nivel,
          values.telefone
        );
        await dao.salvar(novoProf);
        message.success('Professor criado!');
      }

      setIsModalOpen(false);
      setProfessorEmEdicao(null); 
      carregarProfessores();
    } catch (erro) {
      console.error(erro);
      message.error('Erro ao salvar.');
    }
  };

  const excluirProfessor = async (id) => {
    try {
      await dao.excluir(id);
      message.success('Professor excluído!');
      carregarProfessores();
    } catch (erro) {
      message.error('Erro ao excluir.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>👨‍🏫 Gestão de Professores</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={abrirModalNovo}>
          Novo Professor
        </Button>
      </div>

      <TabelaProfessores 
        dados={professores} 
        loading={loading} 
        aoExcluir={excluirProfessor}
        aoEditar={prepararEdicao} 
      />

      <Modal
        title={professorEmEdicao ? "Editar Professor" : "Cadastrar Novo Professor"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <FormProfessor 
            aoSalvar={salvarProfessor} 
            dadosEdicao={professorEmEdicao}
        />
      </Modal>
    </div>
  );
}