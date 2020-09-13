# Rocky Branch LED

Six lighting fixtures in the south Saunders pedestrian tunnel in Raleigh, NC.

Each lighting fixture has one infinity mirror, which has 576 LEDs or a few less; and two runs for edge-lit plexi-glass, which has multiple pieces of varying length per run. The runs are on one side of the infinity mirror or another.

---

## Controllers

Raspberry Pi 3 B+ They have built in Bluetooth and a 4 core processor. Each core is a ARM Cortex-A53.

[Pinout](https://pinout.xyz/pinout/pin38_gpio20)

---

## LEDs

We are using [dotstar LED strips](https://cdn-shop.adafruit.com/product-files/2241/alt+sk9822+datasheet.pdf)
which take a clock (yellow) and a data (green) line. The input is a Buffer of bytes.
> Max clock rate 30 MHz

They accept an SPI protocol, but the LED strips are not SPI slave devices themselves. That is, they don't accept a channel select (CS) input. We have to use a demultiplexer chip
to route the connections. [CD4052BE](http://www.ti.com/lit/ds/symlink/cd4052b.pdf)

There are 2 SPIs on a Raspberry pi 3, with 2 and 3 Channel Selects (CS) respectively.
- /dev/spidev0.0
- /dev/spidev0.1
- /dev/spidev1.0
- /dev/spidev1.1
- /dev/spidev1.2

We will use SPI 0 for the LEDs and SPI 1 to connect to the sensors.

On the demultiplexer chip there are two inputs, A & B, that take LOW or HIGH values to select which channel to connect to.

| CH | B | A |
| :--: | -- | -- |
| 0 | 0 | 0 |
| 1 | 0 | 1 |
| 2 | 1 | 0 |
| 3 | 1 | 1 |

This will not work with the CH pins and instead we have to use GPIO pins and manually select the channel before sending a Buffer.

---
## Inputs

### Analog

We are also using an [MCP3004](http://ww1.microchip.com/downloads/en/devicedoc/21295c.pdf) analog-to-digital chip. It takes 4 analog inputs and stores them in a buffer. The digital side uses an SPI protocol.
> * 200 ksps max. sampling rate at VDD = 5V
> * 3.6 MHz clock speed for 5V 
> * 10 kHz is the minimum clock speed to not lose data
> * CS line has to be LOW to read data.

All fixtures will have:

  - Ch 0  a microphone [CMA-6542PF](https://www.cuidevices.com/product/resource/cma-6542pf.pdf)
  > The audio sampling rate of 48 ksps is a standard.

and fixtures 1 and 6 will have:

  - Ch 1  a distance sensor [GP2Y0A710K0F](https://www.promelec.ru/pdf/GP2Y0A710K0F.pdf)
  
  - CH 2  and an ambient light sensor [TSL257-LF](https://media.digikey.com/pdf/Data%20Sheets/Austriamicrosystems%20PDFs/TSL257_.pdf)

This leaves 1 or 3 channels open for future analog devices.

### Digital

There are also 2 motion sensors per light fixture - https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/
These have logic output which is HIGH for motion.

---

## Bluetooth



---

## Dependencies

