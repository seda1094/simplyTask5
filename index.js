const {Readable, Writable, Transform}  = require("stream")
const moment = require("moment")
const fs = require('fs')

//MyWritable class extends from Writable with overrided method _write
//TODO
//I can't use this method
//I can't input file name
// and use with fs

// class MyWritable extends Writable{
//     _write(data, encode, callback){
//         console.log("_write",data);
//         callback()
//     }
// }

//MyReadable class extends from Readable with overrided method_read
//in this method pushing data with this now's date and transforming to string for writing to buffer
class MyReadable extends Readable{
    _read(){
        setTimeout(()=> this.push(moment().toString()),1000)
    }
}

//ToFormat class extends from Transform with overrided method _transform
//this method transfor data to string with utf-8 encoding and make uppercase
//it must use for incoming data
//and get transformed version of data
class ToFormat extends Transform{
    _transform(chunk, encoding, callback){
        this.push(chunk.toString('utf8').toUpperCase()+ "\n")
        callback()
    }
}

const myReadable = new MyReadable()
const toFormat = new ToFormat()
const writeStream = fs.createWriteStream('dates.txt')

myReadable.pipe(toFormat).pipe(writeStream)

