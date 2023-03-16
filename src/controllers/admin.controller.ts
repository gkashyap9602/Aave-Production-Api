import {
    Route,
    Controller,
    Tags,
    Post,
    Body,
    Get,
    Security,
    Query,
    Delete,
    Path,
    FormField,
    UploadedFiles,
    UploadedFile,
    Put

} from "tsoa";
// import { IResponse } from "../utils/interfaces.util";
// import { Request, Response } from "express";
// import { findOne, getById, upsert, getAll, findAll, getFilterMonthDateYear, getAllBySort, deleteById, deleteMany, update } from "../helpers/db.helpers";
// import { verifyHash, signToken, genHash } from "../utils/common.util";
// import {
//     validateChangePassword,
//     validateForgotPassword,
//     validateProfile,
//     validateResetPassword,
//     validateAdmin,
// } from "../validations/admin.validator";
// import adminModel from "../models/admin.model";
// import browseLayerModel from "../models/browseLayer.model";
// // import { makeDirectory } from "../services/fileSystem";
// import fs from "fs/promises";
// import fsSystem from "fs";
// import logger from "../configs/logger.config";
// import { sendEmail } from "../configs/nodemailer";
// import { readHTMLFile, getCSVFromJSON, removeDirectory, unlinkImages, } from "../services/utils";
// import path from "path";
// import handlebar from "handlebars";
// import browseImageModel from "../models/browseImage.model";
// import clientModel from "../models/client.model";
// import mongoose from 'mongoose'
// @Tags("Admin")
// @Route('/admin')

// export default class AdminController extends Controller {
//     req: Request;
//     res: Response;
//     userId: string;
//     constructor(req: Request, res: Response) {
//         super();
//         this.req = req;
//         this.res = res;
//         this.userId = req.body.user ? req.body.user.id : "";
//     }

//     /**
//      * Get user loginss
//      */
//     @Post("/login")
//     public async login(
//         @Body() request: { email: string; password: string }
//     ): Promise<IResponse> {
//         try {
//             const { email, password } = request;
//             const validatedUser = validateAdmin({ email, password });
//             if (validatedUser.error) {
//                 throw new Error(validatedUser.error.message);
//             }
//             const exists = await findOne(adminModel, { email });
//             if (!exists) {
//                 throw new Error("Admin doesn't exists!");
//             }
//             // check if blocked
//             if (exists.isBlocked) {
//                 throw new Error("Admin is not approved yet!");
//             }

//             const isValid = await verifyHash(password, exists.password);
//             if (!isValid) {
//                 throw new Error("Password seems to be incorrect");
//             }
//             const token = await signToken(exists._id, { access: 'admin' });
//             // const token = await signToken(exists._id, { access: 'admin' }, '24hr');
//             delete exists.password;
//             return {
//                 data: { ...exists, token },
//                 error: "",
//                 message: "Login Successfully",
//                 status: 200,
//             };
//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     }

//     /**
//      * Add Browse Layer
//      */
//     @Security("Bearer")
//     @Post("/browseLayers")
//     public async addLayer(
//         @Body() request: { layerName: string }
//     ): Promise<IResponse> {
//         try {
//             const { layerName } = request;
//             console.log(layerName, "layerName-new");
//             // const validatedProfile = validateProfile({ firstName, lastName, email, password });
//             // if (validatedProfile.error) {
//             //     throw new Error(validatedProfile.error.message)
//             // }
//             // check if user exists
//             const exists = await findOne(browseLayerModel, { layerName });
//             if (exists) {
//                 throw new Error(`Layer ${layerName} is already Exist`);
//             }
//             let path = `uploads/admin/browseImages/${layerName}`;
//             let dir = `${process.cwd()}/public/${path}`;
//             await fs.mkdir(dir, { recursive: true });

//             let layerData = new browseLayerModel({
//                 layerName,
//                 path,
//             });

//             console.log(layerData, "layerData -- controller");
//             const saveResponse = await upsert(browseLayerModel, layerData);
//             // create a temp token
//             // const token = await signToken(saveResponse._id, { access: 'admin' }, '1hr')
//             return {
//                 data: { ...saveResponse.toObject() },
//                 error: "",
//                 message: "Layer Created Successfully",
//                 status: 201,
//             };
//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     };
//     //end
//     //* Get browse Layers
//     @Security('Bearer')
//     @Get("/browseLayers")
//     public async getLayers(): Promise<IResponse> {
//         try {

//             const layers = await findAll(browseLayerModel, {})
//             //   console.log(layers,"layers--all")

//             return {
//                 data: layers || {},
//                 error: "",
//                 message: "Layers Fetch Successfully",
//                 status: 200,
//             };
//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     };
//     //ends
//     //* Add browse Images
//     @Security("Bearer")
//     @Post("/browseImages")
//     public async addBrowseImages(@FormField() layerId: string, @FormField() layerName: string, @UploadedFiles() files: Express.Multer.File[]): Promise<IResponse> {
//         try {
//             // const { layerId, files } = request;
//             console.log(layerId, "layerId-new");
//             console.log(files, "files-new");

//             // const validatedProfile = validateProfile({ firstName, lastName, email, password });
//             // if (validatedProfile.error) {
//             //     throw new Error(validatedProfile.error.message)
//             // }
//             // check if layer exists
//             const layer = await findOne(browseLayerModel, { _id: layerId });
//             let saveResponse
//             if (layer && fsSystem.existsSync(`${process.cwd()}/public/${layer.path}`)) {
//                 let imageData
//                 for (let file of files) {
//                     console.log(file, "file ---")

//                     let path = `${layer.path}/${file.filename}`;
//                     imageData = new browseImageModel({
//                         layerId,
//                         imageName: file.filename,
//                         url: `/${path}`,
//                         path
//                     });
//                     saveResponse = await upsert(browseImageModel, imageData);

//                 };
//                 console.log(imageData, "imageData--")
//                 return {
//                     data: { ...saveResponse.toObject() },
//                     error: "",
//                     message: "Image Upload Successfully",
//                     status: 201,
//                 };

//             } else {
//                 throw new Error(`Layer Not Exist`);
//             }

//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     };
//     //ends

//     //* Get browse Images
//     @Security("Bearer")
//     @Get("/browseImages/:layerId")
//     public async getBrowseImages(layerId: string): Promise<IResponse> {
//         try {
//             // const { layerId } = request;
//             console.log(layerId, "layerId--")
//             const layer = await findOne(browseLayerModel, { _id: layerId })
//             let images
//             if (layer) {
//                 images = await findAll(browseImageModel, { layerId: layer._id })
//                 console.log(images, "images of particular layer id ")
//             }

//             return {
//                 data: images || {},
//                 error: "",
//                 message: "Images Fetch Successfully",
//                 status: 200,
//             };
//         } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`);
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: "",
//                 status: 400,
//             };
//         }
//     };

//     //ends



//     /**
//   * update Template Layer
//   */
//     @Security('Bearer')
//     @Post("/updateBrowserLayer")
//     public async updateBrowserLayer(@Body() request: { name: string, layerId: string }): Promise<IResponse> {
//         try {
//             const { name, layerId } = request;
//             // check if template exists
//             const old = await getById(browseLayerModel, layerId);
//             if (!old) {
//                 throw new Error(`Browse Layer With ${layerId} doesn't exists`)
//             }
//             let exists = await findOne(browseLayerModel, { layerName: name })
//             if (exists) {
//                 throw new Error(`Browse Layer With this name already exists`)
//             }
//             let oldImages = await findAll(browseImageModel, { layerId: old._id });
//             console.log(oldImages, 'images');

//             let newPath = old.path.slice(0, old.path.lastIndexOf('/')) + '/' + name;
//             console.log(newPath, 'path');
//             for (let img of oldImages) {
//                 await upsert(browseImageModel, { path: `${newPath}/${img.imageName}`, url: `/${newPath}/${img.imageName}` }, img._id);
//             }
//             await fs.cp(`${process.cwd()}/public/${old.path}`, `${process.cwd()}/public/${newPath}`, { recursive: true });
//             const saveResponse = await upsert(browseLayerModel, { layerName: name, path: newPath }, old._id);
//             await fs.rmdir(`${process.cwd()}/public/${old.path}`, { recursive: true })

//             return {
//                 data: { ...saveResponse.toObject() },
//                 error: '',
//                 message: 'Layer updated successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }








//     //* Get browse Layers
//     @Security("Bearer")
//     @Get("/userDetails")
//     public async userDetails(@Query() pageNumber: string, @Query() pageSize: string, @Query() startDate = null, @Query() endDate = null, @Query() searchByName = null, @Query() exportRequest = 'false'): Promise<IResponse> {
//         try {
//             const query: any = [{ isDeleted: false, isProspect: false }];
//             if (searchByName) {
//                 query.push({
//                     "$or": [
//                         { "firstName": { $regex: searchByName, $options: 'i' } },
//                         // { "businessName": { $regex: searchByName, $options: 'i' } },
//                         { "email": { $regex: searchByName, $options: 'i' } },
//                     ]
//                 })
//             }
//             if (startDate && endDate) {
//                 query.push({

//                     ...((startDate || endDate) ? {
//                         createdAt: {

//                             ...(startDate ? {
//                                 $gte: new Date(`${startDate}T00:00:00Z`)
//                             } : null),
//                             ...(endDate ? {
//                                 $lte: `${getFilterMonthDateYear(endDate)}T00:00:00Z`
//                             } : null),
//                         }
//                     } : null),

//                     // createdAt: {
//                     //     $gte: new Date(`${startDate}T00:00:00Z`),
//                     //     $lte: new Date(`${endDate}T00:00:00Z`)
//                     // }
//                 });
//             }

//             const getAllresponse = await getAllBySort(clientModel, { $and: query }, Number(pageNumber), Number(pageSize), {}, exportRequest === 'false' ? true : false, { createdAt: -1 })

//             if (exportRequest == 'true') {
//                 // create csv and send to client
//                 const csv = getCSVFromJSON(['Sno', 'Name', 'Business Name', 'Email', 'Package', 'Register On'],
//                     getAllresponse.items.map((val, index) => {
//                         return { ...val, Sno: index + 1, "Name": val.firstName || '-', "Business Name": val.businessName || '-', "Email": val.email || '-', "Package": val.PlanDetails[0].price || '-', "Register On": val.createdAt || '-' }
//                     })

//                 )
//                 this.res.header('Content-Type', 'text/csv');
//                 this.res.attachment(`clients.csv`);
//                 return {
//                     data: csv,
//                     error: '',
//                     message: 'Fetched Successfully',
//                     status: 200
//                 }
//             }
//             return {
//                 data: getAllresponse,
//                 error: '',
//                 message: 'Fetched Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }
//     // ends


//     // Update profile
//     @Security('Bearer')
//     @Get("/profile")
//     public async profile(): Promise<IResponse> {
//         try {
//             //   check for a valid id
//             const getResponse = await getById(adminModel, this.userId);
//             if (!getResponse) {
//                 throw new Error('Admin doesn`t exists!');
//             }
//             delete getResponse.password;
//             return {
//                 data: getResponse || {},
//                 error: '',
//                 message: 'Fetch Successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     // @Security('Bearer')
//     // @Put("/testApiS3")
//     // public async testApiS3(@UploadedFile('test') file: Express.Multer.File): Promise<IResponse> {
//     //     try {
//     //         let url = `/uploads/common/${file.filename}`;
//     //         await upsert(adminModel, { profile: url }, this.userId);
//     //         return {
//     //             data: { url },
//     //             error: '',
//     //             message: 'Pic updated successfully',
//     //             status: 200
//     //         }
//     //     }
//     //     catch (err: any) {
//     //         logger.error(`${this.req.ip} ${err.message}`)
//     //         return {
//     //             data: null,
//     //             error: err.message ? err.message : err,
//     //             message: '',
//     //             status: 400
//     //         }
//     //     }
//     // }



//     /**
//    * Update Profile
//    */
//     @Security('Bearer')
//     @Post("/updateProfile")
//     public async updateProfile(@FormField() userName?: string, @UploadedFile() profile?: Express.Multer.File): Promise<IResponse> {
//         try {
//             let saveresponse;
//             let msg;
//             let fileName = profile?.filename
//             let exists = await findOne(adminModel, {})

//             if (exists) {

//                 let payload: { [m: string]: any } = {};
//                 if (userName) {
//                     payload.userName = userName;
//                 }

//                 if (profile) {
//                     payload.profile = fileName;
//                 }
//                 saveresponse = await upsert(adminModel, payload, exists._id)
//                 msg = 'Profile successfully updated!'

//             } else {
//                 saveresponse = await upsert(adminModel, { userName, profile: fileName })
//                 msg = 'Admin successfully Saved!'

//             }


//             return {
//                 data: saveresponse,
//                 error: '',
//                 message: msg,
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }






//     //     /**
//     // * Update ADMIN 
//     // */
//     // @Security('Bearer')
//     // @Post("/updateProfile")
//     // public async updateProfile(@Body() request: { userName?: string}): Promise<IResponse> {
//     //     try {

//     //         const { userName } = request;

//     //         let exists2 = await findOne(adminModel, { userName :userName });
//     //         // console.log("exists2", exists2)
//     //         if (exists2) {
//     //             throw new Error(`UserName ${userName} is already exists`)
//     //         }
//     //         var payload: { [k: string]: any } = {};
//     //         if (userName){
//     //             payload.userName = userName;
//     //         }
//     //         const saveResponse = await upsert(adminModel, payload, this.userId)

//     //         return {
//     //             data: saveResponse,
//     //             error: '',
//     //             message: 'Admin successfully updated!',
//     //             status: 200
//     //         }
//     //     }
//     //     catch (err: any) {
//     //         logger.error(`${this.req.ip} ${err.message}`)
//     //         return {
//     //             data: null,
//     //             error: err.message ? err.message : err,
//     //             message: '',
//     //             status: 400
//     //         }
//     //     }
//     // }


//     /**
// * Change Password endpoint
// */
//     @Security('Bearer')
//     @Post("/changePassword")
//     public async changePassword(@Body() request: { oldPassword: string, newPassword: string }): Promise<IResponse> {
//         try {
//             const { oldPassword, newPassword } = request;
//             const validatedChangePassword = validateChangePassword({ oldPassword, newPassword });;
//             if (validatedChangePassword.error) {
//                 throw new Error(validatedChangePassword.error.message)
//             }
//             const exists = await getById(adminModel, this.userId)
//             if (!exists) {
//                 throw new Error('Invalid Admin')
//             }
//             const isValid = await verifyHash(oldPassword, exists.password);
//             if (!isValid) {
//                 throw new Error('Password is incorrect')
//             }
//             const hashed = await genHash(newPassword)
//             const updated = await upsert(adminModel, { password: hashed }, this.userId)

//             return {
//                 data: {},
//                 error: '',
//                 message: 'Password changed successfully!',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     // /**
//     //  * Forgot password api endpoint
//     //  */
//         @Post("/forgotPassword")
//         public async forgotPassword(@Body() request: { email: string, domain: string }): Promise<IResponse> {
//             try {
//                 const { email, domain } = request;
//                 const validatedForgotPassword = validateForgotPassword({ email });
//                 if (validatedForgotPassword.error) {
//                     throw new Error(validatedForgotPassword.error.message)
//                 }
//                 // check if user exists
//                 const exists = await findOne(adminModel, { email });
//                 if (!exists) {
//                     throw new Error('Invalid User')
//                 }
//                 //   sign a token with userid & purpose
//                 const token = await signToken(exists._id, { purpose: 'reset',access: 'admin' }, '1h')
//                 //   send an email
//                 const html = await readHTMLFile(path.join(__dirname, '../', '../src/template', 'link_verrify_email.html'))
//                 const template = handlebar.compile(html)

//                 await sendEmail(process.env.EMAIL_NOTIFICATION_ADDRESS, 'Reset Your Password', email, template({ link: `${domain}reset-password?resetId=${token}` }))
//                 return {
//                     data: {},
//                     error: '',
//                     message: 'Password reset Link successfully sent to ' + email,
//                     status: 200
//                 }
//             } catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     //     /**
//     // * Forgot password api endpoint
//     // */
//     @Security('Bearer')
//     @Post("/resetPassword")
//     public async resetPassword(@Body() request: { password: string }): Promise<IResponse> {
//         try {
//             const { password } = request;
//             const validatedResetPassword = validateResetPassword({ password });
//             if (validatedResetPassword.error) {
//                 throw new Error(validatedResetPassword.error.message)
//             }
//             const hashed = await genHash(password)
//             const updated = await upsert(adminModel, { password: hashed }, this.userId)

//             return {
//                 data: {},
//                 error: '',
//                 message: 'Password reset successfully!',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     //     /**
//     // * Change Password endpoint
//     // */
//     //     @Security('Bearer')
//     //     @Post("/changePassword")
//     //     public async changePassword(@Body() request: { oldPassword: string, newPassword: string }): Promise<IResponse> {
//     //         try {
//     //             const { oldPassword, newPassword } = request;
//     //             const validatedChangePassword = validateChangePassword({ oldPassword, newPassword });;
//     //             if (validatedChangePassword.error) {
//     //                 throw new Error(validatedChangePassword.error.message)
//     //             }
//     //             const exists = await getById(adminModel, this.userId)
//     //             if (!exists) {
//     //                 throw new Error('Invalid Admin')
//     //             }
//     //             const isValid = await verifyHash(oldPassword, exists.password);
//     //             if (!isValid) {
//     //                 throw new Error('Password is incorrect')
//     //             }
//     //             const hashed = await genHash(newPassword)
//     //             const updated = await upsert(adminModel, { password: hashed }, this.userId)

//     //             return {
//     //                 data: {},
//     //                 error: '',
//     //                 message: 'Password changed successfully!',
//     //                 status: 200
//     //             }
//     //         }
//     //         catch (err: any) {
//     //             logger.error(`${this.req.ip} ${err.message}`)
//     //             return {
//     //                 data: null,
//     //                 error: err.message ? err.message : err,
//     //                 message: '',
//     //                 status: 400
//     //             }
//     //         }
//     //     }

//     //     /**
//     //      * Get user info
//     //      */
//     //     @Security('Bearer')
//     //     @Get("/me")
//     //     public async me(): Promise<IResponse> {
//     //         try {
//     //             //   check for a valid id
//     //             const getResponse = await getById(adminModel, this.userId);
//     //             return {
//     //                 data: getResponse || {},
//     //                 error: '',
//     //                 message: 'Admin info fetched Successfully',
//     //                 status: 200
//     //             }
//     //         }
//     //         catch (err: any) {
//     //             logger.error(`${this.req.ip} ${err.message}`)
//     //             return {
//     //                 data: null,
//     //                 error: err.message ? err.message : err,
//     //                 message: '',
//     //                 status: 400
//     //             }
//     //         }
//     //     }

//     //     /**
//     //     * Update admin
//     //     */
//     //     @Security('Bearer')
//     //     @Post("/update")
//     //     public async update(@Body() request: { email: string, firstName: string, lastName: string }): Promise<IResponse> {
//     //         try {
//     //             const { firstName, lastName, email } = request;

//     //             // check if user exists
//     //             const exists = await findOne(adminModel, { _id: this.userId });

//     //             if (!exists) {
//     //                 throw new Error('Invalid Admin')
//     //             }

//     //             if (email) {
//     //                 const emailExists = await findOne(adminModel, { _id: { $ne: this.userId }, email: email });
//     //                 if (emailExists) {
//     //                     throw new Error(`Email ${email} is already registered with us`)
//     //                 }
//     //             }

//     //             var payload: { [k: string]: any } = {};
//     //             if (firstName)
//     //                 payload.firstName = firstName;

//     //             if (lastName)
//     //                 payload.lastName = lastName;

//     //             if (email)
//     //                 payload.email = email;

//     //             const saveResponse = await upsert(adminModel, payload, this.userId)
//     //             // create a temp token
//     //             return {
//     //                 data: saveResponse,
//     //                 error: '',
//     //                 message: 'Admin successfully updated!',
//     //                 status: 200
//     //             }
//     //         }
//     //         catch (err: any) {
//     //             logger.error(`${this.req.ip} ${err.message}`)
//     //             return {
//     //                 data: null,
//     //                 error: err.message ? err.message : err,
//     //                 message: '',
//     //                 status: 400
//     //             }
//     //         }
//     //     }



//     /**
// * Delete Browse Images
// */
//     @Security('Bearer')
//     @Delete('/browseImage/{imageId}')
//     public async deleteImage(@Path() imageId: string): Promise<IResponse> {
//         try {
//             const exists = await getById(browseImageModel, imageId);
//             if (!exists) {
//                 throw new Error(`Image With ${imageId} doesn't exist`)
//             }
//             console.log('test', exists.path)
//             // const filePath = path.join(__dirname, '../', '../', 'public/', `${exists.path}`);

//             let pathh = `${process.cwd()}/public/${exists.path}`

//             console.log(pathh, "pathh--")
//             fsSystem.rmSync(pathh, { recursive: true })
//             await deleteById(browseImageModel, exists._id);

//             return {
//                 data: {},
//                 error: '',
//                 message: 'Image Deleted successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }

//     /**
// * Deleting Browse Layer
// */
//     @Security('Bearer')
//     @Delete("/browseLayer/{layerId}")
//     public async deleteLayer(@Path() layerId: string): Promise<IResponse> {
//         try {
//             // check if template exists
//             const exists = await getById(browseLayerModel, layerId);
//             if (!exists) {
//                 throw new Error(`Template With ${layerId} doesn't exists`)
//             }
//             // const destination = path.join(__dirname, '../', '../', );

//             // await removeDirectory(`public/${exists.path}`);

//             await deleteMany(browseLayerModel, { layerName: exists.layerName, _id: exists._id });
//             return {
//                 data: {},
//                 error: '',
//                 message: 'Layer Deleted successfully',
//                 status: 200
//             }
//         }
//         catch (err: any) {
//             logger.error(`${this.req.ip} ${err.message}`)
//             return {
//                 data: null,
//                 error: err.message ? err.message : err,
//                 message: '',
//                 status: 400
//             }
//         }
//     }


//     //  /**
//     // * update Browse Layer
//     // */

//     //  @Security('Bearer')
//     //  @Post("/update-layer")
//     //  public async updateLayer(@Body() request: { name: string, layerId: string }): Promise<IResponse> {
//     //      try {
//     //          const { name, layerId } = request;
//     //          // check if template exists
//     //          const exists = await getById(browseLayerModel, layerId);
//     //          if (!exists) {
//     //              throw new Error(`Template With ${layerId} doesn't exists`)
//     //          }
//     //         const destination = path.join(__dirname, '../', '../', `public/${exists.path}`);

//     //          await removeDirectory( path.join(__dirname, '../', '../', `public/${exists.path}`)
//     //          let oldLayers = exists.layers
//     //          let foundIndex = oldLayers.findIndex((x: string) => x == oldName);
//     //          oldLayers[foundIndex] = name;
//     //          let destination = `${exists.path}/layers/${name}`;
//     //          await makeDirectory(destination);
//     //          const saveResponse = await upsert(nftTemplateModel, { layers: oldLayers }, exists._id);

//     //          return {
//     //              data: { ...saveResponse.toObject() },
//     //              error: '',
//     //              message: 'Layer updated successfully',
//     //              status: 200
//     //          }
//     //      }
//     //      catch (err: any) {
//     //          logger.error(`${this.req.ip} ${err.message}`)
//     //          return {
//     //              data: null,
//     //              error: err.message ? err.message : err,
//     //              message: '',
//     //              status: 400
//     //          }
//     //      }
//     //  }



// }
