const fs = require("fs")
const zlib = require("zlib")
const glob = require("glob")

const iterate = (files, cb) => {
  if (files.length) {
    compress(files.shift(), () => iterate(files, cb))
  } else {
    cb()
  }
}

const compress = (filename, cb) => {
  const gzip = zlib.createGzip()
  const input = fs.createReadStream(filename)
  const output = fs.createWriteStream(filename + ".gz")

  input.pipe(gzip).pipe(output)
  cb()
}

glob("./assets/mobile/*.{html,js,css}", {}, (error, files) => {
  iterate(files, () => {
    console.log("Mobile files compressed")
  })
})
