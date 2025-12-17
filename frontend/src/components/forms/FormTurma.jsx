import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
import { TeamOutlined, NumberOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

export default function FormTurma({ aoSalvar, professores = [], dadosEdicao }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (dadosEdicao) {

            const getProfId = () => {
                const p = dadosEdicao.getProfessor ? dadosEdicao.getProfessor() : dadosEdicao.professor;
                if (!p) return null;
                return p.id || p._id || p;
            };

            form.setFieldsValue({
                nome: dadosEdicao.getNome ? dadosEdicao.getNome() : dadosEdicao.nome,
                codigo: dadosEdicao.getCodigo ? dadosEdicao.getCodigo() : dadosEdicao.codigo,
                semestre: dadosEdicao.getSemestre ? dadosEdicao.getSemestre() : dadosEdicao.semestre,
                descricao: dadosEdicao.getDescricao ? dadosEdicao.getDescricao() : dadosEdicao.descricao,
                ativa: dadosEdicao.getAtiva ? dadosEdicao.getAtiva() : dadosEdicao.ativa,
                professor: getProfId()
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
            initialValues={{ ativa: true }}
        >
            <Form.Item name="nome" label="Nome da Turma" rules={[{ required: true }]}>
                <Input prefix={<TeamOutlined />} placeholder="Ex: Insira o nome da Turma" />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item name="codigo" label="Código" rules={[{ required: true }]}>
                    <Input prefix={<NumberOutlined />} placeholder="Ex: MAT-2025"/>
                </Form.Item>
                <Form.Item name="semestre" label="Semestre" rules={[{ required: true }]}>
                    <Input prefix={<NumberOutlined />} placeholder="Ex: 2025/2"/>
                </Form.Item>
            </div>

            <Form.Item name="professor" label="Professor Responsável" rules={[{ required: true }]}>
                <Select placeholder="Selecione...">
                    {professores.map((prof) => (
                        <Option key={prof.getId()} value={prof.getId()}>
                            {prof.getNome()}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="descricao" label="Descrição">
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item name="ativa" label="Turma Ativa?" valuePropName="checked">
                <Switch checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                    {dadosEdicao ? "Atualizar Turma" : "Criar Turma"}
                </Button>
            </Form.Item>
        </Form>
    );
}