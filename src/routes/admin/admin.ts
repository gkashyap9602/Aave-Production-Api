// import express, { Request, Response } from 'express'
// import AdminController from '../../controllers/admin.controller'
// import { authenticateAdmin ,authenticateBoth} from '../../middlewares/auth.middleware'
// import { responseWithStatus } from '../../utils/response.util'
// import adminMulterMiddleware from '../../middlewares/adminMulter.middleware'
// import multerMiddleware from '../../middlewares/multer.middleware'
// import { moveFilePath2 } from '../../services/utils'

// const router = express.Router()


// router.post('/login', async (req: Request | any, res: Response) => {
//     const { email, password } = req.body;
//     const controller = new AdminController(req, res)
//     const response = await controller.login({ email, password });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// router.post('/browseLayers', async (req: Request | any, res: Response) => {
//     const { layerName } = req.body;
//     // console.log(layerName,"layerName body")
//     const controller = new AdminController(req, res)
//     const response = await controller.addLayer({layerName});
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// router.get('/browseLayers', async (req: Request | any, res: Response) => {
//     // const { layerName } = req.body;
//     // console.log(layerName,"layerName body")
//     const controller = new AdminController(req, res)
//     const response = await controller.getLayers();
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// router.post('/updateBrowserLayer', authenticateAdmin, async (req: Request | any, res: Response) => {
//     const { name, layerId } = req.body;
//     const controller = new AdminController(req, res)
//     const response = await controller.updateBrowserLayer({ name, layerId });
//     return responseWithStatus(res, response.status, response);
// });

// router.post('/browseImages',authenticateAdmin, adminMulterMiddleware.any(), async (req: Request | any, res: Response) => {
//     console.log(req.files)
//     const { layerId,layerName } = req.body;
//     const controller = new AdminController(req, res)
//     const response = await controller.addBrowseImages(layerId,layerName,req.files);
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// router.get('/browseImages/:layerId',authenticateBoth, async (req: Request | any, res: Response) => {
//     // console.log(req.files)
//     const { layerId } = req.params;
//     // console.log(layerId,"layerId")
//     const controller = new AdminController(req, res)
//     const response = await controller.getBrowseImages(layerId);
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });
// router.get('/userDetails', authenticateAdmin, async (req: Request | any, res: Response) => {
//     const { pageNumber, pageSize, startDate, endDate, searchByName,exportRequest } = req.query;
//     console.log(pageNumber,pageSize,"pageNumber,pageSize")
//     const controller = new AdminController(req, res)
//     const response = await controller.userDetails(pageNumber, pageSize, startDate, endDate, searchByName ,exportRequest);
//     const { status, data } = response;
//     if(exportRequest === 'true') {
//         return res.send(data)
//     }
//     return responseWithStatus(res, response.status, response)
// })

// router.delete('/browseLayer/:layerId', authenticateAdmin, async (req: Request | any, res: Response) => {
//     const { layerId } = req.params;
//     const controller = new AdminController(req, res)
//     const response = await controller.deleteLayer( layerId);
//     return responseWithStatus(res, response.status, response);
// });

// router.delete('/browseImage/:imageId', authenticateAdmin, async (req: Request | any, res: Response) => {
//     const { imageId } = req.params;
//     const controller = new AdminController(req, res)
//     const response = await controller.deleteImage(imageId);
//     return responseWithStatus(res, response.status, response);
// });


// router.get('/profile', authenticateAdmin, async (req: Request | any, res: Response) => {
//     const controller = new AdminController(req, res)
//     const response = await controller.profile();
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// });

// // router.put('/testApiS3', multerMiddleware.single('test'), authenticateAdmin, async (req: Request | any, res: Response) => {
// //     const controller = new AdminController(req, res);
// //     const response = await controller.testApiS3(req.file as Express.Multer.File);
// //     return responseWithStatus(res, response.status, response)
// // });

// router.post('/updateProfile',multerMiddleware.single('profile'),authenticateAdmin, async (req: Request | any, res: Response) => {
//     const { userName} = req.body;
//     if (req.filevalidationerror) {
//         return responseWithStatus(res, 400, { error: req.filevalidationerror });
//     }
//     const controller = new AdminController(req, res)
//     const response = await controller.updateProfile(userName,req.file as Express.Multer.File);
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })



// // router.post('/updateProfile', authenticateAdmin, async (req: Request | any, res: Response) => {
// //     let { userName } = req.body;
// //     const controller = new AdminController(req, res);
// //     const response = await controller.updateProfile({ userName });
// //     return responseWithStatus(res, response.status, response)
// // });
// router.post('/changePassword', authenticateAdmin, async (req: Request | any, res: Response) => {
//     const { oldPassword, newPassword } = req.body;
//     const controller = new AdminController(req, res)
//     const response = await controller.changePassword({ oldPassword, newPassword });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// // router.post('/update-layer', authenticateAdmin, async (req: Request | any, res: Response) => {
// //     const { name, layerId } = req.body;
// //     const controller = new AdminController(req, res)
// //     const response = await controller.updateLayer({ name, layerId });
// //     return responseWithStatus(res, response.status, response);
// // });
// router.post('/forgotPassword', async (req: Request | any, res: Response) => {
//     const { email, domain } = req.body;
//     const controller = new AdminController(req, res)
//     const response = await controller.forgotPassword({ email, domain });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// // router.post('/changePassword', authenticateAdmin, async (req: Request | any, res: Response) => {
// //     const { oldPassword, newPassword } = req.body;
// //     const controller = new AdminController(req, res)
// //     const response = await controller.changePassword({ oldPassword, newPassword });
// //     const { status } = response;
// //     return responseWithStatus(res, status, response)
// // })

// router.post('/resetPassword', authenticateAdmin, async (req: Request | any, res: Response) => {
//     // check purpose field
//     const { purpose } = req.body.user;
//     if (!purpose || purpose !== 'reset') {
//         return responseWithStatus(res, 400, {
//             data: {},
//             error: 'Invalid Token',
//             message: '',
//             status: 400
//         })
//     }
//     const { password } = req.body;
//     const controller = new AdminController(req, res)
//     const response = await controller.resetPassword({ password });
//     const { status } = response;
//     return responseWithStatus(res, status, response)
// })

// // router.get('/me', authenticateAdmin, async (req: Request | any, res: Response) => {
// //     const controller = new AdminController(req, res)
// //     const response = await controller.me();
// //     const { status } = response;
// //     return responseWithStatus(res, status, response)
// // })

// // router.post('/update', authenticateAdmin, async (req: Request | any, res: Response) => {
// //     const { id } = req.body.user;
// //     if (!id) {
// //         return responseWithStatus(res, 400, {
// //             data: {},
// //             error: 'Invalid Token',
// //             message: '',
// //             status: 400
// //         })
// //     }
// //     const { firstName, lastName, email } = req.body;
// //     const controller = new AdminController(req, res)
// //     const response = await controller.update({ firstName, lastName, email });
// //     return responseWithStatus(res, response.status, response)
// // })




// module.exports = router
