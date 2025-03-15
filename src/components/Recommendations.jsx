// src/components/Recommendations.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const Recommendations = () => {
  return (
    <Container>
      <Title>Recommendations</Title>
      <Subtitle>Here are some recommendations for you!</Subtitle>
      {/* Add your recommendations content here */}
    </Container>
  );
};

export default Recommendations;