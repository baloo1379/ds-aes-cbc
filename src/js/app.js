/* eslint-disable no-bitwise */
/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import fs from 'fs';
import aesjs from 'aes-js';
import CBC from './CBC';

function calculateLRC(bytes, length) {
  let lrc = 0;
  for (let i = 0; i < bytes.length; i += 1) {
    lrc ^= bytes[i];
  }
  return lrc;
}

function cbcTest() {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  const text = 'TextMustBe16Byte';

  const ecbc = new CBC(key, iv);
  const encryptedBytes = ecbc.encrypt(text);

  const dcbc = new CBC(key, iv);
  const decryptedText = dcbc.decrypt(encryptedBytes);

  console.log(decryptedText);
}

function ctr(textBytes) {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


  let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptionStart = Date.now();
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptionElapsed = Date.now() - encryptionStart;

  aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const decryptionStart = Date.now();
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptionElapsed = Date.now() - decryptionStart;

  let same = false;
  if (textBytes.length === decryptedBytes.length) {
    same = calculateLRC(textBytes) === (calculateLRC(decryptedBytes));
  }

  return [encryptionElapsed, decryptionElapsed];
}

function cbc(textBytes) {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptionStart = Date.now();
  const encryptedBytes = aesCbc.encrypt(textBytes);
  const encryptionElapsed = Date.now() - encryptionStart;

  aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const decryptionStart = Date.now();
  const decryptedBytes = aesCbc.decrypt(encryptedBytes);
  const decryptionElapsed = Date.now() - decryptionStart;

  let same = false;
  if (textBytes.length === decryptedBytes.length) {
    same = calculateLRC(textBytes) === (calculateLRC(decryptedBytes));
  }

  return [encryptionElapsed, decryptionElapsed];
}

function cfb(textBytes) {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  const segmentSize = 8;

  let aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);
  const encryptionStart = Date.now();
  const encryptedBytes = aesCfb.encrypt(textBytes);
  const encryptionElapsed = Date.now() - encryptionStart;

  aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 8);
  const decryptionStart = Date.now();
  const decryptedBytes = aesCfb.decrypt(encryptedBytes);
  const decryptionElapsed = Date.now() - decryptionStart;

  let same = false;
  if (textBytes.length === decryptedBytes.length) {
    same = calculateLRC(textBytes) === (calculateLRC(decryptedBytes));
  }

  return [encryptionElapsed, decryptionElapsed];
}

function ofb(textBytes) {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  let aesCfb = new aesjs.ModeOfOperation.ofb(key, iv);
  const encryptionStart = Date.now();
  const encryptedBytes = aesCfb.encrypt(textBytes);
  const encryptionElapsed = Date.now() - encryptionStart;

  aesCfb = new aesjs.ModeOfOperation.ofb(key, iv);
  const decryptionStart = Date.now();
  const decryptedBytes = aesCfb.decrypt(encryptedBytes);
  const decryptionElapsed = Date.now() - decryptionStart;

  let same = false;
  if (textBytes.length === decryptedBytes.length) {
    same = calculateLRC(textBytes) === (calculateLRC(decryptedBytes));
  }

  return [encryptionElapsed, decryptionElapsed];
}

function ecb(textBytes) {
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  let aesCfb = new aesjs.ModeOfOperation.ecb(key);
  const encryptionStart = Date.now();
  const encryptedBytes = aesCfb.encrypt(textBytes);
  const encryptionElapsed = Date.now() - encryptionStart;


  aesCfb = new aesjs.ModeOfOperation.ecb(key);
  const decryptionStart = Date.now();
  const decryptedBytes = aesCfb.decrypt(encryptedBytes);
  const decryptionElapsed = Date.now() - decryptionStart;

  let same = false;
  if (textBytes.length === decryptedBytes.length) {
    same = calculateLRC(textBytes) === (calculateLRC(decryptedBytes));
  }

  return [encryptionElapsed, decryptionElapsed];
}

function getFile(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data, fileName);
      }
    });
  });
}

function averageCalculation(callback, data) {
  let suma = 0;
  let sumb = 0;
  for (let i = 0; i < 5; i += 1) {
    const res = callback(data);
    suma += res[0];
    sumb += res[1];
  }
  suma /= 5;
  sumb /= 5;
  return [suma, sumb];
}

function combineCalculation(data) {
  const store = [];
  store.push(averageCalculation(ctr, data));
  store.push(averageCalculation(cbc, data));
  store.push(averageCalculation(cfb, data));
  store.push(averageCalculation(ofb, data));
  store.push(averageCalculation(ecb, data));
  return store;
}

function main1() {
  getFile('dist/assets/10MB.txt')
    .then((data) => combineCalculation(data))
    .then((store) => {
      fs.writeFile('results10.json', JSON.stringify(store, null, 2), 'utf-8', (err) => {
        if (err) throw new Error(err);
        console.log('File saved');
      });
    });
  getFile('dist/assets/2MB.txt')
    .then((data) => combineCalculation(data))
    .then((store) => {
      fs.writeFile('results2.json', JSON.stringify(store, null, 2), 'utf-8', (err) => {
        if (err) throw new Error(err);
        console.log('File saved');
      });
    });
  getFile('dist/assets/512kB.txt')
    .then((data) => combineCalculation(data))
    .then((store) => {
      fs.writeFile('results512.json', JSON.stringify(store, null, 2), 'utf-8', (err) => {
        if (err) throw new Error(err);
        console.log('File saved');
      });
    });
  getFile('dist/assets/128kB.txt')
    .then((data) => combineCalculation(data))
    .then((store) => {
      fs.writeFile('results128.json', JSON.stringify(store, null, 2), 'utf-8', (err) => {
        if (err) throw new Error(err);
        console.log('File saved');
      });
    });
}

function main() {
  const text = 'Lorem ip' + 'sum dolo' + 'r sit am' + 'et, cons';
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  const segmentSize = 8;

  const textBytes = aesjs.utils.utf8.toBytes(text);

  let aesCtr = new aesjs.ModeOfOperation.cfb(key, iv);
  const encryptedBytes = aesCtr.encrypt(textBytes);

  encryptedBytes[1] = 0;

  aesCtr = new aesjs.ModeOfOperation.cfb(key, iv);
  const encrypted = aesCtr.decrypt(encryptedBytes);

  console.log(text);
  console.log('encryptedBytes[1] = 0;');
  console.log(aesjs.utils.utf8.fromBytes(encrypted));

}

main();
