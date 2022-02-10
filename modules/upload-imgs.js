const multer = require('multer');
// 套件
const {v4: uuidv4} = require('uuid');
// 套件的v4方法名為uuidv4
const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};
// 可接受檔案類型
const fileFilter = (req, file, cb)=>{
    cb(null, !!extMap[file.mimetype]);
};
// cb第一個參數(錯誤先行)沒有要設定給NULL，!!為轉換為布林值，故後方為篩選是否有符合的檔案類型
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname + '/../public/img');
    },
    // 存放路徑
    filename: (req, file, cb)=>{
        cb(null, uuidv4() + extMap[file.mimetype]);
    }
    // 檔名設定
});

module.exports = multer({fileFilter, storage});
// 匯出{}內順序前後都沒關係


