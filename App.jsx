import React, { useState } from 'react';

export default function App() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    pair: '',
    entry: '',
    exit: '',
    lot: '',
    result: 'Profit',
    notes: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newLog = {
      ...form,
      pnl: ((parseFloat(form.exit) - parseFloat(form.entry)) * parseFloat(form.lot) * 100).toFixed(2)
    };
    setLogs([newLog, ...logs]);
    setForm({ pair: '', entry: '', exit: '', lot: '', result: 'Profit', notes: '' });
  };

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#121212', minHeight: '100vh' }}>
      <h2>📊 Journalses - Dashboard Jurnal Trading</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="pair" placeholder="Pair (e.g. EURUSD)" value={form.pair} onChange={handleChange} required />
        <input name="entry" type="number" placeholder="Entry Price" value={form.entry} onChange={handleChange} required />
        <input name="exit" type="number" placeholder="Exit Price" value={form.exit} onChange={handleChange} required />
        <input name="lot" type="number" placeholder="Lot (e.g. 0.01)" value={form.lot} onChange={handleChange} required />
        <select name="result" value={form.result} onChange={handleChange}>
          <option>Profit</option>
          <option>Loss</option>
        </select>
        <input name="notes" placeholder="Catatan" value={form.notes} onChange={handleChange} />
        <button type="submit">Tambah Jurnal</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: '#1e1e1e' }}>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Lot</th>
            <th>Hasil</th>
            <th>Catatan</th>
            <th>PNL</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.pair}</td>
              <td>{log.entry}</td>
              <td>{log.exit}</td>
              <td>{log.lot}</td>
              <td>{log.result}</td>
              <td>{log.notes}</td>
              <td style={{ color: log.result === 'Profit' ? 'lime' : 'tomato' }}>{log.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
