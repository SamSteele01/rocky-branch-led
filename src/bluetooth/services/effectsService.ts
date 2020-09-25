import bleno from '@abandonware/bleno';

const PrimaryService = bleno.PrimaryService;

export const effectsService = new PrimaryService({
  uuid: 'fffffffffffffffffffffffffffffff0', // or 'fff0' for 16-bit
  characteristics: [
    // see Characteristic for data type
  ],
});
