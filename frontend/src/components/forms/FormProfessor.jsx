import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, MailOutlined, TrophyOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function FormProfessor({ aoSalvar }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // O Ant Design entrega 'values' como: { nome: 'João', email: '...', nivel: 'Mestre' }
        aoSalvar(values);
        form.resetFields(); // Limpa o formulário após salvar
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ nivel: "Iniciante" }} // Valor padrão
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                    name="nome"
                    label="Nome Completo"
                    rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Ex: Gandalf, o Cinzento" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        { required: true, message: 'Insira o e-mail!' },
                        { type: 'email', message: 'E-mail inválido!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="gandalf@mordor.com" />
                </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                    name="especialidade"
                    label="Especialidade"
                    rules={[{ required: true, message: 'Qual a matéria?' }]}
                >
                    <Input prefix={<TrophyOutlined />} placeholder="Ex: Defesa contra as Artes das Trevas" />
                </Form.Item>

                <Form.Item
                    name="nivel"
                    label="Nível de Experiência"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Selecione o nível">
                        <Option value="Iniciante">Nível Iniciante</Option>
                        <Option value="Mestre">Nível Mestre</Option>
                        <Option value="Doutor">Nível Doutor</Option>
                        <Option value="Arquimago">Nível Arquimago (RPG)</Option>
                    </Select>
                </Form.Item>
                
                <Form.Item
                name="telefone"
                label="Telefone / WhatsApp"
                rules={[{ required: true, message: 'Insira um contato' }]}
            >
                <Input placeholder="(99) 99999-9999" />
            </Form.Item>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                    Cadastrar Professor
                </Button>
            </Form.Item>
        </Form>
    );
}