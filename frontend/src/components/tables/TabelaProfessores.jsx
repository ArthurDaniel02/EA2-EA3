import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

export default function TabelaProfessores({ dados, loading, aoExcluir }) {
  
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
      title: 'E-mail',
      key: 'email',
      render: (_, record) => record.getEmail(),
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
      title: 'Telefone',
      key: 'telefone',
      render: (_, record) => record.getTelefone() || '-',
    },
    {
      title: 'Ações',
      key: 'acoes',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {/* Botão de Editar (apenas visual por enquanto) */}
          <Button icon={<EditOutlined />} />
          
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
      rowKey={(record) => record.getId()} // Importante: Usa o ID como chave única
      loading={loading}
      pagination={{ pageSize: 5 }} // Paginação automática
    />
  );
}