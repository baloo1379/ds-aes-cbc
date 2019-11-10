/* eslint-disable no-bitwise */
import aesjs from 'aes-js';

export default class CBC {
  constructor(key, iv) {
    this.key = key;
    this.iv = iv;
    this.n = this.iv.length;
  }

  encrypt(plainText) {
    if (plainText.length % 16 !== 0) throw new Error('Data must be a multiple of 16 bytes');
    const textBytes = aesjs.utils.utf8.toBytes(plainText);
    const textBytesLength = textBytes.length;
    const textBlocks = [];
    const blocks = textBytesLength / this.n;
    const encrypted = [];

    for (let i = 0; i < blocks; i += 1) {
      textBlocks.push(textBytes.subarray(i * this.n, i * this.n + this.n));
    }

    for (let i = 0; i < blocks; i += 1) {
      const xor = [];
      for (let j = 0; j < this.n; j += 1) {
        xor.push(this.iv[j] ^ textBlocks[i][j]);
      }
      // eslint-disable-next-line
      const aesEcb = new aesjs.ModeOfOperation.ecb(this.key);
      const encryptedBytes = aesEcb.encrypt(new Uint8Array(xor));
      this.iv = encryptedBytes;
      encrypted.push(Array.from(encryptedBytes));
    }

    return new Uint8Array(encrypted.flat());
  }

  decrypt(encryptedBytes) {
    if (encryptedBytes.length % 16 !== 0) throw new Error('Data must be a multiple of 16 bytes');
    const textBytes = encryptedBytes;
    const textBytesLength = textBytes.length;
    const textBlocks = [];
    const blocks = textBytesLength / this.n;
    const decrypted = [];

    for (let i = 0; i < blocks; i += 1) {
      textBlocks.push(textBytes.subarray(i * this.n, i * this.n + this.n));
    }

    for (let i = 0; i < blocks; i += 1) {
      // eslint-disable-next-line
      const aesEcb = new aesjs.ModeOfOperation.ecb(this.key);
      const decryptedBytes = aesEcb.decrypt(textBlocks[i]);
      const xor = [];
      for (let j = 0; j < this.n; j += 1) {
        xor.push(this.iv[j] ^ decryptedBytes[j]);
      }
      decrypted.push(Array.from(xor));
      this.iv = textBlocks[i];
    }
    return aesjs.utils.utf8.fromBytes(new Uint8Array(decrypted.flat()));
  }
}
