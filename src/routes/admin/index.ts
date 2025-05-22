import express from 'express';
import uploadRouter from './upload';

const adminRoutes = express();

adminRoutes.use(uploadRouter)

export default adminRoutes