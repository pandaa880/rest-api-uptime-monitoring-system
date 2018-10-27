const fs = require('fs');
const path = require('path');

// container for library object
const lib = {};

// set the base directory to write the data
lib.baseDir = path.join(__dirname, '/../.data/');

// create a file and write the data
lib.create = (dir, file, data, callback) => {

  // open the file in given directory to write
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {

    if (!err && fileDescriptor) {

      // convert the data to string
      const stringData = JSON.stringify(data);

      // write the converted data to file
      fs.writeFile(fileDescriptor, stringData, (err) => {

        if (!err) {

          // close the file
          fs.close(fileDescriptor, (err) => {

            if (!err) {
              callback(false);

            } else {
              callback('Error closing the new file..');
            }
          });
        
        } else {
          // return that error
          callback('Error writing to new file..');
        }
      });

    } else {
      callback('Couldn\'t create a new file, It may already exist.');
    }
  });
}

// Read data from file
lib.read = (dir, file, callback) => {

  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', (err, data) => {
    callback(err, data);
  });
}

// Update the file
lib.update = (dir, file, data, callback) => {

  // open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {

    if (!err && fileDescriptor) {

      // convert the data to string
      const stringData = JSON.stringify(data);

      // truncate the file
      fs.truncate(fileDescriptor, (err) => {

        if (!err) {

          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing the file');
                } 
              });
            } else {
              callback('Error writing the existing file.');
            }
          });

        } else {
          callback('Error truncating the file.');
        }
      });

    } else {
      callback('Couldn\'t open file for updating, It may not exist yet');
    }
  });
}

// delete files
lib.delete = (dir, file, callback) => {

  // unlink the file from file system
  fs.unlink(`${lib.baseDir}/${dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting the file.');
    }
  });
}

module.exports = lib;