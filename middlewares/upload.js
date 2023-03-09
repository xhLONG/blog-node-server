const multer = require('multer')
const fse = require('fs-extra')

const uploadDir = 'public/uploads/'
fse.ensureDirSync(uploadDir)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({
  storage,
  fileFilter (req, file, callback) {
    // 解决中文名乱码的问题
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8'
    )
    callback(null, true)
  }
})

module.exports = upload
