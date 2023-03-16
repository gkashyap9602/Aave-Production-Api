const multer = require("multer");
const path = require('path')
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../', '../', 'public', 'uploads', 'common'),
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
    if (!mime.includes('image')) {
        return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
}

export default multer({
    storage: storage,
    limits: { fileSize: 5 * 1048576 }, // 5 mb
    fileFilter
});
