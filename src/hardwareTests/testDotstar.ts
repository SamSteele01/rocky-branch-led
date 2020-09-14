import * as dotstar from '../LEDs/dotstar'
// const PiSPI = require('pi-spi'); // only works with Node v10.x.x
import { SPI, Mode, Order } from 'spi-node'

/* connect SPI 0 to the demultiplexer. CS doesn't matter */
// let pispi00 = SPI.initialize('/dev/spidev0.0');
const spi = SPI.fromDevicePath('/dev/spidev0.0')
  .setMode(Mode.M0)
  .setOrder(Order.MSB_FIRST)
  .setSpeed(1e7)

const testStrip = new dotstar.Dotstar(spi, { length: 40 })

testStrip.all(0, 0, 200, 0.5)
testStrip.sync()

process.on("SIGINT", () => {
  testStrip.all(0, 0, 0, 0)
  testStrip.sync()
  spi.close()
})