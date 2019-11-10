import CBC from './CBC';

// eslint-disable-next-line func-names
(function () {
  // An example 128-bit key
  const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  // The initialization vector (must be 16 bytes)
  const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  const text = 'TextMustBe16Byte';

  const cbc = new CBC(key, iv);
  const encryptedBytes = cbc.encrypt(text);

  const dcbc = new CBC(key, iv);
  const decryptedText = dcbc.decrypt(encryptedBytes);

  console.log(decryptedText);
}());
