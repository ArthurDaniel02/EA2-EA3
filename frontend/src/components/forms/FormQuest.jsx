import React from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

export default function FormQuest({ aoSalvar, turmas = [] }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // O DatePicker retorna um objeto DayJS. Convertemos para Date nativo do JS.
        const dadosFormatados = {
            ...values,
            dataEntrega: values.dataEntrega ? values.dataEntrega.toDate() : null
        };
        
        aoSalvar(dadosFormatados);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ dificuldade: "Normal", xp: 100 }}
        >
            <Form.Item
                name="titulo"
                label="Título da Quest"
                rules={[{ required: true, message: 'A missão precisa de um título!' }]}
            >
                <Input prefix={<RocketOutlined />} placeholder="Ex: Derrotar o Bug do Milênio" />
            </Form.Item>

            <Form.Item
                name="descricao"
                label="Descrição da Missão"
                rules={[{ required: true }]}
            >
                <TextArea rows={4} placeholder="Descreva o que os alunos devem fazer..." />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <Form.Item
                    name="xp"
                    label="XP (Recompensa)"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="dificuldade"
                    label="Dificuldade"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="Fácil">Fácil</Option>
                        <Option value="Normal">Normal</Option>
                        <Option value="Difícil">Difícil</Option>
                        <Option value="Lendária">Lendária</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dataEntrega"
                    label="Data Limite"
                    rules={[{ required: true, message: 'Selecione uma data!' }]}
                >
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
            </div>

            {/* Select Dinâmico de Turmas */}
            <Form.Item
                name="turma"
                label="Atribuir à Turma"
                rules={[{ required: true, message: 'A quest deve pertencer a uma turma!' }]}
            >
                <Select placeholder="Selecione a turma">
                    {turmas.map((t) => (
                        <Option key={t.getId()} value={t.getId()}>
                            {t.getNome()}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                    Lançar Quest
                </Button>
            </Form.Item>
        </Form>
    );
}