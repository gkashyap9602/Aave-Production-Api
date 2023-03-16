// @ts-ignore
import {
  Route,
  Controller,
  Tags,
  Post,
  Body,
  Security,
  Query,
  UploadedFile,
  Get,
  Put,
} from "tsoa";
import path from "path";
import { Request, Response } from "express";
import { network } from "hardhat";
import { ethers } from "ethers";

import { convertNum } from "../helpers/common.helper";
import { IResponse } from "../utils/interfaces.util";
import { blockchainAbis } from "../helpers/common.helper";
import logger from "../configs/logger.config";


@Tags("Client")
@Route("/client")
export default class ClientController extends Controller {
  req: Request;
  res: Response;
  userId: string;
  constructor(req: Request, res: Response) {
    super();
    this.req = req;
    this.res = res;
    this.userId = req.body.user ? req.body.user.id : "";
  }

  @Security("Bearer")
  @Get("/getPools")
  public async getPools(@Query() providerAddress: any): Promise<IResponse> {
    try {

      let providerAddressParsed = JSON.parse(providerAddress);
      let finalArray:any = [];

      let test :any= []
      let obj:any = {}

      for (let blockchainNodes of providerAddressParsed) {
        // console.log(blockchainAbis[blockchainNodes.toString()],"if condition")
        if (blockchainAbis[blockchainNodes.toString()]) {

          const provider = new ethers.providers.JsonRpcProvider(
            blockchainAbis[blockchainNodes.toString()].rpc
          );
             
        // console.log(blockchainAbis[blockchainNodes.toString()].rpc,"rpc find")
        //   console.log(provider, "providerrrr");

          const contractInstancePoolUI = new ethers.Contract(
            blockchainAbis[blockchainNodes.toString()].uiPoolDataProvider,
            blockchainAbis[blockchainNodes.toString()].abi,
            provider
          );

        //   console.log(blockchainAbis[blockchainNodes.toString()],"check uipool")
        //   console.log(blockchainAbis[blockchainNodes.toString()].uiPoolDataProvider,"check uipool")

        //   console.log(contractInstancePoolUI, "contractInstancePoolUI");

          const reservesData = await contractInstancePoolUI.getReservesData(
            blockchainNodes.toString()
          );
           
         
        //   console.log(blockchainNodes.toString(),"blockchainNodes.toString()")
        //   console.log(reservesData, "reservesData");

          let dataArray: any = [];
          const RAY = 10 ** 27; // 10 to the power 27
          const SECONDS_PER_YEAR = 31536000;

        //   let obj:any = {}
      
          for (let data of reservesData[0]) {

            //    let daiData = reservesData[0].filter((val:any,i:any)=> val.name==data.name)
              
            if(obj[data.name]){
                obj[data.name] = [...obj[data.name],{
               name: data.name,
               asset_id:blockchainAbis[blockchainNodes.toString()].asset_id,
              underlyingAsset: data.underlyingAsset,
              availableLiquidity: convertNum(Number(data.availableLiquidity)),
              supplyCap: convertNum(Number(data.supplyCap)),
              baseLTVasCollateral: Number(data.baseLTVasCollateral) / 100,
              reserveLiquidationThreshold:
                Number(data.eModeLiquidationThreshold) / 100,
              eModeLtv: Number(data.eModeLtv) / 100,
              eModeLiquidationThreshold: data.eModeLiquidationThreshold,
              priceInMarketReferenceCurrency: (
                Number(data.priceInMarketReferenceCurrency) / 100000000
              ).toFixed(2),
              optimalUsageRatio:
                Number(data.optimalUsageRatio) / 10000000000000000000000000,
              // aTokenAddress,
              // liquidityIndex,
              // variableBorrowIndex,
              depositAPR: ((Number(data.liquidityRate) / RAY) * 100).toFixed(2),
              variableBorrowAPR: (
                (Number(data.variableBorrowRate) / RAY) *
                100
              ).toFixed(2),
              // stableBorrowRate,
              // stableDebtTokenAddress,
              // variableDebtTokenAddress
                }]

            }else{
                obj[data.name] = [{
                    name: data.name,
                asset_id:blockchainAbis[blockchainNodes.toString()].asset_id,
              underlyingAsset: data.underlyingAsset,
              availableLiquidity: convertNum(Number(data.availableLiquidity)),
              supplyCap: convertNum(Number(data.supplyCap)),
              baseLTVasCollateral: Number(data.baseLTVasCollateral) / 100,
              reserveLiquidationThreshold:
                Number(data.eModeLiquidationThreshold) / 100,
              eModeLtv: Number(data.eModeLtv) / 100,
              eModeLiquidationThreshold: data.eModeLiquidationThreshold,
              priceInMarketReferenceCurrency: (
                Number(data.priceInMarketReferenceCurrency) / 100000000
              ).toFixed(2),
              optimalUsageRatio:
                Number(data.optimalUsageRatio) / 10000000000000000000000000,
              // aTokenAddress,
              // liquidityIndex,
              // variableBorrowIndex,
              depositAPR: ((Number(data.liquidityRate) / RAY) * 100).toFixed(2),
              variableBorrowAPR: (
                (Number(data.variableBorrowRate) / RAY) *
                100
              ).toFixed(2),
              // stableBorrowRate,
              // stableDebtTokenAddress,
              // variableDebtTokenAddress
                }]

            }

            // test.push({
            //  tokenName:data.name   
            // })

            dataArray.push({
              name: data.name,
              underlyingAsset: data.underlyingAsset,
              availableLiquidity: convertNum(Number(data.availableLiquidity)),
              supplyCap: convertNum(Number(data.supplyCap)),
              baseLTVasCollateral: Number(data.baseLTVasCollateral) / 100,
              reserveLiquidationThreshold:
                Number(data.eModeLiquidationThreshold) / 100,
              eModeLtv: Number(data.eModeLtv) / 100,
              eModeLiquidationThreshold: data.eModeLiquidationThreshold,
              priceInMarketReferenceCurrency: (
                Number(data.priceInMarketReferenceCurrency) / 100000000
              ).toFixed(2),
              optimalUsageRatio:
                Number(data.optimalUsageRatio) / 10000000000000000000000000,
              // aTokenAddress,
              // liquidityIndex,
              // variableBorrowIndex,
              depositAPR: ((Number(data.liquidityRate) / RAY) * 100).toFixed(2),
              variableBorrowAPR: (
                (Number(data.variableBorrowRate) / RAY) *
                100
              ).toFixed(2),
              // stableBorrowRate,
              // stableDebtTokenAddress,
              // variableDebtTokenAddress
            });
          }

          finalArray.push(dataArray);
        } else {
          throw new Error("Provider Address not exist ");
        }
      }
     for (const key in obj) {
        let v3 :any= {};
        for (const element of obj[key]) {
            if(v3[element.asset_id]){
                v3[element.asset_id] = [...v3[element.asset_id],element]
            }else{
                v3[element.asset_id] = [element]
            }
        }
        obj[key] = {
            aave_v3:v3
        }
     }
    //   console.log(finalArray, "finalArray");
      console.log(obj,"obj==")

      return {
        data: obj,
        error: "",
        message: "Fetched Successfully",
        status: 200,
      };
    } catch (err: any) {
      logger.error(`${this.req.ip} ${err.message}`);
      return {
        data: null,
        error: err.message ? err.message : err,
        message: "",
        status: 400,
      };
    }
  }

  //ends

  // @Post("/register")
  // public async register(@Body() request: { email: string, password: string, phoneNumber?: number, domain: string }): Promise<IResponse> {
  //     try {
  //         const { email, password, phoneNumber, domain } = request;
  //         // check if client exists
  //         let exists = await findOne(clientModel, { email });
  //         if (exists) {
  //             throw new Error(`Email ${email} is already exists`)
  //         }

  //         let hashed = await genHash(password);
  //         let saveResponse = await upsert(clientModel, { email, password: hashed, phoneNumber });
  //         delete saveResponse.password
  //         // console.log("saveResponse", saveResponse)
  //         const token = await signToken(saveResponse._id, { access: 'client' }, '1hr')
  //         const html = await readHTMLFile(path.join(__dirname, '../', '../src/template', 'link_verrify_email.html'))
  //         // console.log("html", path.join(__dirname, '../', '../src/template', 'link_verrify_email.html'))
  //         const template = handlebar.compile(html)
  //         const link = `${domain}/verify?token=${token}`
  //         const tempData = template({ link, email })
  //         await sendEmail(process.env.EMAIL_NOTIFICATION_ADDRESS, 'Link for Verification', email, tempData)
  //         return {
  //             data: saveResponse,
  //             error: '',
  //             message: 'User Registered Successfully!',
  //             status: 200
  //         }
  //     }
  //     catch (err: any) {
  //         logger.error(`${this.req.ip} ${err.message}`)
  //         return {
  //             data: null,
  //             error: err.message ? err.message : err,
  //             message: '',
  //             status: 400
  //         }
  //     }
  // }

  // /**
  //     * Resend Link
  //     */
  // @Put("/resendLink")
  // public async resendLink(@Body() request: { email: string, domain: string}): Promise<IResponse> {
  //     try {
  //         const { email, domain } = request;
  //         let exists = await findOne(clientModel, { email:email });
  //         console.log(exists,"exists")
  //         if (!exists) {
  //             throw new Error(`Email not found!`)
  //         }
  //         const token = await signToken(exists._id, { access: 'client' }, '1hr')
  //         const html = await readHTMLFile(path.join(__dirname, '../', '../src/template', 'link_verrify_email.html'))
  //         // console.log("html", path.join(__dirname, '../', '../src/template', 'link_verrify_email.html'))
  //         const template = handlebar.compile(html)
  //         const link = `${domain}/verify?token=${token}`
  //         const tempData = template({ link, userName: exists.userName })
  //         await sendEmail(process.env.EMAIL_NOTIFICATION_ADDRESS, 'Link for Verification', exists.email, tempData)
  //         return {
  //             data: null,
  //             error: '',
  //             message: 'Verification email sent successfully',
  //             status: 200
  //         }
  //     }
  //     catch (err: any) {
  //         logger.error(`${this.req.ip} ${err.message}`)
  //         return {
  //             data: null,
  //             error: err.message ? err.message : err,
  //             message: '',
  //             status: 400
  //         }
  //     }
  // }
  // @Post("/login")
  // public async login(@Body() request: { email: string, password: string }): Promise<IResponse> {
  //     try {
  //         const { email, password } = request;
  //         const exists = await findOne(clientModel, { email });
  //         if (!exists) {
  //             throw new Error('Client doesn\'t exists!');
  //         }
  //         // check is verified or is active
  //         if (!exists.isVerified || !exists.isActive) {
  //             throw new Error('Client is not approved yet!');
  //         }

  //         const isValid = await verifyHash(password, exists.password);
  //         if (!isValid) {
  //             throw new Error('Password seems to be incorrect');
  //         }
  //         const token:any = await signToken(exists._id, { access: 'client' });
  //         delete exists.password
  //         return {
  //             data: { ...exists, token },
  //             error: '',
  //             message: 'Login Success',
  //             status: 200
  //         }
  //     }
  //     catch (err: any) {
  //         logger.error(`${this.req.ip} ${err.message}`)
  //         return {
  //             data: null,
  //             error: err.message ? err.message : err,
  //             message: '',
  //             status: 400
  //         }
  //     }
  // }

  // @Security('Bearer')
  // @Get("/profile")
  // public async profile(): Promise<IResponse> {
  //     try {
  //         //   check for a valid id
  //         const getResponse = await getById(clientModel, this.userId);
  //         if (!getResponse) {
  //             throw new Error('Client doesn`t exists!');
  //         }
  //         delete getResponse.password;
  //         return {
  //             data: getResponse || {},
  //             error: '',
  //             message: 'Client info fetched Successfully',
  //             status: 200
  //         }
  //     }
  //     catch (err: any) {
  //         logger.error(`${this.req.ip} ${err.message}`)
  //         return {
  //             data: null,
  //             error: err.message ? err.message : err,
  //             message: '',
  //             status: 400
  //         }
  //     }
  // }

  //     @Security('Bearer')
  //     @Get("/profile/details")
  //     public async getUserProfileById(@Query() userId: string,): Promise<IResponse> {
  //         try {
  //             //   check for a valid id
  //             const getResponse = await getById(clientModel,userId);
  //             if (!getResponse) {
  //                 throw new Error('Client doesn`t exists!');
  //             }
  //             delete getResponse.password;
  //             return {
  //                 data: getResponse || {},
  //                 error: '',
  //                 message: 'Client info fetched Successfully',
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
  //     @Security('Bearer')
  //     @Post("/changePassword")
  //     public async changePassword(@Body() request: { oldPassword: string, newPassword: string }): Promise<IResponse> {
  //         try {
  //             const { oldPassword, newPassword } = request;
  //             const exists = await getById(clientModel, this.userId)
  //             if (!exists) {
  //                 throw new Error('Invalid Client')
  //             }
  //             const isValid = await verifyHash(oldPassword, exists.password);
  //             if (!isValid) {
  //                 throw new Error('Password is incorrect')
  //             }
  //             const hashed = await genHash(newPassword);
  //             await upsert(clientModel, { password: hashed }, this.userId)

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
  //     /**
  //     * verify Link
  //     */
  //     @Security('Bearer')
  //     @Put("/verifyLink")
  //     public async verifyLink(@Body() request: { id?: string }): Promise<IResponse> {
  //         try {
  //             const { id } = request;
  //             const exists = await findOne(clientModel, { _id: id });
  //             if (!exists) {
  //                 throw new Error('user not found, please check your email again')
  //             };
  //             // check if already sent
  //             if (exists.isVerrified === true) {
  //                 throw new Error('Account already verrified!')
  //             };
  //             await upsert(clientModel, { isVerified: true }, id);
  //             const html = await readHTMLFile(path.join(__dirname, '../', '../src/template', 'welcome.html'))
  //             const template = handlebar.compile(html)
  //             const tempData = template({ ...exists })
  //             await sendEmail(process.env.EMAIL_NOTIFICATION_ADDRESS, 'Welcome', exists.email, tempData)
  //             return {
  //                 data: null,
  //                 error: '',
  //                 message: 'Client verified successfully',
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

  //     @Security('Bearer')
  //     @Put("/updatePic")
  //     public async updatePic(@UploadedFile('image') file: Express.Multer.File): Promise<IResponse> {
  //         try {
  //             let url = `/uploads/common/${file.filename}`;
  //             await upsert(clientModel, { profilePic: url }, this.userId);
  //             return {
  //                 data: { url },
  //                 error: '',
  //                 message: 'Profile Updated Successfully!',
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
  // * Update client
  // */
  //     @Security('Bearer')
  //     @Post("/updateProfile")
  //     public async updateProfile(@Body() request: {  phoneNumber: number }): Promise<IResponse> {
  //         try {

  //             const { phoneNumber } = request;
  //          let exist = await findOne(clientModel,{phoneNumber})
  //          if(exist ){
  //             throw new Error("This Number Is Already Exist")
  //          }
  //             var payload: { [k: string]: any } = {};

  //             if (phoneNumber)
  //                 payload.phoneNumber = phoneNumber;

  //             const saveResponse = await upsert(clientModel, payload, this.userId)

  //             return {
  //                 data: saveResponse,
  //                 error: '',
  //                 message: 'Client successfully updated!',
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
  //      * Forgot password api endpoint
  //      */
  //     @Post("/forgotPassword")
  //     public async forgotPassword(@Body() request: { email: string }): Promise<IResponse> {
  //         try {
  //             const { email } = request;
  //             // check if user exists
  //             let exists = await findOne(clientModel, { email });
  //             if (!exists) {
  //                 throw new Error('Invalid User')
  //             }
  //             // console.log("11111111", exists)
  //             let password = Math.random().toString(36).slice(-8);
  //             // console.log("2222222", password)
  //             const hashed = await genHash(password);
  //             // console.log("3333333", hashed)
  //             await upsert(clientModel, { password: hashed }, exists._id)
  //             //   send an email
  //             const html = await readHTMLFile(path.join(__dirname, '../', '../src/template', 'reset-passworddddd.html'))
  //             const template = handlebar.compile(html)
  //             // @ts-ignore
  //             let data = { password, userName: exists.userName }
  //             console.log(data, data)
  //             const tempData = template(data)

  //             await sendEmail(process.env.EMAIL_NOTIFICATION_ADDRESS, 'Reset Your Password', email, tempData)
  //             return {
  //                 data: {},
  //                 error: '',
  //                 message: 'New Password successfully sent to your ' +" "+ email,
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

  //         /**
  // * User Active Inactive
  // */
  // @Security('Bearer')
  // @Post('/activeInactive')
  // public async activeInactive(@Body() request: { id: string, isActive: string }): Promise<IResponse> {
  //     try {
  //         const { isActive, id } = request;
  //         let exists = await findOne(clientModel, { _id: mongoose.Types.ObjectId(id) });
  //         if (!exists) {
  //             throw new Error(`Data not found!!`)
  //         }
  //         var payload: { [k: string]: any } = {};

  //         if (isActive) {
  //             payload.isActive = isActive;
  //         }
  //         let saveResponse = await upsert(clientModel, payload, exists._id)

  //         return {
  //             data: saveResponse,
  //             error: '',
  //             message: 'Update Successfully',
  //             status: 200
  //         }
  //     }
  //     catch (err: any) {
  //         logger.error(`${this.req.ip} ${err.message}`)
  //         return {
  //             data: null,
  //             error: err.message ? err.message : err,
  //             message: '',
  //             status: 400
  //         }
  //     }
  // }

  //     /**
  //     * Getlist client
  //     */
  //     @Security('Bearer')
  //     @Get("/getlist")
  //     public async getlist(@Query() pageNumber: string, @Query() pageSize: string, @Query() startDate = null, @Query() endDate = null, @Query() searchByName = null, @Query() exportRequest = 'false'): Promise<IResponse> {
  //         try {
  //             const query: any = [{}];
  //             if (searchByName) {
  //                 query.push({
  //                     "$or": [
  //                         { "firstName": { $regex: searchByName, $options: 'i' } },
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

  //             if (exportRequest === 'true') {
  //                 console.log(exportRequest,"?>")
  //                 // create csv and send to client
  //                 const csv = getCSVFromJSON(['Sno', 'isVerified', 'Email','Phone Number', 'Profile', 'Created At'],
  //                     getAllresponse.items.map((val, index) => {
  //                         return { ...val, Sno: index + 1, "isVerified": val.isVerified || '-', "Email": val.email || '-', "Phone Number": val.phoneNumber || '-', "Profile": val.isActive || '-', "Created At": val.createdAt || '-' }
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

  //     // @Security('Bearer')
  //     @Get('/collection/getalldomains')
  //     public async getAllDomains(): Promise<IResponse> {
  //         try {
  //             // const query: any = { userId: this.userId,_id:collectionId };
  //             const getAllresponse = await getAllWithoutPaging(collectionModel,{},{websiteDomain:1})
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
}
