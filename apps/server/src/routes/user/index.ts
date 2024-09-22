import { Router } from "express"
import { authorize } from "../../middlewares/auth"
import { GetTasksReports } from "../../controllers/user"

const router = Router()

router.get("/user/reports",authorize,GetTasksReports)


export {router as UserRoutes}