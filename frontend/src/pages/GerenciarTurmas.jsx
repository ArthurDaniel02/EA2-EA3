import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// Componentes
import TabelaTurmas from '../components/tables/TabelaTurmas';
import FormTurma from '../components/forms/FormTurma';

// Objetos
import TurmaDAO from '../objetos/dao/TurmaDAO.mjs';
import ProfessorDAO from '../objetos/dao/ProfessorDAO.mjs';
import Turma from '../objetos/entidades/Turma.mjs';

export default function GerenciarTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]); // Necessário para o Select do Form
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const turmaDAO = new TurmaDAO();
  const profDAO = new ProfessorDAO();

  const carregarDados = async () => {
    setLoading(true);
    try {
      // Carrega turmas e professores em paralelo
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

  const salvarTurma = async (values) => {
    try {
      // Cria a entidade Turma. Note que values.professor é o ID vindo do Select.
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
      message.success('Turma criada com sucesso!');
      setIsModalOpen(false);
      carregarDados();
    } catch (erro) {
      console.error(erro);
      message.error('Erro ao salvar turma.');
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
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Nova Turma
        </Button>
      </div>

      <TabelaTurmas 
        dados={turmas} 
        loading={loading} 
        aoExcluir={excluirTurma} 
      />

      <Modal
        title="Criar Nova Turma"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <FormTurma 
            aoSalvar={salvarTurma} 
            professores={professores} // Passamos a lista pro Select funcionar
        />
      </Modal>
    </div>
  );
}