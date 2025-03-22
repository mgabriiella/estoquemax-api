import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Importar rotas
import produtoRoutes from './routes/produtoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import vendaRoutes from './routes/vendaRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Configuração
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}/api`);
});