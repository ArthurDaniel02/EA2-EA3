import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined, EditOutlined, TeamOutlined } from '@ant-design/icons';

export default function TabelaTurmas({ dados, loading, aoExcluir, aoEditar }) {

  const columns = [
    { title: 'Código', key: 'codigo', render: (_, r) => <Tag>{r.getCodigo()}</Tag> },
    { 
      title: 'Nome', 
      key: 'nome', 
      render: (_, r) => <Space><TeamOutlined />{r.getNome()}</Space> 
    },
    { title: 'Semestre', key: 'semestre', render: (_, r) => r.getSemestre() },
    {
      title: 'Professor',
      key: 'professor',
      render: (_, record) => {
        const prof = record.getProfessor();
        if (!prof) return <span style={{color:'red'}}>Sem Professor</span>;
        if (typeof prof.getNome === 'function') return prof.getNome();
        if (prof.nome) return prof.nome;
        return <span style={{color:'#999'}}>ID: {prof}</span>;
      },
    },
    {
      title: 'Status',
      key: 'ativa',
      align: 'center',
      render: (_, r) => (r.getAtiva() ? <Tag color="success">ATIVA</Tag> : <Tag>INATIVA</Tag>),
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (_, record) => (
        <Space>

           <Button icon={<EditOutlined />} onClick={() => aoEditar(record)} />
           
           <Popconfirm
             title="Excluir Turma?"
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