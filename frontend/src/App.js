import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [transactions, setTransactions] = useState([]); 
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions/');
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/transactions/', formData);
      fetchTransactions();
      setFormData({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Finance app
          </a>
        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>
             Quantia
            </label>
            <input
              type='text'
              className='form-control'
              id='amount'
              name='amount'
              onChange={handleInputChange}
              value={formData.amount}
            />
          </div>
          <div className='mb-3 mt-3'>
            <label htmlFor='category' className='form-label'>
             Categoria
            </label>
            <input
              type='text'
              className='form-control'
              id='category'
              name='category'
              onChange={handleInputChange}
              value={formData.category}
            />
          </div>
          <div className='mb-3 '>
            <label htmlFor='description' className='form-label'>
             Descrição
            </label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='is_income' className='form-label'>
             Renda
            </label>
            <input
              type='checkbox'
              className='form-check-input'
              id='is_income'
              name='is_income'
              onChange={handleInputChange}
              checked={formData.is_income}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='date' className='form-label'>
             Data
            </label>
            <input
              type='text'
              className='form-control'
              id='date'
              name='date'
              onChange={handleInputChange}
              value={formData.date}
            />
          </div>

          <button className='btn btn-primary' type='submit'>
            Enviar
          </button>
        </form>

        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Quantia</th>
              <th>Categoria</th>
              <th>Descrinção</th>
              <th>Renda?</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? 'sim' : 'nao'}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default App;
