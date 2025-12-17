import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#001529', color: '#b0b0b0' }}>
      <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        &copy; 2025 Plataforma de RPG Educacional. Todos os direitos reservados.
      </p>
      <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>
        Desenvolvido para a disciplina de Programação de Computadores 3.
      </p>
    </AntFooter>
  );
}