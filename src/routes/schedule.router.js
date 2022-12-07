import {Router} from 'express';
const router = Router();

import{getSchedules ,createSchedule, deleteSchedule} from '../controllers/schedule.controller.js';


router.get('/:id/:day', getSchedules);

router.post('/', createSchedule);

router.delete('/:id/:day', deleteSchedule);


export default router;