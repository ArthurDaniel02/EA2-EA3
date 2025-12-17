import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, MailOutlined, TrophyOutlined, PhoneOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function FormProfessor({ aoSalvar, dadosEdicao }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (dadosEdicao) {
            const getVal = (metodo, prop) => {
                if (dadosEdicao[metodo] && typeof dadosEdicao[metodo] === 'function') {
                    return dadosEdicao[metodo]();
                }
                return dadosEdicao[prop] || "";
            };

            form.setFieldsValue({
                nome: getVal('getNome', 'nome'),
                email: getVal('getEmail', 'email'),
                especialidade: getVal('getEspecialidade', 'especialidade'),
                nivel: getVal('getNivel', 'nivel'),
                telefone: getVal('getTelefone', 'telefone') 
            });
        } else {
            form.resetFields(); 
         }
    }, [dadosEdicao, form]);
    

    const onFinish = (values) => {
        aoSalvar(values);
        if (!dadosEdicao) form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ nivel: "Iniciante" }}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                    name="nome"
                    label="Nome Completo"
                    rules={[{ required: true, message: 'Insira o nome!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Ex: Insira o nome" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        { required: true, message: 'Insira o e-mail!' },
                        { type: 'email', message: 'E-mail inválido!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="email@exemplo.com" />
                </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                    name="especialidade"
                    label="Especialidade"
                    rules={[{ required: true, message: 'Insira a matéria' }]}
                >
                    <Input prefix={<TrophyOutlined />} placeholder="Ex: Matemática" />
                </Form.Item>

                <Form.Item
                    name="nivel"
                    label="Nível"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Selecione">
                        <Option value="Iniciante">Nível Iniciante</Option>
                        <Option value="Mestre">Nível Mestre</Option>
                        <Option value="Doutor">Nível Doutor</Option>
                    </Select>
                </Form.Item>
            </div>
            <Form.Item
                name="telefone"
                label="Telefone / WhatsApp"
                rules={[{ required: true, message: 'Insira um contato' }]}
            >
                <Input prefix={<PhoneOutlined />} placeholder="(99) 99999-9999" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                    {dadosEdicao ? "Atualizar Professor" : "Cadastrar Professor"}
                </Button>
            </Form.Item>
        </Form>
    );
}