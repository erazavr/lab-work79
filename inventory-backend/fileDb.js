const fs = require('fs');
const nanoid = require('nanoid');

const readFile = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
};

const filename = './db.json';

let data = {
  categories: [],
  location: [],
  items: []
};

module.exports = {
  async init() {
    try {
      const fileContents = await readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      console.log('Could not read file ' + filename);
      data = {};
    }
  },
  async getItems(arrName) {
    return data[arrName];
  },
  async getItemById(arrName, id) {
    return data[arrName].find(item => item.id === id);
  },
  async deleteItemById(arrName, id, itemId) {
    for (let i = 0; i < data[arrName].length; i++) {
      if (data[arrName][i].id === data['items'][i][itemId]) {
        return  false
      }
      else {
        data[arrName].splice(i,1);
      }
    }
    await this.save();
  },
  async addItem(arrName, item) {
    if (!data[arrName]) {
      data[arrName] = []
    }
    item.id = nanoid();
    data[arrName].push(item);
    await this.save();
  },
  async save() {
    const fileContents = JSON.stringify(data, null, 2);
    await writeFile(filename, fileContents);
  }
};