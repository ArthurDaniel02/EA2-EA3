import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TabelaQuests from '../components/tables/TabelaQuests';
import FormQuest from '../components/forms/FormQuest';
import QuestDAO from '../objetos/dao/QuestDAO.mjs';
import TurmaDAO from '../objetos/dao/TurmaDAO.mjs';
import Quest from '../objetos/entidades/Quest.mjs';

export default function GerenciarQuests() {
  const [quests, setQuests] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questEmEdicao, setQuestEmEdicao] = useState(null);

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

  const prepararEdicao = (quest) => {
    setQuestEmEdicao(quest);
    setIsModalOpen(true);
  };

  const abrirModalNovo = () => {
    setQuestEmEdicao(null);
    setIsModalOpen(true);
  };

  const salvarQuest = async (values) => {
    try {
      const novaQuest = new Quest(
        questEmEdicao ? questEmEdicao.getId() : null, 
        values.titulo,
        values.descricao,
        values.xp,
        values.dificuldade,
        values.dataEntrega,
        values.turma
      );

      if (questEmEdicao) {
        await questDAO.atualizar(questEmEdicao.getId(), novaQuest);
        message.success('Missão atualizada!');
      } else {
        await questDAO.salvar(novaQuest);
        message.success('Missão lançada!');
      }

      setIsModalOpen(false);
      setQuestEmEdicao(null);
      carregarDados();
    } catch (erro) {
      console.error(erro);
      message.error('Erro ao salvar missão.');
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
        <h2>🏆 Gestão de Quests</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={abrirModalNovo}>
          Nova Quest
        </Button>
      </div>

      <TabelaQuests 
        dados={quests} 
        loading={loading} 
        aoExcluir={excluirQuest}
        aoEditar={prepararEdicao} 
      />

      <Modal
        title={questEmEdicao ? "Editar Missão" : "Lançar Nova Missão"}
        open={isModalOpen}
        footer={null}
        width={700}
        onCancel={() => setIsModalOpen(false)}
      >
        <FormQuest 
            aoSalvar={salvarQuest} 
            turmas={turmas}
            dadosEdicao={questEmEdicao}
        />
      </Modal>
    </div>
  );
}