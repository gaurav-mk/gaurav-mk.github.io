## Antenna Fundamentals

>CST: Computer Simulation Technology

### RF Parameters
#### S-Parameters
- Describes the input-output parameters between ports and or terminals in an electric system.
- It is also a mathematical representation of how RF energy propagates in a multiport network.
- S11, S12, S21, S22 are S-parameters or scattering parameters.
- S12, S22 have the meaning of transmission coefficients.

#### S11 Parameter
- This is the input port voltage reflection coefficient.
- It is reflected power radio 1 is trying to deliver to antenna 1. It tells us how much of a signal is reflected to the receiver after striking the antenna.
- It is mostly used in antennas for checking how much power is transmitted.
- S11 parameter graph should be less than -10 dB. This condition shows that more than almost 90% of power is transmitted and 10% is reflected.
- At -3 dB, there will be 50% transmission as well as reflection.
#### S22 Parameter
- This is the output port voltage reflection coefficient.
- It is reflected power radio 2 is trying to deliver to antenna 2.
- S11 and S22 provide us following useful information:
	- Return loss or reflection coefficient
	- Impedance and Admittance
	- VSWR of input and output ports
#### S12 Parameter
- Reverse voltage gain.
- It is the power from radio 2 that is delivered through antenna 1 to radio 1.

#### S21 Parameter
- Forward voltage gain.
- This is the transmission coefficient.
- It is the power received at antenna 2 relative to the power input to antenna 1.
- It tells how much of the signal is transmitted into the surface.
- It is mostly used in EBG (Electromagnetic Bandgap) or FSS (Frequency Selective Surface) structures to check how much of the signal is absorbed by them.
- S21 and S12 provide us following useful information:
	- Gain/Loss (i.e. insertion loss)
	- Phase and Group Delay

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" width="640" height="300" font-family="Cambria, Georgia, serif">
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#7f9fc4"/>
    </marker>
  </defs>
  <rect x="230" y="55" width="180" height="180" rx="28" fill="none" stroke="#8fa8c8" stroke-width="1.5"/>
  <text x="320" y="152" font-size="22" text-anchor="middle" fill="#ffffff">Component</text>
  <line x1="40" y1="100" x2="222" y2="100" stroke="#7f9fc4" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="410" y1="150" x2="600" y2="150" stroke="#7f9fc4" stroke-width="2.5" marker-end="url(#arr)"/>
  <line x1="230" y1="195" x2="48" y2="195" stroke="#7f9fc4" stroke-width="2.5" marker-end="url(#arr)"/>
  <text x="42" y="45" font-size="22" fill="#ffffff">Incident</text>
  <text x="42" y="75" font-size="22" fill="#ffffff">Power</text>
  <text x="425" y="105" font-size="22" fill="#ffffff">Transmitted</text>
  <text x="425" y="135" font-size="22" fill="#ffffff">Power</text>
  <text x="45" y="235" font-size="22" fill="#ffffff">Reflected</text>
  <text x="45" y="265" font-size="22" fill="#ffffff">Power</text>
</svg>
#### Insertion Loss = Transmitted power / Incident Power
#### Return Loss = Reflected Power / Incident Power
#### VSWR
§  VSWR stands for Voltage standing wave ratio.

§  This is the measure of how efficiently a radio power is transmitted through a transmission line the antenna.

§  It is also the measure of the reflected standing waves along the feeder.

§  The Voltage standing wave ratio (VSWR) is an indication of the amount of mismatch between an antenna and the feed line connecting to it.

§  The range of values for VSWR in from 1 to infinity.

§  A VSWR value under 2 is considered suitable for most antenna applications. The antenna can be described as having a good match.

§  So when someone says that the antenna is poorly matched, very often it means that the VSWR value exceeds 2 for a frequency of interest.

o   G**ain:**

§  It describes how much power is transmitted in the desired direction to that of the isotropic antenna.

§  A transmitting antenna with 3 dB gain means that the power received far from the antenna will be 3 dB higher (twice as much) than what would be received from a lossless isotropic antenna with same input power.

o   RCS:

§  Radar Cross-section is the detectability of an object by radar.

§  It is also the ability of an object to reflect radar signal in direction of its receiver.

§  Large RCS indicates that an object is easily detectable.

o   Bandwidth:

§  An antenna’s bandwidth is the range of frequencies (or wavelengths) over which it works effectively.

§  The broader the bandwidth, the greater the range of different radio waves you can pick up.