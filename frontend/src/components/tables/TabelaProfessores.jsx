import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';

export default function TabelaProfessores({ dados, loading, aoExcluir, aoEditar }) {
  
  const columns = [
    {
      title: 'Nome',
      key: 'nome',
      render: (_, record) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 'bold' }}>{record.getNome()}</span>
        </Space>
      ),
    },
    {
      title: 'Contato', 
      key: 'contato',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px' }}>
            <span>{record.getEmail()}</span>
            {record.getTelefone() && (
                <span style={{ color: '#888' }}>
                    <PhoneOutlined /> {record.getTelefone()}
                </span>
            )}
        </div>
      ),
    },
    {
      title: 'Especialidade',
      key: 'especialidade',
      render: (_, record) => record.getEspecialidade(),
    },
    {
      title: 'Nível',
      key: 'nivel',
      align: 'center',
      render: (_, record) => {
        const nivel = record.getNivel();
        let color = 'geekblue';
        if (nivel === 'Mestre') color = 'gold';
        if (nivel === 'Doutor') color = 'purple';
        if (nivel === 'Arquimago') color = 'red';
        
        return <Tag color={color}>{nivel.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => aoEditar(record)} 
          />
          
          <Popconfirm
            title="Tem certeza que deseja excluir este professor?"
            description="Isso pode apagar turmas vinculadas."
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

  return (
    <Table 
      columns={columns} 
      dataSource={dados} 
      rowKey={(record) => record.getId()} 
      loading={loading}
      pagination={{ pageSize: 5 }} 
    />
  );
}