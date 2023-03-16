import fs from "fs/promises"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    // destination: path.join(__dirname, '../', '../', 'public/', 'uploads'),
    destination: async (req:any, file:any, cb:any) => {
        let {layerName,templateName} = req.body;
        console.log(layerName,templateName,"layerName,templateName")
        let path
        if(layerName){
            path = `uploads/admin/browseImages/${layerName}`;
        }else if(templateName){
            path = `uploads/admin/mintingTemplates/${templateName}`;
        }else{
            path = `uploads/admin/images`;

        }
        let destination = `${process.cwd()}/public/${path}`;
        await fs.mkdir(destination, { recursive: true });
        cb(null, destination);
    },
    filename(req: any, file: any, cb: any) {
        let num = Math.round(
            Math.pow(36, 10 + 1) - Math.random() * Math.pow(36, 10)
        )
            .toString(36)
            .slice(1);
        const fileName = num + file.originalname;
        cb(null, fileName);
    },
});
const fileFilter = function (req: any, file: Express.Multer.File, callback: any) {
    const mime = file.mimetype;

    if (!mime.includes('image') && !mime.includes('pdf')) {
        req.fileError = "Only image or pdf files are allowed"
        return callback(null,false);    }
    callback(null, true);
}

export default multer({
    storage: storage,
    // limits: { fileSize: 5 * 1048576 }, // 5 mb
    fileFilter
})