// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import './App.css'; // Import additional styles

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2c3e50; /* Midnight Blue */
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.2em;
    color: #3498db; /* Belize Hole */
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1px solid #3498db; /* Belize Hole */
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 1.2em;
    background-color: #e74c3c; /* Alizarin */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c0392b; /* Pomegranate */
    }
  }
`;

const OverlayList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  color: #2c3e50; /* Midnight Blue */
  margin-bottom: 15px;
  font-size: 1.8em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.2em;
    color: #3498db; /* Belize Hole */
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    margin-bottom: 15px;
    border: 1px solid #3498db; /* Belize Hole */
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 1.2em;
    background-color: #2ecc71; /* Emerald */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #27ae60; /* Nephritis */
    }
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
      <Title>🎬 RTSP Livestream with Overlays 🎨</Title>

      <InputContainer>
        <label>RTSP URL:</label>
        <input type="text" onChange={(e) => setRtspUrl(e.target.value)} />
        <button>Play Now!</button>
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
