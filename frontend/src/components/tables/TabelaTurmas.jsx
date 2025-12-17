import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined, TeamOutlined } from '@ant-design/icons';

export default function TabelaTurmas({ dados, loading, aoExcluir }) {

  const columns = [
    {
      title: 'Código',
      key: 'codigo',
      render: (_, record) => <Tag>{record.getCodigo()}</Tag>,
    },
    {
      title: 'Nome da Turma',
      key: 'nome',
      render: (_, record) => (
        <Space>
           <TeamOutlined />
           {record.getNome()}
        </Space>
      )
    },
    {
      title: 'Semestre',
      key: 'semestre',
      render: (_, record) => record.getSemestre(),
    },
    {
      title: 'Professor Responsável',
      key: 'professor',
      render: (_, record) => {
        const prof = record.getProfessor();
        // Verifica se prof existe antes de tentar pegar o nome
        return prof ? prof.getNome() : <span style={{color: 'red'}}>Sem Professor</span>;
      },
    },
    {
      title: 'Status',
      key: 'ativa',
      align: 'center',
      render: (_, record) => (
        record.getAtiva() 
          ? <Tag color="success">ATIVA</Tag> 
          : <Tag color="default">INATIVA</Tag>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="Excluir Turma?"
          onConfirm={() => aoExcluir(record.getId())}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>Excluir</Button>
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