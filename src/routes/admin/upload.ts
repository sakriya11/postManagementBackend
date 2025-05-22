import { Router } from "express";

import contentController from "../../controller/content";

const uploadRouter = Router();

uploadRouter

.delete('/delete/:id',contentController.adminDeleteContent)

export default uploadRouter;