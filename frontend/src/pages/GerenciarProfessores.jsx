import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// Componentes
import TabelaProfessores from '../components/tables/TabelaProfessores';
import FormProfessor from '../components/forms/FormProfessor';

// Objetos
import ProfessorDAO from '../objetos/dao/ProfessorDAO.mjs';
import Professor from '../objetos/entidades/Professor.mjs';

export default function GerenciarProfessores() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dao = new ProfessorDAO();

  // Buscar dados
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

  // Salvar (Recebe dados brutos do Form e converte para Entidade)
  const salvarProfessor = async (values) => {
    try {
      const novoProf = new Professor(
        null, // ID nulo pois é novo
        values.nome,
        values.email,
        values.especialidade,
        values.nivel,
        values.telefone
      );

      await dao.salvar(novoProf);
      message.success('Professor salvo com sucesso!');
      setIsModalOpen(false);
      carregarProfessores();
    } catch (erro) {
      console.error(erro);
      message.error('Erro ao salvar.');
    }
  };

  // Excluir
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
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Novo Professor
        </Button>
      </div>

      <TabelaProfessores 
        dados={professores} 
        loading={loading} 
        aoExcluir={excluirProfessor} 
      />

      <Modal
        title="Cadastrar Novo Professor"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <FormProfessor aoSalvar={salvarProfessor} />
      </Modal>
    </div>
  );
}