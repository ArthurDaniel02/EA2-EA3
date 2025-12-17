import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined, EditOutlined, TrophyOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';

export default function TabelaQuests({ dados, loading, aoExcluir, aoEditar }) {

  const columns = [
    {
      title: 'Título',
      key: 'titulo',
      render: (_, r) => <span style={{ fontWeight: '500' }}>{r.getTitulo()}</span>,
    },
    {
      title: 'XP',
      key: 'xp',
      align: 'center',
      render: (_, r) => <Tag icon={<TrophyOutlined />} color="cyan">{r.getXp()} XP</Tag>,
    },
    {
      title: 'Dificuldade',
      key: 'dificuldade',
      align: 'center',
      render: (_, r) => {
        const dif = r.getDificuldade();
        let color = 'blue';
        if (dif === 'Fácil') color = 'green';
        if (dif === 'Lendária') color = 'red';
        return <Tag color={color}>{dif}</Tag>;
      }
    },
   {
      title: 'Prazo',
      key: 'dataEntrega',
      render: (_, record) => {
        const data = record.getDataEntrega();
        if (!data) return '-';
        return new Date(data).toLocaleDateString('pt-BR');
      },
    },
    {
      title: 'Turma',
      key: 'turma',
      render: (_, r) => {
          const turma = r.getTurma();
          if (!turma) return '-';
          if (typeof turma.getNome === 'function') return <Tag icon={<TeamOutlined />}>{turma.getNome()}</Tag>;
          if (turma.nome) return <Tag icon={<TeamOutlined />}>{turma.nome}</Tag>;
          return <span style={{fontSize:'12px'}}>ID: {turma}</span>;
      }
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (_, record) => (
        <Space>
            <Button icon={<EditOutlined />} onClick={() => aoEditar(record)} />

            <Popconfirm
                title="Remover?"
                onConfirm={() => aoExcluir(record.getId())}
                okText="Sim"
                cancelText="Não"
            >
                <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dados} rowKey={(r) => r.getId()} loading={loading} />;
}