import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  // Buscar todos os produtos
  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  // Adicionar novo produto
  const adicionarProduto = () => {
    const novoProduto = { nome, quantidade, preco };

    axios.post('http://localhost:5000/produtos', novoProduto)
      .then(response => {
        setProdutos([...produtos, response.data]);
        // Limpar os campos após adicionar o produto
        setNome('');
        setQuantidade('');
        setPreco('');
      })
      .catch(error => console.error('Erro ao adicionar produto:', error));
  };


  // Parte da interface
  return (
    <div>
      <h1>Controle de Estoque</h1>
      
      {/* Formulário para adicionar produto */}
      <input
        type="text"
        placeholder="Nome do Produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <button onClick={adicionarProduto}>Adicionar Produto</button>

      {/* Lista de Produtos */}
      <h2>Lista de Produtos</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto._id}>
            {produto.nome} - {produto.quantidade} unidades - R$ {produto.preco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
