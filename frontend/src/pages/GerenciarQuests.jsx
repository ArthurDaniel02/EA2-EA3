import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// Componentes
import TabelaQuests from '../components/tables/TabelaQuests';
import FormQuest from '../components/forms/FormQuest';

// Objetos
import QuestDAO from '../objetos/dao/QuestDAO.mjs';
import TurmaDAO from '../objetos/dao/TurmaDAO.mjs';
import Quest from '../objetos/entidades/Quest.mjs';

export default function GerenciarQuests() {
  const [quests, setQuests] = useState([]);
  const [turmas, setTurmas] = useState([]); // Necessário para o Select do Form
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questDAO = new QuestDAO();
  const turmaDAO = new TurmaDAO();

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [listaQuests, listaTurmas] = await Promise.all([
        questDAO.listar(),
        turmaDAO.listar()
      ]);
      setQuests([...listaQuests]);
      setTurmas([...listaTurmas]);
    } catch (erro) {
      message.error('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const salvarQuest = async (values) => {
    try {
      // values.dataEntrega já vem como Date do FormQuest
      // values.turma vem como ID do Select
      const novaQuest = new Quest(
        null,
        values.titulo,
        values.descricao,
        values.xp,
        values.dificuldade,
        values.dataEntrega,
        values.turma
      );

      await questDAO.salvar(novaQuest);
      message.success('Missão lançada com sucesso!');
      setIsModalOpen(false);
      carregarDados();
    } catch (erro) {
      console.error(erro);
      message.error('Erro ao criar missão.');
    }
  };

  const excluirQuest = async (id) => {
    try {
      await questDAO.excluir(id);
      message.success('Missão removida!');
      carregarDados();
    } catch (erro) {
      message.error('Erro ao excluir.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>🏆 Gestão de Quests (Missões)</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Nova Quest
        </Button>
      </div>

      <TabelaQuests 
        dados={quests} 
        loading={loading} 
        aoExcluir={excluirQuest} 
      />

      <Modal
        title="Lançar Nova Missão"
        open={isModalOpen}
        footer={null}
        width={700} // Quest tem muitos campos, deixamos o modal mais largo
        onCancel={() => setIsModalOpen(false)}
      >
        <FormQuest 
            aoSalvar={salvarQuest} 
            turmas={turmas} // Passamos a lista pro Select funcionar
        />
      </Modal>
    </div>
  );
}