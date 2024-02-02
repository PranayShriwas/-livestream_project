// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    font-weight: bold;
  }

  input {
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    font-size: 14px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

const OverlayList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const FormTitle = styled.h3`
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    font-weight: bold;
  }

  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    font-size: 14px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

function App() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    // Fetch overlay settings from the backend
    axios.get('http://localhost:8000/api/overlays/')
      .then(response => setOverlays(response.data))
      .catch(error => console.error('Error fetching overlays:', error));
  }, []);

  const handleOverlaySubmit = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      content: e.target.content.value,
      position_x: e.target.position_x.value,
      position_y: e.target.position_y.value,
      size: e.target.size.value,
    };

    // Send a POST request to create a new overlay
    try {
      const response = await axios.post('http://localhost:8000/api/overlays/', formData);
      // Update the overlays state with the new overlay
      setOverlays([...overlays, response.data]);
      // Clear the form
      e.target.reset();
    } catch (error) {
      console.error('Error adding overlay:', error);
    }
  };

  return (
    <Container>
      <Title>RTSP Livestream with Overlays</Title>

      <InputContainer>
        <label>RTSP URL:</label>
        <input type="text" onChange={(e) => setRtspUrl(e.target.value)} />
        <button>Play</button>
      </InputContainer>

      <ReactPlayer url={rtspUrl} controls />

      <OverlayList>
        <h2>Overlay Settings</h2>
        {overlays.map(overlay => (
          <li key={overlay.id}>
            {overlay.content} - {overlay.position_x}, {overlay.position_y} - Size: {overlay.size}
          </li>
        ))}
      </OverlayList>

      <FormContainer>
        <FormTitle>Add New Overlay</FormTitle>
        <Form onSubmit={handleOverlaySubmit}>
          <label>Content:</label>
          <input type="text" name="content" required />

          <label>X Position:</label>
          <input type="number" name="position_x" required />

          <label>Y Position:</label>
          <input type="number" name="position_y" required />

          <label>Size:</label>
          <input type="number" name="size" required />

          <button type="submit">Add Overlay</button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default App;
