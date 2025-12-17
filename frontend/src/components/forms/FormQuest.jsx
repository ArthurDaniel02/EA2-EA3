import React, { useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; 

const { Option } = Select;
const { TextArea } = Input;

export default function FormQuest({ aoSalvar, turmas = [], dadosEdicao }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (dadosEdicao) {
            const getVal = (method, prop) => (dadosEdicao[method] ? dadosEdicao[method]() : dadosEdicao[prop]);

            const turmaObj = getVal('getTurma', 'turma');
            const turmaId = turmaObj ? (turmaObj.id || turmaObj._id || turmaObj) : null;
            const dataRaw = getVal('getDataEntrega', 'dataEntrega');
            const dataDayjs = dataRaw ? dayjs(dataRaw) : null;

            form.setFieldsValue({
                titulo: getVal('getTitulo', 'titulo'),
                descricao: getVal('getDescricao', 'descricao'),
                xp: getVal('getXp', 'xp'),
                dificuldade: getVal('getDificuldade', 'dificuldade'),
                dataEntrega: dataDayjs,
                turma: turmaId
            });
        } else {
            form.resetFields();
        }
    }, [dadosEdicao, form]);

    const onFinish = (values) => {
        const dadosProntos = {
            ...values,
            dataEntrega: values.dataEntrega ? values.dataEntrega.toDate() : null
        };
        
        aoSalvar(dadosProntos);
        
        if (!dadosEdicao) form.resetFields();
    };
 

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ dificuldade: "Normal", xp: 100 }}
        >
            <Form.Item name="titulo" label="Título" rules={[{ required: true }]}>
                <Input prefix={<BookOutlined />}  placeholder="Insira um título"/>
            </Form.Item>

            <Form.Item name="descricao" label="Descrição" rules={[{ required: true }]}>
                <TextArea rows={4} />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <Form.Item name="xp" label="XP" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="dificuldade" label="Dificuldade" rules={[{ required: true }]}>
                    <Select>
                        <Option value="Fácil">Fácil</Option>
                        <Option value="Normal">Normal</Option>
                        <Option value="Difícil">Difícil</Option>
                        <Option value="Lendária">Lendária</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="dataEntrega" label="Data Limite" rules={[{ required: true }]}>
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
            </div>

            <Form.Item name="turma" label="Atribuir à Turma" rules={[{ required: true }]}>
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
                    {dadosEdicao ? "Atualizar Missão" : "Lançar Quest"}
                </Button>
            </Form.Item>
        </Form>
    );
}