>An automatic LED emergency lamp on an online-UPS topology that switches to battery the instant mains drops — with Arduino + Bluetooth control from a smartphone app for manual or light-sensing automatic operation.

## Backup Power Meets IoT

Emergency lamps and UPS units are old, well-understood ideas — but most stay dumb: on or off, nothing more. This project rebuilds the emergency-lamp-plus-UPS pattern on an **online UPS** configuration, where the load always runs from the regulated, battery-backed rail rather than switching over after a mains failure is detected, so there's no interruption at all when power drops. On top of that base, an Arduino Uno and a Bluetooth module add a control layer: the lamp can be switched manually from a smartphone app, or left to a Light Dependent Resistor (LDR) that turns it on automatically once ambient light falls below a threshold.

## From Mains to Lamp

Two subsystems share one load. The power path steps 230 V mains down, rectifies and filters it, and uses the regulated output both to power the load directly and to trickle-charge a battery. The control path reads an LDR and a Bluetooth link into the Arduino, which drives a relay across the same lamp.

<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">
<defs>
<pattern id="ba-g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#7cb342" stroke-width="0.25" opacity="0.1"></path></pattern>
<marker id="ba-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7cb342"></path></marker>
<marker id="ba-arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0a458"></path></marker>
</defs>
<rect width="720" height="260" fill="url(#ba-g)"></rect>
<text x="20" y="24" font-family="Roboto Mono" font-size="9" fill="#7cb342" font-weight="600" letter-spacing="0.1em">POWER PATH</text>
<g font-family="Roboto Mono" font-size="8.5" font-weight="600" fill="#e8eaec" text-anchor="middle">
<rect x="16"  y="34" width="90" height="34" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="61" y="55">AC 230V</text>
<rect x="130" y="34" width="90" height="34" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="175" y="49">TRANSFORMER</text><text x="175" y="60" font-size="7" font-weight="400" fill="#5f676e">230/15V</text>
<rect x="244" y="34" width="100" height="34" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="294" y="49">RECTIFIER</text><text x="294" y="60" font-size="7" font-weight="400" fill="#5f676e">+ FILTER</text>
<rect x="368" y="34" width="110" height="34" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="423" y="49">LM317</text><text x="423" y="60" font-size="7" font-weight="400" fill="#5f676e">REGULATOR · 9V</text>
<rect x="502" y="16" width="90" height="34" rx="5" fill="#1a2417" stroke="#7cb342" stroke-width="1.2"></rect><text x="547" y="37" fill="#bfe08f">BATTERY</text>
<rect x="502" y="58" width="90" height="30" rx="5" fill="#fff" stroke="#7cb342" stroke-width="1.2"></rect><text x="547" y="77" font-size="8">CHARGER</text>
<rect x="620" y="34" width="86" height="34" rx="5" fill="#fff" stroke="#e0a458" stroke-width="1.4"></rect><text x="663" y="49" fill="#e0a458">RELAY</text><text x="663" y="60" font-size="7" font-weight="400" fill="#5f676e">→ LAMP</text>
</g>
<g stroke="#7cb342" stroke-width="1.3" marker-end="url(#ba-arr)" fill="none">
<line x1="106" y1="51" x2="129" y2="51"></line>
<line x1="220" y1="51" x2="243" y2="51"></line>
<line x1="344" y1="51" x2="367" y2="51"></line>
<line x1="478" y1="42" x2="501" y2="34"></line>
<line x1="478" y1="60" x2="501" y2="70"></line>
<line x1="547" y1="50" x2="547" y2="57"></line>
</g>
<line x1="478" y1="51" x2="663" y2="51" stroke="#7cb342" stroke-width="1.3" marker-end="url(#ba-arr)"></line>
<text x="20" y="118" font-family="Roboto Mono" font-size="9" fill="#e0a458" font-weight="600" letter-spacing="0.1em">CONTROL PATH</text>
<g font-family="Roboto Mono" font-size="8.5" font-weight="600" fill="#e8eaec" text-anchor="middle">
<rect x="16"  y="128" width="90" height="34" rx="5" fill="#fff" stroke="#e0a458" stroke-width="1.2"></rect><text x="61" y="149">LDR</text>
<rect x="130" y="128" width="120" height="34" rx="5" fill="#fff" stroke="#e0a458" stroke-width="1.4"></rect><text x="190" y="143">ARDUINO</text><text x="190" y="154" font-size="7" font-weight="400" fill="#5f676e">UNO</text>
<rect x="16"  y="180" width="90" height="34" rx="5" fill="#fff" stroke="#e0a458" stroke-width="1.2"></rect><text x="61" y="195">SMARTPHONE</text><text x="61" y="206" font-size="7" font-weight="400" fill="#5f676e">app</text>
<rect x="130" y="180" width="120" height="34" rx="5" fill="#fff" stroke="#e0a458" stroke-width="1.2"></rect><text x="190" y="195">BLUETOOTH</text><text x="190" y="206" font-size="7" font-weight="400" fill="#5f676e">module</text>
</g>
<g stroke="#e0a458" stroke-width="1.3" marker-end="url(#ba-arr2)" fill="none">
<line x1="106" y1="145" x2="129" y2="145"></line>
<line x1="106" y1="197" x2="129" y2="197"></line>
<line x1="190" y1="180" x2="190" y2="163"></line>
</g>
<path d="M 250,145 H 663 V 68" fill="none" stroke="#e0a458" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#ba-arr2)"></path>
<text x="450" y="140" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">Arduino drives relay from LDR or app command</text>
</svg>

*Fig 1 — The power path (top) keeps the lamp online off a regulated, battery-backed rail. The control path (bottom) drives the same relay from either the LDR or a Bluetooth command from the phone app.*

## The Online UPS Circuit

230 V, 50 Hz mains steps down through a 230V/15V, 1A transformer, is rectified by a bridge rectifier, and smoothed by a capacitive filter. An **LM317** adjustable regulator sets the output to a fixed 9 V via its potentiometer. A zener diode across the battery terminal acts as overcharge protection — once terminal voltage exceeds 9 V, the zener breaks down and diverts current to ground, lighting a red status LED rather than continuing to force current into a full battery. Because the topology is *online*, the load is powered from this same regulated rail continuously; when mains disappears, the battery already sitting on that rail keeps supplying it with zero switchover gap.

| Parameter | Value |
|---|---|
| Output voltage (V₀) | 9 V |
| Output current (I₀) | 0.17 A |
| Charging current (I꜀) | 0.06 A |
| Load current (I_L) | 0.11 A |
| Charging time (T꜀) | 5 hours |

## Bluetooth, Arduino, and the App

A 4-pin Bluetooth module (Rx, Tx, VCC, GND — Rx/Tx cross-wired to the Arduino) bridges the phone to the microcontroller. The Android app, built in **MIT App Inventor**, lists nearby Bluetooth devices, connects, and exposes three controls that each send a single character over the link: `'O'` turns the lamp on manually, `'F'` turns it off manually, and `'A'` — the default state — hands control to the LDR. In automatic mode, the Arduino reads the LDR on digital pin 7 against a threshold of 5 (on a 0–20 scale): below threshold reads as dark and closes the relay to turn the LED on, above threshold reads as daylight and opens it.

| Signal | Behaviour |
|---|---|
| 'A' | Automatic — Arduino follows the LDR (default state) |
| 'O' | Manual on — relay closes, LED lights regardless of ambient light |
| 'F' | Manual off — relay opens, LED stays off regardless of ambient light |
| LDR < 5 | Dark reading → relay closed → LED on (auto mode only) |
| LDR > 5 | Daylight reading → relay open → LED off (auto mode only) |

## Verifying Both Control Paths

The system was tested by switching the ambient source light on and off: in automatic mode, exposing the LDR to light reliably opened the relay and dropped the lamp, and removing the light source closed it again. Manual on/off from the smartphone app was verified independently of ambient light. Finally, the power path itself was tested by pulling mains: the battery picked up the load with no observable interruption, and could still be commanded manually or automatically while running from battery — confirming the "automatic emergency LED lamp" behaviour end to end.

## From Prototype to Product

The prototype meets its brief for single-lamp, low-power household use; scaling the same topology to industrial loads would need a redesign rather than a bigger battery. At projected retail volumes the estimated unit cost sits around ₹300–350, with further headroom if components are sourced at mass-production scale. The larger point of the project is the pattern, not the lamp: an always-on, battery-backed power rail with an IoT control layer bolted on top generalizes cleanly to lighting and small appliances across homes, offices, and campuses, wherever "the power should just not go out" matters more than the specific load being an LED.
