import express, { Request, Response } from 'express'
import ClientController from '../../controllers/client.controller'

import { authenticateClient, authenticateAdmin, authenticateBoth } from '../../middlewares/auth.middleware'
import multerMiddleware from '../../middlewares/multer.middleware'
import { responseWithStatus } from '../../utils/response.util'
const router = express.Router();

router.get('/getPools', async (req: Request | any, res: Response) => {
    const {providerAddress} = req.query;

    // console.log(providerAddress,"providerAddress route")
    const controller = new ClientController(req, res)
    const response = await controller.getPools(providerAddress);
    const { status } = response;
    return responseWithStatus(res, status, response)
});
//ends

// router.post('/register', async (req: Request | any, res: Response) => {
//     const { email, password, phoneNumber, domain } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.register({ email, password, phoneNumber, domain });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// router.put('/resendLink', async (req: Request | any, res: Response) => {
//     const { email , domain } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.resendLink({ email , domain });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });


// router.post('/login', async (req: Request | any, res: Response) => {
//     const { email, password } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.login({ email, password });
//     const { status } = response;
//     return responseWithStatus(res, status, response);
// });

// router.post('/changePassword', authenticateClient, async (req: Request | any, res: Response) => {
//     const { oldPassword, newPassword } = req.body;
//     const controller = new ClientController(req, res)
//     const response = await controller.changePassword({ oldPassword, newPassword });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// router.get('/profile', authenticateClient, async (req: Request | any, res: Response) => {
//     const controller = new ClientController(req, res)
//     const response = await controller.profile();
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });



// router.put('/verifyLink', authenticateClient, async (req: Request | any, res: Response) => {
//     const { id } = req.body.user;
//     const controller = new ClientController(req, res)
//     const response = await controller.verifyLink({ id });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// router.post('/updateProfile', authenticateClient, async (req: Request | any, res: Response) => {
//     let { phoneNumber } = req.body;
//     const controller = new ClientController(req, res);
//     const response = await controller.updateProfile({ phoneNumber });
//     return responseWithStatus(res, response.status, response)
// });

// router.post('/forgotPassword', async (req: Request | any, res: Response) => {
//     const { email } = req.body;
//     // console.log(req.body)
//     const controller = new ClientController(req, res)
//     // console.log("req.body")
//     const response = await controller.forgotPassword({ email });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })


module.exports = router
