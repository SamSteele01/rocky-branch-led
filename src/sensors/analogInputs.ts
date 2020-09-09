/**
  Connect to the MCP3004 chip and get sensor outputs. 
  * microphone
  * distance sensor - F1 & F6
  * ambient light sensor - F1 & F6
  *
  * The ADC chip connects to SPI 1, thus busNumber: 1
*/

// import mcpadc from 'mcp-spi-adc'; // needs types file
const mcpadc = require('mcp-spi-adc');

/* use a microphone input to affect the brightness and/or color */
const microphone = mcpadc.openMcp3004(0, {busNumber: 1, speedHz: 48000}, (err: any, adcChannelObject: Object) => {
  return new Promise<any>((resolve, reject) => {
    if (err) reject(err);
    resolve(adcChannelObject);
  })
});

microphone.then(() => {
  setInterval(_ => {
    microphone.read((err: any, reading: Object) => {
      if (err) throw err;
      // console.log((reading.value * 3.3 - 0.5) * 100);
      console.log(reading);
      // use reading to affect brightness - emit event?
    });
  }, 1); // really would like to sample faster that 1 ms
})


/* ----- calculate the velocity of someone (running, or on a bike) moving towards the tunnel ----- */
/* open the connection to analog line one
 * this is only on fixtures one and six.
*/
const distanceSensor = mcpadc.openMcp3004(1, {busNumber: 1, speedHz: 20000}, (err: any, adcChannelObject: Object) => {
  return new Promise<any>((resolve, reject) => {
    if (err) reject(err);
    resolve(adcChannelObject);
  })
});

distanceSensor.then(() => {
  setInterval(_ => {
    distanceSensor.read((err: any, reading: Object) => {
      if (err) throw err;

      console.log(reading);
      // display visually for testing
      
      // save values from the last 1 - 2 seconds to compare against
      
      // emit event with the velocity for any higher that threshold
      
    });
  }, 1); // really would like to sample faster that 1 ms
})

/* ----- get ambient light measurement to switch to "night" mode ----- */
/* open the connection to analog line two
 * this is only on fixtures one and six.
*/

// on sigterm close
microphone.close();
distanceSensor.close();
