import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import path from 'path';
import fs from 'fs';

const app = express();

// ensure uploads dir
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api', routes);

app.use(errorHandler);

export default app;
