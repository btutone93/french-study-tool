import { useState } from 'react';
import { EvaluationRequest } from '@repo/shared';
import { fetchApi } from './lib/api';

export default function App() {
  const [sentence, setSentence] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EvaluationRequest = {
      userSentence: sentence,
      targetTense: 'Passé Composé',
      targetSubject: 'Elle',
      requiredVocab: ['partir'],
    };
    // need to ensure 
    console.log('Sending payload:', payload);

    const resp = await fetchApi('/evaluate', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    console.log('Received: ', resp);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>French Sentence Tutor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Write in French..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
          Evaluate
        </button>
      </form>
    </div>
  );
}