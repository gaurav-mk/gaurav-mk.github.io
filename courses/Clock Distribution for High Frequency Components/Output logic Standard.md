## Types of Output logic Standards

### 1. LVDS (Low Voltage Differential Signaling)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 110 455 250" width="100%" height="100%">
  <g id="cardLVDS">
    <rect x="30" y="110" width="455" height="250" rx="10" fill="#ffffff" stroke="#e0e0e0"/>
    <path d="M 30 120 A 10 10 0 0 1 40 110 L 475 110 A 10 10 0 0 1 485 120 L 485 155 L 30 155 Z" fill="#1976d2"/>
    <text x="45" y="140" style="font: bold 18px Arial; fill: #ffffff">LVDS (Low Voltage Differential)</text>

    <rect x="45" y="170" width="425" height="180" rx="6" fill="#f4f8fb" stroke="#bbdefb"/>

    <!-- Driver Box -->
    <rect x="60" y="185" width="120" height="150" rx="6" fill="#ffffff" stroke="#1976d2"/>
    <text x="75" y="205" style="font: bold 12px Arial; fill: #1976d2">LVDS Driver</text>
    <circle cx="120" cy="245" r="16" fill="#e3f2fd" stroke="#1976d2"/>
    <path d="M 120 253 L 120 237 M 120 237 L 115 243 M 120 237 L 125 243" stroke="#1976d2" fill="none"/>
    <text x="92" y="278" style="font: bold 11px Arial; fill: #333333">3.5 mA Source</text>

    <!-- Driver Outputs -->
    <text x="185" y="220" style="font: bold 11px Arial; fill: #1976d2">OUTp</text>
    <text x="185" y="290" style="font: bold 11px Arial; fill: #1976d2">OUTn</text>

    <!-- Traces -->
    <rect x="180" y="222" width="155" height="2" fill="#1976d2"/>
    <rect x="180" y="282" width="155" height="2" fill="#1976d2"/>
    <text x="215" y="215" style="font: 11px Arial; fill: #666666">100 ohm Trace Pair</text>

    <!-- 100 ohm Termination -->
    <rect x="334" y="223" width="2" height="60" fill="#d32f2f"/>
    <rect x="323" y="240" width="24" height="26" fill="#ffffff" stroke="#d32f2f"/>
    <text x="327" y="257" style="font: bold 10px Arial; fill: #d32f2f">100</text>
    <text x="327" y="270" style="font: 10px Arial; fill: #d32f2f">ohm</text>

    <!-- Receiver Box -->
    <rect x="340" y="185" width="110" height="150" rx="6" fill="#ffffff" stroke="#1976d2"/>
    <text x="355" y="205" style="font: bold 12px Arial; fill: #1976d2">Receiver</text>
    <polygon points="370,220 370,290 425,255" fill="#e3f2fd" stroke="#1976d2"/>
  </g>
</svg>

- **Operating Principle**: Uses a constant current source (typically 3.5 mA) steered through an H bridge circuit. The current flows through a far end 100 ohm differential resistor, creating a voltage drop of approximately 350 mV across the inputs.
- **DC Common Mode Voltage**: Centered tightly at 1.2 V, making it independent of supply voltage levels (such as 3.3 V or 2.5 V or 1.8 V).
- **Termination**: A single 100 ohm differential resistor placed directly across the differential input pair as close as possible to the receiver.
- **Advantages**: Extremely low power consumption (around 11 mW), low electromagnetic interference, supported natively by almost all FPGAs and microprocessors.

### 2. CML (Current Mode Logic)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="515 110 455 250" width="100%" height="100%">
  <g id="cardCML">
    <rect x="515" y="110" width="455" height="250" rx="10" fill="#ffffff" stroke="#e0e0e0"/>
    <path d="M 515 120 A 10 10 0 0 1 525 110 L 960 110 A 10 10 0 0 1 970 120 L 970 155 L 515 155 Z" fill="#2e7d32"/>
    <text x="530" y="140" style="font: bold 18px Arial; fill: #ffffff">CML (Current Mode Logic)</text>

    <rect x="530" y="170" width="425" height="180" rx="6" fill="#f1f8e9" stroke="#c8e6c9"/>

    <!-- Driver Box -->
    <rect x="545" y="185" width="120" height="150" rx="6" fill="#ffffff" stroke="#2e7d32"/>
    <text x="560" y="205" style="font: bold 12px Arial; fill: #2e7d32">CML Driver</text>

    <!-- Pull Ups inside driver -->
    <rect x="570" y="215" width="20" height="24" fill="#ffffff" stroke="#2e7d32"/>
    <text x="573" y="231" style="font: 10px Arial; fill: #2e7d32">50</text>
    <rect x="625" y="215" width="20" height="24" fill="#ffffff" stroke="#2e7d32"/>
    <text x="628" y="231" style="font: 10px Arial; fill: #2e7d32">50</text>

    <!-- VCC Rail top -->
    <rect x="565" y="210" width="85" height="2" fill="#2e7d32"/>
    <text x="595" y="205" style="font: bold 10px Arial; fill: #2e7d32">VCC</text>

    <text x="670" y="245" style="font: bold 11px Arial; fill: #2e7d32">OUTp</text>
    <text x="670" y="295" style="font: bold 11px Arial; fill: #2e7d32">OUTn</text>

    <!-- Traces -->
    <rect x="665" y="247" width="155" height="2" fill="#2e7d32"/>
    <rect x="665" y="297" width="155" height="2" fill="#2e7d32"/>
    <text x="700" y="240" style="font: 11px Arial; fill: #666666">50 ohm Traces</text>

    <!-- Receiver Box -->
    <rect x="825" y="185" width="110" height="150" rx="6" fill="#ffffff" stroke="#2e7d32"/>
    <text x="840" y="205" style="font: bold 12px Arial; fill: #2e7d32">Receiver</text>

    <!-- Receiver Pull Ups -->
    <rect x="845" y="215" width="20" height="24" fill="#ffffff" stroke="#2e7d32"/>
    <text x="848" y="231" style="font: 10px Arial; fill: #2e7d32">50</text>
    <rect x="895" y="215" width="20" height="24" fill="#ffffff" stroke="#2e7d32"/>
    <text x="898" y="231" style="font: 10px Arial; fill: #2e7d32">50</text>
  </g>
</svg>

- **Operating Principle**: Employs an open drain or open collector differential transistor pair with integrated 50 ohm pull up resistors tied to VCC. Current is switched between the two output legs.
- **DC Common Mode Voltage**: Very close to the positive supply rail, typically VCC minus 0.2 V (around 3.1 V on a 3.3 V rail).
- **Termination**: Integrated 50 ohm pull up resistors at both transmitter driver and receiver inputs tied to VCC.
- **Advantages**: Fastest differential logic standard available, capable of speeds exceeding 10 Gbps up to over 100 Gbps in optical transceivers, SERDES, and ultra high speed serializers.

### 3. LVPECL (Low Voltage Positive Emitter Coupled Logic)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 670 455 250" width="100%" height="100%">
  <g id="cardLVPECL">
    <rect x="30" y="670" width="455" height="250" rx="10" fill="#ffffff" stroke="#e0e0e0"/>
    <path d="M 30 680 A 10 10 0 0 1 40 670 L 475 670 A 10 10 0 0 1 485 680 L 485 715 L 30 715 Z" fill="#7b1fa2"/>
    <text x="45" y="700" style="font: bold 18px Arial; fill: #ffffff">LVPECL (Low Voltage PECL)</text>

    <rect x="45" y="730" width="425" height="180" rx="6" fill="#f3e5f5" stroke="#e1bee7"/>

    <!-- Driver Box -->
    <rect x="60" y="745" width="120" height="150" rx="6" fill="#ffffff" stroke="#7b1fa2"/>
    <text x="70" y="765" style="font: bold 12px Arial; fill: #7b1fa2">LVPECL Driver</text>
    <text x="75" y="810" style="font: 11px Arial; fill: #7b1fa2">Emitter Follower</text>
    <text x="80" y="830" style="font: 11px Arial; fill: #7b1fa2">Outputs</text>

    <text x="185" y="780" style="font: bold 11px Arial; fill: #7b1fa2">OUTp</text>
    <text x="185" y="850" style="font: bold 11px Arial; fill: #7b1fa2">OUTn</text>

    <!-- Traces -->
    <rect x="180" y="782" width="155" height="2" fill="#7b1fa2"/>
    <rect x="180" y="852" width="155" height="2" fill="#7b1fa2"/>

    <!-- External Pull Down Resistors to VCC minus 2V -->
    <rect x="250" y="784" width="20" height="24" fill="#ffffff" stroke="#d32f2f"/>
    <text x="253" y="800" style="font: 10px Arial; fill: #d32f2f">50</text>
    <rect x="290" y="854" width="20" height="24" fill="#ffffff" stroke="#d32f2f"/>
    <text x="293" y="870" style="font: 10px Arial; fill: #d32f2f">50</text>

    <rect x="240" y="890" width="90" height="2" fill="#d32f2f"/>
    <text x="242" y="904" style="font: bold 10px Arial; fill: #d32f2f">VCC minus 2 V</text>

    <!-- Receiver Box -->
    <rect x="340" y="745" width="110" height="150" rx="6" fill="#ffffff" stroke="#7b1fa2"/>
    <text x="355" y="765" style="font: bold 12px Arial; fill: #7b1fa2">Receiver</text>
  </g>
</svg>

- **Operating Principle**: Uses emitter follower output transistors that can source high current but cannot sink current.
- **DC Common Mode Voltage**: Set at VCC minus 1.3 V (which equals 2.0 V on a standard 3.3 V supply rail).
- **Termination**: Requires external DC bias path to sink current. Standard termination consists of 50 ohm resistors connected to a bias voltage rail set to VCC minus 2 V (or equivalent Thevenin divider networks using 130 ohm to VCC and 82 ohm to GND).
- **Advantages**: High drive capability, large differential voltage swing (800 mV peak to peak), extremely low additive phase noise and jitter, making it a classic choice for ultra precise clock trees.

### 4. HCSL (High Speed Current Steering Logic)

<svg xmlns="http://www.w3.org/2000/svg" viewBox="515 670 455 250" width="100%" height="100%">
  <g id="cardHCSL">
    <rect x="515" y="670" width="455" height="250" rx="10" fill="#ffffff" stroke="#e0e0e0"/>
    <path d="M 515 680 A 10 10 0 0 1 525 670 L 960 670 A 10 10 0 0 1 970 680 L 970 715 L 515 715 Z" fill="#e65100"/>
    <text x="530" y="700" style="font: bold 18px Arial; fill: #ffffff">HCSL (High Speed Current Steering)</text>

    <rect x="530" y="730" width="425" height="180" rx="6" fill="#fff3e0" stroke="#ffe0b2"/>

    <!-- Driver Box -->
    <rect x="545" y="745" width="120" height="150" rx="6" fill="#ffffff" stroke="#e65100"/>
    <text x="555" y="765" style="font: bold 12px Arial; fill: #e65100">HCSL Driver</text>
    <circle cx="605" cy="805" r="16" fill="#fff3e0" stroke="#e65100"/>
    <path d="M 605 813 L 605 797 M 605 813 L 600 807 M 605 813 L 610 807" stroke="#e65100" fill="none"/>
    <text x="578" y="838" style="font: bold 11px Arial; fill: #333333">15 mA Source</text>

    <text x="670" y="780" style="font: bold 11px Arial; fill: #e65100">OUTp</text>
    <text x="670" y="850" style="font: bold 11px Arial; fill: #e65100">OUTn</text>

    <!-- Traces -->
    <rect x="665" y="782" width="155" height="2" fill="#e65100"/>
    <rect x="665" y="852" width="155" height="2" fill="#e65100"/>

    <!-- Receiver Box -->
    <rect x="825" y="745" width="110" height="150" rx="6" fill="#ffffff" stroke="#e65100"/>
    <text x="840" y="765" style="font: bold 12px Arial; fill: #e65100">Receiver</text>

    <!-- 50 ohm Pull Down to GND -->
    <rect x="845" y="795" width="20" height="24" fill="#ffffff" stroke="#d32f2f"/>
    <text x="848" y="811" style="font: 10px Arial; fill: #d32f2f">50</text>
    <rect x="895" y="795" width="20" height="24" fill="#ffffff" stroke="#d32f2f"/>
    <text x="898" y="811" style="font: 10px Arial; fill: #d32f2f">50</text>

    <rect x="835" y="830" width="90" height="2" fill="#333333"/>
    <text x="865" y="845" style="font: bold 10px Arial; fill: #333333">GND</text>
  </g>
</svg>

- **Operating Principle**: Drives a switched 15 mA current source into output lines terminated directly to ground.
- **DC Common Mode Voltage**: Low common mode bias centered around 0.35 V.
- **Termination**: Requires 50 ohm pull down resistors to ground at the receiver end.
- **Advantages**: Zero static current dissipation on the driver side when idle, fast edge rates, standard native interface for PCI Express (PCIe) clock distribution networks.

### Common Mode Voltage Comparison

<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 1230 940 120" width="100%" height="100%">
  <g id="vcmMap">
    <rect x="30" y="1230" width="940" height="120" rx="10" fill="#ffffff" stroke="#e0e0e0"/>
    <path d="M 30 1240 A 10 10 0 0 1 40 1230 L 960 1230 A 10 10 0 0 1 970 1240 L 970 1260 L 30 1260 Z" fill="#37474f"/>
    <text x="45" y="1252" style="font: bold 14px Arial; fill: #ffffff">Common Mode Voltage (VCM) Spectrum Comparison</text>

    <rect x="100" y="1305" width="780" height="4" fill="#37474f"/>

    <rect x="100" y="1295" width="2" height="24" fill="#37474f"/>
    <text x="92" y="1335" style="font: bold 12px Arial; fill: #333333">0 V</text>

    <circle cx="182" cy="1307" r="8" fill="#e65100"/>
    <text x="162" y="1285" style="font: bold 12px Arial; fill: #e65100">HCSL (0.35 V)</text>

    <circle cx="383" cy="1307" r="8" fill="#1976d2"/>
    <text x="363" y="1285" style="font: bold 12px Arial; fill: #1976d2">LVDS (1.2 V)</text>

    <circle cx="572" cy="1307" r="8" fill="#7b1fa2"/>
    <text x="542" y="1285" style="font: bold 12px Arial; fill: #7b1fa2">LVPECL (2.0 V)</text>

    <circle cx="832" cy="1307" r="8" fill="#2e7d32"/>
    <text x="802" y="1285" style="font: bold 12px Arial; fill: #2e7d32">CML (3.1 V)</text>

    <rect x="880" y="1295" width="2" height="24" fill="#37474f"/>
    <text x="868" y="1335" style="font: bold 12px Arial; fill: #333333">3.3 V VCC</text>
  </g>
</svg>

## Interfacing Different Logic Families (AC Coupling Guidelines)

When connecting a transmitter of one family to a receiver of another family (for instance, an LVPECL clock driver to a CML receiver), the differing common mode voltages will cause signal clipping or component damage if connected directly via DC coupling.

1. **AC Coupling Capacitors**: Place 100 nF capacitors in series on both differential lines to block the transmitter DC bias voltage while passing high frequency signals.
2. **Receiver Re Biasing**: At the receiver side of the AC coupling capacitors, implement the receiver's required DC common mode voltage (e.g. 1.2 V for LVDS or pull up to VCC for CML).