import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TabelaTurmas from '../components/tables/TabelaTurmas';
import FormTurma from '../components/forms/FormTurma';
import TurmaDAO from '../objetos/dao/TurmaDAO.mjs';
import ProfessorDAO from '../objetos/dao/ProfessorDAO.mjs';
import Turma from '../objetos/entidades/Turma.mjs';

export default function GerenciarTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turmaEmEdicao, setTurmaEmEdicao] = useState(null);

  const turmaDAO = new TurmaDAO();
  const profDAO = new ProfessorDAO();

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [listaTurmas, listaProfessores] = await Promise.all([
        turmaDAO.listar(),
        profDAO.listar()
      ]);
      setTurmas([...listaTurmas]);
      setProfessores([...listaProfessores]);
    } catch (erro) {
      message.error('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const prepararEdicao = (turma) => {
    setTurmaEmEdicao(turma);
    setIsModalOpen(true);
  };

  const abrirModalNovo = () => {
    setTurmaEmEdicao(null);
    setIsModalOpen(true);
  };

  const salvarTurma = async (values) => {
    try {
      if (turmaEmEdicao) {

        const turmaAtualizada = new Turma(
            turmaEmEdicao.getId(),
            values.nome,
            values.codigo,
            values.semestre,
            values.descricao,
            values.ativa,
            values.professor 
        );
        await turmaDAO.atualizar(turmaEmEdicao.getId(), turmaAtualizada);
        message.success('Turma atualizada!');
      } else {
  
        const novaTurma = new Turma(
          null,
          values.nome,
          values.codigo,
          values.semestre,
          values.descricao,
          values.ativa,
          values.professor 
        );
        await turmaDAO.salvar(novaTurma);
        message.success('Turma criada!');
      }
      
      setIsModalOpen(false);
      setTurmaEmEdicao(null);
      carregarDados();
    } catch (erro) {
      console.error(erro);
      message.error('Erro ao salvar.');
    }
  };

  const excluirTurma = async (id) => {
    try {
      await turmaDAO.excluir(id);
      message.success('Turma removida!');
      carregarDados();
    } catch (erro) {
      message.error('Erro ao excluir.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>📚 Gestão de Turmas</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={abrirModalNovo}>
          Nova Turma
        </Button>
      </div>

      <TabelaTurmas 
        dados={turmas} 
        loading={loading} 
        aoExcluir={excluirTurma}
        aoEditar={prepararEdicao} 
      />

      <Modal
        title={turmaEmEdicao ? "Editar Turma" : "Criar Nova Turma"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <FormTurma 
            aoSalvar={salvarTurma} 
            professores={professores}
            dadosEdicao={turmaEmEdicao} 
        />
      </Modal>
    </div>
  );
}