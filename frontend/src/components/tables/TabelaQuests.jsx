import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined, TrophyOutlined, ClockCircleOutlined } from '@ant-design/icons';

export default function TabelaQuests({ dados, loading, aoExcluir }) {

  const columns = [
    {
      title: 'Título da Quest',
      key: 'titulo',
      render: (_, record) => (
        <span style={{ fontWeight: '500' }}>{record.getTitulo()}</span>
      ),
    },
    {
      title: 'Recompensa (XP)',
      key: 'xp',
      align: 'center',
      render: (_, record) => (
        <Tag icon={<TrophyOutlined />} color="cyan">
          {record.getXp()} XP
        </Tag>
      ),
    },
    {
      title: 'Dificuldade',
      key: 'dificuldade',
      align: 'center',
      render: (_, record) => {
        const dif = record.getDificuldade();
        let color = 'blue';
        if (dif === 'Fácil') color = 'green';
        if (dif === 'Difícil') color = 'orange';
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
        return (
            <Space>
                <ClockCircleOutlined />
                {new Date(data).toLocaleDateString('pt-BR')}
            </Space>
        );
      },
    },
    {
      title: 'Turma',
      key: 'turma',
      render: (_, record) => {
          const turma = record.getTurma();
          return turma ? turma.getNome() : '-';
      }
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="Remover Quest?"
          onConfirm={() => aoExcluir(record.getId())}
          okText="Sim"
          cancelText="Não"
        >
           <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={dados} 
      rowKey={(record) => record.getId()} 
      loading={loading}
    />
  );
}