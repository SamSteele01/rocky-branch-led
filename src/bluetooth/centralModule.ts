const noble = require('@abandonware/noble');





noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync(['180f'], false);
  }
});
