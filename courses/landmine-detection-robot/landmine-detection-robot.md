>A remotely-driven robot that finds buried landmines with dual inductive proximity sensors, tags the location by GPS, and SMS-alerts a bomb squad over GSM — with a wireless camera for safe navigation.

## Taking the Human Out of the Minefield

Manual demining is slow and dangerous — clearing a single square kilometre by hand can take months, and every metre carries risk to the person doing the clearing. This project builds a remotely-driven robot that does the finding instead: it sweeps a suspect area on a wireless RF link, detects buried landmines with paired inductive proximity sensors, and reports the exact latitude/longitude of a find over GPS and GSM so a bomb squad can deal with it from a known-safe position, without a person having to locate the threat by walking onto it first.

## One Controller, Four Subsystems

A **DSPIC30F4013** microcontroller sits at the centre of the robot, tying together drive, sensing, and communication. Two 6V batteries feed a regulated +5V rail. The metal/proximity sensors connect directly to the controller; the GPS and GSM modems connect over RS232 (needed because the controller can't interface their pins directly); and the RF receiver feeds a decoder, which hands drive commands to the controller, which in turn drives a relay bank to switch the DC motors.

<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">

          <defs>

            <pattern id="lr-g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#7cb342" stroke-width="0.25" opacity="0.1"></path></pattern>

            <marker id="lr-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7cb342"></path></marker>

          </defs>

          <rect width="720" height="260" fill="url(#lr-g)"></rect>

          <rect x="300" y="100" width="120" height="70" rx="7" fill="#1a2417" stroke="#7cb342" stroke-width="1.6"></rect>

          <text x="360" y="130" text-anchor="middle" font-family="Roboto Mono" font-size="9.5" font-weight="700" fill="#bfe08f">DSPIC</text>

          <text x="360" y="144" text-anchor="middle" font-family="Roboto Mono" font-size="9.5" font-weight="700" fill="#bfe08f">30F4013</text>

          <text x="360" y="160" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#a7b0b7">central controller</text>

          <g font-family="Roboto Mono" font-size="8.5" font-weight="600" fill="#e8eaec" text-anchor="middle">

            <rect x="30" y="20" width="90" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="75" y="40">GPS</text>

            <rect x="30" y="70" width="90" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="75" y="90">GSM</text>

            <rect x="30" y="120" width="90" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="75" y="136">METAL</text><text x="75" y="147" font-size="7" font-weight="400" fill="#5f676e">SENSOR</text>

            <rect x="600" y="20" width="90" height="32" rx="5" fill="#fff" stroke="#e0a458" stroke-width="1.2"></rect><text x="645" y="40" fill="#e0a458">RF RX</text>

            <rect x="600" y="70" width="90" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="645" y="90">DECODER</text>

            <rect x="600" y="120" width="90" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="645" y="136">RELAY</text><text x="645" y="147" font-size="7" font-weight="400" fill="#5f676e">DRIVER</text>

            <rect x="600" y="170" width="90" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="645" y="190">DC MOTORS</text>

            <rect x="270" y="210" width="180" height="32" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="360" y="230">2× 6V BATTERY → +5V SUPPLY</text>

          </g>

          <g stroke="#7cb342" stroke-width="1.2" marker-end="url(#lr-arr)" fill="none">

            <path d="M120,36 H260 Q300,36 300,80 V100"></path>

            <path d="M120,86 H260 Q300,86 300,100" ></path>

            <line x1="120" y1="136" x2="299" y2="136"></line>

            <path d="M420,136 H480 Q600,136 600,86"></path>

            <line x1="600" y1="70" x2="600" y2="52"></line>

            <line x1="600" y1="120" x2="600" y2="102"></line>

            <line x1="645" y1="152" x2="645" y2="169"></line>

            <line x1="360" y1="210" x2="360" y2="170"></line>

          </g>

          <text x="497" y="80" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">RS232</text>

          <text x="497" y="130" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">direct</text>

        </svg>

## Driving the Robot by Radio
Motion is fully remote. At the transmitting end, a keypad feeds button presses to a PIC microcontroller, which an encoder converts to a radio-frequency signal for transmission. At the receiving end, on the robot itself, an RF receiver picks up the signal, a decoder recovers the original command, and the DSPIC30F4013 switches the relay bank accordingly — driving the rear wheels forward, backward, left, or right, with the front two wheels running as unpowered dummy wheels. The RF link runs at 433.92 MHz with a super-regenerative receiver rated to roughly 100 feet at 2400 bps, and a wireless camera on the vehicle gives the operator a live view for navigation and for spotting the ground ahead before committing to a path.

## GPS Trilateration, GSM Reporting

Once a mine is detected, the robot needs to hand off a precise, actionable location — not just an alarm. The onboard GPS receiver listens to at least four satellites simultaneously; from the time each signal takes to arrive, it estimates distance to each satellite and resolves its own position in three dimensions by **trilateration** — the more satellites in view, the tighter the fix. That latitude/longitude is displayed locally on an onboard LCD, and simultaneously handed to a SIM-based GSM modem, which sends it as an SMS directly to a bomb squad member's phone — turning "a mine is somewhere in this field" into a coordinate a team can drive straight to.

<svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">

          <defs><pattern id="tr-g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#7cb342" stroke-width="0.25" opacity="0.1"></path></pattern></defs>

          <rect width="720" height="200" fill="url(#tr-g)"></rect>

          <circle cx="260" cy="70" r="90" fill="none" stroke="#7cb342" stroke-width="1.3" stroke-dasharray="5 3" opacity="0.75"></circle>

          <circle cx="440" cy="90" r="95" fill="none" stroke="#e0a458" stroke-width="1.3" stroke-dasharray="5 3" opacity="0.75"></circle>

          <circle cx="360" cy="150" r="80" fill="none" stroke="#4f7aa6" stroke-width="1.3" stroke-dasharray="5 3" opacity="0.75"></circle>

          <rect x="248" y="18" width="24" height="16" rx="2" fill="#7cb342"></rect><text x="260" y="12" text-anchor="middle" font-family="Roboto Mono" font-size="8" fill="#7cb342" font-weight="600">SAT A</text>

          <rect x="428" y="38" width="24" height="16" rx="2" fill="#e0a458"></rect><text x="440" y="32" text-anchor="middle" font-family="Roboto Mono" font-size="8" fill="#e0a458" font-weight="600">SAT B</text>

          <rect x="348" y="112" width="24" height="16" rx="2" fill="#4f7aa6"></rect><text x="360" y="106" text-anchor="middle" font-family="Roboto Mono" font-size="8" fill="#4f7aa6" font-weight="600">SAT C</text>

          <circle cx="352" cy="108" r="4.5" fill="#e8eaec"></circle>

          <text x="352" y="130" text-anchor="middle" font-family="Roboto Mono" font-size="9" fill="#e8eaec" font-weight="700">ROBOT FIX</text>

          <text x="360" y="185" text-anchor="middle" font-family="Roboto Mono" font-size="8" fill="#5f676e">range from ≥ 4 satellites narrows position to a single point in 3-D</text>

        </svg>

## Two Sensors, Two Mine Types
Detection is handled by inductive proximity sensors, mounted in two separate positions on the chassis to cover both classes of anti-personnel mine the robot is designed against: common **blast mines** and the wire-triggered **fragmentation mines**. Each sensor runs a Hartley oscillator feeding a coil in the sensing head; a metallic object entering the field induces eddy currents that load the oscillator and drop its output amplitude — that drop is what the detection circuit reads as a hit, triggering the onboard buzzer. Practical figures from the build: 10 mm sensing distance and a 200 Hz sensing rate, which is more than fast enough for a slow-moving sweep pattern.

## From Chassis to Working Prototype

The finished robot runs on an orange-painted cast-iron chassis with the DSPIC30F4013 and its supporting PCB mounted centrally, motors and rear-wheel drive underneath, and the GPS/GSM modems and metal sensors wired in on fixed pin assignments: metal sensors on pins 10 and 38, GPS on pins 25–26, and GSM on pins 27–28. Motion control and sensor logic were written in Embedded C. With the main board mounted and wired, the robot's first commanded motion, sensor alarm, and GPS/GSM location report were all verified on the physical prototype — with the wireless camera added afterward purely for improved navigation and situational awareness.

#Conclusion
## Why It Matters

Landmines laid decades ago can stay lethal for up to fifty years, and manual clearance remains one of the slowest, most dangerous jobs in humanitarian engineering. A robot that finds and precisely locates a mine — without a person walking the field to do it — turns demining from a search-and-hope process into a targeted one: send a team to a known coordinate instead of sweeping blind. That's the problem this prototype was built to chip away at, and the reason it's aimed squarely at defensive, humanitarian use.