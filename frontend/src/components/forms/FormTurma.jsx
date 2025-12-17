import React from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
import { TeamOutlined, NumberOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

// Recebe 'professores' como prop para preencher o Select
export default function FormTurma({ aoSalvar, professores = [] }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        aoSalvar(values);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ ativa: true }}
        >
            <Form.Item
                name="nome"
                label="Nome da Turma"
                rules={[{ required: true, message: 'Dê um nome para a turma!' }]}
            >
                <Input prefix={<TeamOutlined />} placeholder="Ex: Sociedade do Anel 2025" />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                    name="codigo"
                    label="Código"
                    rules={[{ required: true, message: 'Código obrigatório!' }]}
                >
                    <Input prefix={<NumberOutlined />} placeholder="Ex: SDA-2025" />
                </Form.Item>

                <Form.Item
                    name="semestre"
                    label="Semestre"
                    rules={[{ required: true, message: 'Informe o semestre' }]}
                >
                    <Input placeholder="Ex: 2025/1" />
                </Form.Item>
            </div>

            {/* Select Dinâmico de Professores */}
            <Form.Item
                name="professor"
                label="Professor Responsável"
                rules={[{ required: true, message: 'Selecione um professor!' }]}
            >
                <Select placeholder="Quem será o mestre desta turma?">
                    {professores.map((prof) => (
                        // Usamos o ID do professor como valor
                        <Option key={prof.getId()} value={prof.getId()}>
                            {prof.getNome()} ({prof.getEspecialidade()})
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="descricao" label="Descrição / Sala Virtual">
                <TextArea rows={3} placeholder="Link do Meet, observações..." />
            </Form.Item>

            <Form.Item name="ativa" label="Turma Ativa?" valuePropName="checked">
                <Switch checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                    Criar Turma
                </Button>
            </Form.Item>
        </Form>
    );
}