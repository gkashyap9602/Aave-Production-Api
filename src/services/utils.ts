import fs from 'fs'
import moment from 'moment';
import { Parser } from 'json2csv'
import path from 'path';
const compress_images = require('compress-images');

export const readHTMLFile = async function (path: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const read = await fs.promises.readFile(path, { encoding: 'utf-8' })
            resolve(read)
        }
        catch (err) {
            reject(err)
        }

    })
};

export const generateRandomOtp = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

export const getFilterMonthDateYear = (date: string) => {
    return moment(date).add(1, 'day').format('YYYY-MM-DD')
}


export const getCSVFromJSON = (fields: any, json: any) => {
    const parser = new Parser({ fields });
    return parser.parse(json);
}

export const getFileUrl = (fileName: string) => {
    return process.env.ENVIRONMENT === 'production' ? `${process.env.SERVER_HOST}/uploads/common/${fileName}` : `http://localhost:${process.env.PORT}/uploads/common/${fileName}`
}

export const getAssetUrl = () => {
    return process.env.ENVIRONMENT === 'production' ? `${process.env.SERVER_HOST}/uploads/` : `http://localhost:${process.env.PORT}/uploads/`
}

export const removeFile = async (fileName: string) => {
    return await fs.promises.unlink(path.join(__dirname, '../', '../', 'public', 'uploads', 'common', fileName))
}

export const unlinkImages = async (collectionId: any, fileName: any) => {
    const filePath = path.join(__dirname, '../', '../', 'public/', `uploads/${collectionId}/`, fileName);
    return fs.unlinkSync(filePath)
}

export const moveFilePath2 = async (collectionId: any, file: any, isSize: boolean, width?: any, height?: any, quality?: any) => {
    const currentPath = path.join(__dirname, '../', '../', 'public/', 'uploads/common', file[0].filename);
    const destinationPath = path.join(__dirname, '../', '../', 'public/', `uploads/${collectionId}/`);
    compress_images(currentPath, destinationPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "40"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error: string, completed: string, statistic: string) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        });
    // fs.unlinkSync(currentPath)
}
export const makeDirectory = async (destination: string) => {
    return await fs.promises.mkdir(path.join(__dirname, '../', '../', destination), { recursive: true })
}

export const removeDirectory = async (destination: string) => {
    return await fs.promises.rmdir(path.join(__dirname, '../', '../', destination), { recursive: true })
}

export const copyFile = async (src: string, destination: string) => {
    return await fs.promises.copyFile(src, path.join(__dirname, '../', '../', destination));
}

export const moveAndCompressFile = async (currentPath: string, destinationPath: string, isSize: boolean, width?: any, height?: any, quality?: any) => {
    currentPath = path.join(__dirname, '../', '../', currentPath);
    destinationPath = path.join(__dirname, '../', '../', destinationPath);
    compress_images(currentPath, destinationPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "40"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error: string, completed: string, statistic: string) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        });
    // fs.unlinkSync(currentPath)
}

