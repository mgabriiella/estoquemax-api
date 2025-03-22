import Cliente from '../models/Cliente.js';

// Buscar todos os clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar novo cliente
export const createCliente = async (req, res) => {
  try {
    // Verificar se o email já existe
    const emailExists = await Cliente.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    
    const cliente = new Cliente(req.body);
    const novoCliente = await cliente.save();
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar cliente
export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    // Verificar se o email já existe (se estiver sendo atualizado)
    if (req.body.email && req.body.email !== cliente.email) {
      const emailExists = await Cliente.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }
    
    // Atualizar campos
    cliente.name = req.body.name || cliente.name;
    cliente.email = req.body.email || cliente.email;
    cliente.phone = req.body.phone || cliente.phone;
    cliente.address = req.body.address || cliente.address;
    
    const updatedCliente = await cliente.save();
    res.json(updatedCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar cliente
export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    await cliente.deleteOne();
    res.json({ message: 'Cliente removido' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};