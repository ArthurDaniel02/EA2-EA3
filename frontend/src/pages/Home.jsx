import React from 'react';
import { Card, Typography, Timeline, Row, Col, Statistic } from 'antd';
import { DatabaseOutlined, RocketOutlined, TeamOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  return (
    <div>
      {/* Título Principal */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={2}>🛡️ RPG Educacional</Title>
        <Paragraph style={{ fontSize: '18px', color: '#555' }}>
          Sistema de Gamificação Escolar Fullstack
        </Paragraph>
        <Text type="secondary">
          Projeto desenvolvido para as avaliações <strong>EA2 (Backend)</strong> e <strong>EA3 (Frontend)</strong> da disciplina de Programação de Computadores.
        </Text>
      </div>

      {/* Cards de Resumo */}
      <Row gutter={[16, 16]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#e6f7ff' }}>
            <Statistic
              title="Módulo 1"
              value="Professores"
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text type="secondary">Gestão de docentes</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#f6ffed' }}>
            <Statistic
              title="Módulo 2"
              value="Turmas"
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Text type="secondary">Vínculo com Profs.</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#fff7e6' }}>
            <Statistic
              title="Módulo 3"
              value="Quests"
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Text type="secondary">Missões para alunos</Text>
          </Card>
        </Col>
      </Row>

      {/* Área Explicativa com Timeline */}
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Card title="🚀 Sobre o Projeto" bordered={false}>
            <Paragraph>
              Esta plataforma permite que professores gerenciem suas salas de aula de forma lúdica.
              O sistema foi construído utilizando a stack <strong>MERN</strong> (MongoDB, Express, React, Node.js).
            </Paragraph>
            <Paragraph>
              <ul>
                <li><strong>Backend (EA2):</strong> API RESTful com persistência em MongoDB Atlas.</li>
                <li><strong>Frontend (EA3):</strong> Interface SPA com React e Ant Design.</li>
                <li><strong>Integração:</strong> Comunicação via Fetch API e padrão DAO.</li>
              </ul>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="🔗 Fluxo de Relacionamentos (Lógica)" bordered={false}>
            <Timeline
              items={[
                {
                  color: 'blue',
                  children: (
                    <>
                      <Text strong>1. Cadastrar Professor</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>A base de tudo. Sem professor, não há turma.</Text>
                    </>
                  ),
                  dot: <UserOutlined />,
                },
                {
                  color: 'green',
                  children: (
                    <>
                      <Text strong>2. Criar Turma</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>A turma é vinculada obrigatoriamente a um professor existente.</Text>
                    </>
                  ),
                  dot: <TeamOutlined />,
                },
                {
                  color: 'orange',
                  children: (
                    <>
                      <Text strong>3. Lançar Quest (Missão)</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>A missão é atribuída a uma turma específica.</Text>
                    </>
                  ),
                  dot: <RocketOutlined />,
                },
                {
                  color: 'gray',
                  children: (
                    <>
                      <Text strong>Persistência de Dados</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>Tudo salvo no MongoDB Atlas.</Text>
                    </>
                  ),
                  dot: <DatabaseOutlined />,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;