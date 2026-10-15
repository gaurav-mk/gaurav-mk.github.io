# What is Power Electronics
>The primary function of power electronic circuits is the processing and control of electrical energy.

# Structure of Power Electronic systems
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" style="display:block; width:100%; max-width:100%; height:auto;">
  <rect x="0" y="0" width="1000" height="400" fill="white" />
  <rect x="100" y="150" width="180" height="120" fill="none" stroke="black" />
  <text x="135" y="300" fill="black">Input Filter</text>

  <rect x="350" y="150" width="300" height="120" fill="none" stroke="black" />
  <text x="445" y="300" fill="black">Power Stage</text>

  <rect x="720" y="150" width="180" height="120" fill="none" stroke="black" />
  <text x="745" y="300" fill="black">Output Filter</text>

  <rect x="450" y="60" width="100" height="40" fill="none" stroke="black" />
  <text x="475" y="85" fill="black">Control</text>

  <circle cx="50" cy="210" r="3" fill="none" stroke="black" />
  <line x1="53" y1="210" x2="100" y2="210" stroke="black" />

  <line x1="280" y1="210" x2="350" y2="210" stroke="black" />

  <line x1="650" y1="210" x2="720" y2="210" stroke="black" />

  <line x1="900" y1="210" x2="947" y2="210" stroke="black" />
  <circle cx="950" cy="210" r="3" fill="none" stroke="black" />

  <line x1="500" y1="100" x2="500" y2="140" stroke="black" />
  <polygon points="495,140 505,140 500,150" fill="black" />

  <path d="M 130 180 C 135 165, 145 165, 150 180 C 155 165, 165 165, 170 180 C 175 165, 185 165, 190 180 C 195 165, 205 165, 210 180 M 210 180 L 250 180 M 110 180 L 130 180" fill="none" stroke="black" />
  <line x1="230" y1="180" x2="230" y2="200" stroke="black" />
  <line x1="215" y1="200" x2="245" y2="200" stroke="black" />
  <line x1="215" y1="210" x2="245" y2="210" stroke="black" />
  <line x1="230" y1="210" x2="230" y2="240" stroke="black" />

  <line x1="390" y1="170" x2="390" y2="190" stroke="black" />
  <line x1="400" y1="170" x2="400" y2="175" stroke="black" />
  <line x1="400" y1="178" x2="400" y2="183" stroke="black" />
  <line x1="400" y1="186" x2="400" y2="190" stroke="black" />
  <line x1="380" y1="170" x2="390" y2="170" stroke="black" />
  <line x1="400" y1="172" x2="420" y2="172" stroke="black" />
  <line x1="400" y1="188" x2="420" y2="188" stroke="black" />
  <line x1="420" y1="172" x2="420" y2="188" stroke="black" />

  <path d="M 470 170 L 470 190 L 490 180 Z" fill="none" stroke="black" />
  <line x1="490" y1="170" x2="490" y2="190" stroke="black" />
  <line x1="450" y1="180" x2="470" y2="180" stroke="black" />
  <line x1="490" y1="180" x2="510" y2="180" stroke="black" />

  <line x1="395" y1="220" x2="395" y2="235" stroke="black" />
  <line x1="380" y1="235" x2="410" y2="235" stroke="black" />
  <line x1="380" y1="245" x2="410" y2="245" stroke="black" />
  <line x1="395" y1="245" x2="395" y2="260" stroke="black" />

  <path d="M 450 240 C 455 225, 465 225, 470 240 C 475 225, 485 225, 490 240 C 495 225, 505 225, 510 240 C 515 225, 525 225, 530 240 M 430 240 L 450 240 M 530 240 L 550 240" fill="none" stroke="black" />

  <path d="M 580 170 C 565 175, 565 185, 580 190 C 565 195, 565 205, 580 210 C 565 215, 565 225, 580 230" fill="none" stroke="black" />
  <line x1="590" y1="165" x2="590" y2="235" stroke="black" />
  <line x1="595" y1="165" x2="595" y2="235" stroke="black" />
  <path d="M 605 170 C 620 175, 620 185, 605 190 C 620 195, 620 205, 605 210 C 620 215, 620 225, 605 230" fill="none" stroke="black" />

  <line x1="730" y1="180" x2="785" y2="180" stroke="black" />
  <line x1="765" y1="180" x2="765" y2="200" stroke="black" />
  <line x1="750" y1="200" x2="780" y2="200" stroke="black" />
  <line x1="750" y1="210" x2="780" y2="210" stroke="black" />
  <line x1="765" y1="210" x2="765" y2="240" stroke="black" />
  <path d="M 785 180 C 790 165, 800 165, 805 180 C 810 165, 820 165, 825 180 C 830 165, 840 165, 845 180 C 850 165, 860 165, 865 180 M 865 180 L 885 180" fill="none" stroke="black" />
</svg>
# Types of Converters
## 1. Linear Power Regulators
- Linear power regulators work on the principle of resistance control like a voltage divider.
- In any voltage divider the energy is wasted in the resistors and in turn reduces the efficiency a lot when stepping down from a higher voltage.
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <!-- Solid white background -->
  <rect width="100%" height="100%" fill="white" />

  <!-- Circuit Diagram Group -->
  <g fill="none" stroke="black" stroke-width="2">
    
    <!-- Vin Voltage Source -->
    <circle cx="150" cy="210" r="25" />
    <text x="150" y="200" fill="black" stroke="none" font-size="20" font-family="sans-serif" text-anchor="middle">+</text>
    <text x="150" y="225" fill="black" stroke="none" font-size="20" font-family="sans-serif" text-anchor="middle">-</text>
    
    <!-- Left Wires -->
    <line x1="150" y1="185" x2="150" y2="100" />
    <line x1="150" y1="100" x2="250" y2="100" />
    <line x1="150" y1="235" x2="150" y2="320" />

    <!-- Pass Transistor -->
    <line x1="280" y1="120" x2="320" y2="120" />
    <line x1="300" y1="120" x2="300" y2="150" />
    <line x1="250" y1="100" x2="290" y2="120" />
    <line x1="310" y1="120" x2="350" y2="100" />
    <!-- Emitter Arrow -->
    <polygon points="350,100 338,102 344,112" fill="black" stroke="none" />

    <!-- Top Right Wire -->
    <line x1="350" y1="100" x2="480" y2="100" />

    <!-- Control Block -->
    <rect x="250" y="200" width="100" height="60" />
    <!-- Upward Arrow to Transistor Base -->
    <line x1="300" y1="200" x2="300" y2="160" />
    <polygon points="300,150 295,160 305,160" fill="black" stroke="none" />

    <!-- Feedback Line -->
    <line x1="430" y1="100" x2="430" y2="230" />
    <line x1="430" y1="230" x2="360" y2="230" />
    <!-- Leftward Arrow to Control Block -->
    <polygon points="350,230 360,225 360,235" fill="black" stroke="none" />

    <!-- Load Resistor -->
    <rect x="465" y="150" width="30" height="90" />
    <polyline points="480,150 470,165 490,180 470,195 490,210 470,225 480,240" />
    <line x1="480" y1="100" x2="480" y2="150" />
    <line x1="480" y1="240" x2="480" y2="320" />

    <!-- Bottom Ground/Return Wire -->
    <line x1="150" y1="320" x2="480" y2="320" />

    <!-- VREF Input Arrow -->
    <line x1="300" y1="310" x2="300" y2="270" />
    <polygon points="300,260 295,270 305,270" fill="black" stroke="none" />
    
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="22" fill="black">
    <text x="80" y="215" font-style="italic">Vin</text>
    
    <!-- vx label -->
    <text x="230" y="80">+</text>
    <text x="290" y="80" font-style="italic">vx</text>
    <text x="340" y="78">-</text>
    
    <!-- vo label -->
    <text x="510" y="160">+</text>
    <text x="510" y="200" font-style="italic">vo</text>
    <text x="510" y="240">-</text>
    
    <!-- VREF label -->
    <text x="340" y="300" text-anchor="middle" font-style="italic">VREF</text>
  </g>
</svg>
- In this example suppose the Vx is the voltage drop on a variable resistor connected in series to the load which is controlled by the Vref from the output.
- If the input is 15 V and output 5 V then efficiency is:
> $n = \frac{V_{\text{out}} I_{\text{out}}}{V_{\text{in}} I_{\text{in}}}$
- Since $I_{\text{out}} = I_{\text{in}}$, then
> $n = \frac{V_{\text{out}}}{V_{\text{in}}}$
- That is 33 percent