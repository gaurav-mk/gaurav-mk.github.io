>A full-custom 7nm FinFET standard cell library built on the open-source ASAP7 PDK — schematic-to-layout for NOT, buffer, OR, and XOR gates, DRC/LVS-clean, and characterized for speed, power, and area at 0.7 V.

## A Cell Library From First Principles

Standard cells are the alphabet of digital IC design — every synthesized chip is built by tiling thousands of these pre-characterized logic gates. This project builds that alphabet from scratch at the 7nm FinFET node: schematic, layout, parasitic-aware verification, and performance characterization, using the **ASAP7 PDK**, an open-source predictive 7nm process design kit from Arizona State University. Commercial 7nm PDKs are locked behind foundry NDAs, so ASAP7 is what makes this kind of hands-on, advanced-node cell design possible outside industry. The library covers basic gates — NOT, Buffer, OR, XOR — built in static CMOS with complementary pull-up (PMOS) and pull-down (NMOS) networks, laid out on a 7.5-track, 10-fin cell height and pushed through DRC and LVS in Cadence Virtuoso with Mentor Graphics Calibre.

## Why FinFET, Why Now

Planar CMOS scaling runs out of road below 22nm: short-channel effects worsen, gate leakage climbs, and device-to-device variability makes timing closure harder. FinFET answers this by wrapping the gate around three sides of a raised silicon fin instead of controlling the channel from one side only — gate control tightens, leakage drops, and the device keeps scaling where planar transistors can't. That's also why the standard-cell design problem changes shape: cell height becomes a fin count, drive strength becomes a fin-per-device choice, and layout has to respect lithography constraints (double patterning, restricted routing) that didn't exist a few nodes back.

<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">
<defs><pattern id="fp-g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#7cb342" stroke-width="0.25" opacity="0.1"></path></pattern></defs>
<rect width="720" height="210" fill="url(#fp-g)"></rect>
<rect x="30" y="20" width="300" height="170" rx="8" fill="#ffffff" stroke="#262c31" stroke-width="1"></rect>
<text x="180" y="42" text-anchor="middle" font-family="Roboto Mono" font-size="9.5" fill="#a7b0b7" letter-spacing="0.1em">PLANAR MOSFET</text>
<rect x="70" y="140" width="220" height="24" fill="#20262b"></rect>
<text x="180" y="156" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">SILICON SUBSTRATE</text>
<rect x="100" y="115" width="160" height="25" fill="#e0a458" opacity="0.18"></rect>
<text x="180" y="132" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">OXIDE</text>
<rect x="130" y="88" width="100" height="27" fill="#7cb342"></rect>
<text x="180" y="105" text-anchor="middle" font-family="Roboto Mono" font-size="8" fill="#fff" font-weight="600">GATE</text>
<line x1="130" y1="115" x2="130" y2="140" stroke="#7cb342" stroke-width="1.5" stroke-dasharray="2 2"></line>
<line x1="230" y1="115" x2="230" y2="140" stroke="#7cb342" stroke-width="1.5" stroke-dasharray="2 2"></line>
<text x="180" y="180" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">gate controls channel from 1 side</text>
<rect x="390" y="20" width="300" height="170" rx="8" fill="#ffffff" stroke="#262c31" stroke-width="1"></rect>
<text x="540" y="42" text-anchor="middle" font-family="Roboto Mono" font-size="9.5" fill="#a7b0b7" letter-spacing="0.1em">FINFET</text>
<rect x="430" y="140" width="220" height="24" fill="#20262b"></rect>
<text x="540" y="156" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">SILICON SUBSTRATE</text>
<rect x="460" y="115" width="160" height="25" fill="#e0a458" opacity="0.18"></rect>
<text x="540" y="132" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">OXIDE</text>
<rect x="528" y="70" width="24" height="70" fill="#e0a458"></rect>
<text x="596" y="80" font-family="Roboto Mono" font-size="7.5" fill="#e0a458" font-weight="600">FIN</text>
<rect x="490" y="82" width="100" height="26" fill="#7cb342" opacity="0.92"></rect>
<text x="540" y="99" text-anchor="middle" font-family="Roboto Mono" font-size="8" fill="#fff" font-weight="600">GATE</text>
<path d="M528 82 v-8 a4 4 0 0 1 4 -4 h16 a4 4 0 0 1 4 4 v8" fill="none" stroke="#7cb342" stroke-width="2"></path>
<text x="540" y="180" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">gate wraps 3 sides of the fin</text>
</svg>

*Fig 1 — In a planar device the gate faces the channel from above only. FinFET raises the channel into a fin and wraps the gate around three sides, giving far tighter electrostatic control at advanced nodes.*

## Problem → Silicon: The Design Flow

Every cell in the library goes through the same seven-stage flow, moving from a paper specification to a DRC/LVS-clean, characterized layout. The device characteristics, model card, and layout design rules all come from the ASAP7 PDK itself.

<svg viewBox="0 0 720 130" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">
<defs>
<pattern id="df-g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#7cb342" stroke-width="0.25" opacity="0.1"></path></pattern>
<marker id="df-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#5f676e"></path></marker>
</defs>
<rect width="720" height="130" fill="url(#df-g)"></rect>
<g font-family="Roboto Mono" font-size="8.5" fill="#e8eaec" font-weight="600" text-anchor="middle">
<rect x="6"   y="46" width="94" height="38" rx="6" fill="#fff" stroke="#7cb342" stroke-width="1.3"></rect><text x="53" y="63">PROBLEM</text><text x="53" y="75">DEFINITION</text>
<rect x="108" y="46" width="94" height="38" rx="6" fill="#fff" stroke="#7cb342" stroke-width="1.3"></rect><text x="155" y="69">SCHEMATIC</text>
<rect x="210" y="46" width="100" height="38" rx="6" fill="#fff" stroke="#7cb342" stroke-width="1.3"></rect><text x="260" y="63">PRE-LAYOUT</text><text x="260" y="75">SIMULATION</text>
<rect x="318" y="46" width="84" height="38" rx="6" fill="#fff" stroke="#e0a458" stroke-width="1.3"></rect><text x="360" y="69" fill="#e0a458">LAYOUT</text>
<rect x="410" y="46" width="104" height="38" rx="6" fill="#fff" stroke="#7cb342" stroke-width="1.3"></rect><text x="462" y="63">POST-LAYOUT</text><text x="462" y="75">SIMULATION</text>
<rect x="522" y="46" width="100" height="38" rx="6" fill="#fff" stroke="#7cb342" stroke-width="1.3"></rect><text x="572" y="63">LIBRARY</text><text x="572" y="75">CONSTRUCTION</text>
<rect x="630" y="46" width="86" height="38" rx="6" fill="#1a2417" stroke="#7cb342" stroke-width="1.3"></rect><text x="673" y="63" fill="#bfe08f">PERFORMANCE</text><text x="673" y="75" fill="#bfe08f">EVALUATION</text>
</g>
<g stroke="#5f676e" stroke-width="1.3" marker-end="url(#df-arr)">
<line x1="100" y1="65" x2="107" y2="65"></line>
<line x1="202" y1="65" x2="209" y2="65"></line>
<line x1="310" y1="65" x2="317" y2="65"></line>
<line x1="402" y1="65" x2="409" y2="65"></line>
<line x1="514" y1="65" x2="521" y2="65"></line>
<line x1="622" y1="65" x2="629" y2="65"></line>
</g>
<text x="360" y="112" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">device characteristics · model card · layout rules supplied by ASAP7 PDK throughout</text>
</svg>

*Fig 2 — Every cell moves through the same seven stages, from problem definition to a fully characterized library entry.*

## Complementary Logic, 7.5-Track Layout

Every gate uses static CMOS: a PMOS pull-up network to VDD and a complementary NMOS pull-down network to VSS, with device bodies shorted to their respective rails to avoid static charge build-up on the FET body. For the layout, cell height is fixed at **7.5 tracks / 10 fins** — the middle ground in a real trade-off: 8-fin cells route harder and offer fewer pin access points, while 12-fin cells route easily and give a richer library but waste density. ASAP7-specific layers do the heavy lifting: **SDT** (source-drain trench) connects raised source/drain to the local interconnect layer; **LISD** and **LIG** connect source/drain and gate respectively up to M1 through a V0 via; and **gate cut** discontinues the gate poly wherever two devices must be electrically separated — any gate left uncut becomes a floating "virtual device" that quietly degrades performance.

| Gate | Devices | Fins / device | Notes |
|---|---|---|---|
| NOT | 1× PMOS, 1× NMOS | 3 | Minimum-strength inverter |
| Buffer | 2× PMOS, 2× NMOS | 12 | Two cascaded inverters |
| OR | 4× PMOS, 4× NMOS | 3 | NOR + inverter, complementary networks |
| XOR | 8× PMOS, 8× NMOS | 1 | Densest cell in the library |

## DRC and LVS Closure

**DRC** (Design Rule Check) confirms the layout respects every geometric constraint the foundry process demands — minimum width, minimum spacing, notch spacing, end-of-line spacing, and more; the rule count and complexity both grow sharply at advanced nodes. **LVS** (Layout vs. Schematic) then extracts a netlist from the finished layout's geometry and checks it against the original schematic — a clean LVS means the layout is functionally identical to the design intent. FinFET introduces a parasitic effect planar CMOS doesn't have: capacitance across the vertical fin sidewalls between gate, drain, and source. That parasitic slows rise and fall time, but also improves the device's stability — a trade-off that only shows up once real geometry, not just a schematic, is in the loop.

## Performance at 0.7 V

With layouts optimized for minimum metal usage and DRC-compliant routing, three representative gates were characterized at a 10 aF load and 0.7 V supply:

| Parameter | NOT gate | 3-input NAND | 2-input NOR |
|---|---|---|---|
| Capacitance load | 10 aF | 10 aF | 10 aF |
| Max speed | 2 GHz | 1 GHz | 1 GHz |
| Max power | 142 pW | 124 pW | 80.5 pW |
| Area | 0.0465 µm² | 0.0775 µm² | 0.0620 µm² |
| Supply voltage | 0.7 V | 0.7 V | 0.7 V |

- **Metal tracks dominate parasitic capacitance** — they're the single largest contributor to speed loss in a finished cell.
- **LISD can substitute for metal** in tight routing, trading higher resistance for the ability to close a connection where a metal track won't fit.
- **Fin count trades directly for drive strength** — more fins (or wider devices) means more current for high-load, high-speed paths, at an area cost.
- **Unused gates need a gate cut** — an uncut floating gate acts as a parasitic virtual device and measurably hurts performance.

## Where This Leads

FinFET's biggest structural advantage — gate control from three sides of the channel — is exactly what makes it suited to demanding, low-power contexts: wearables that need to last, and dense storage that needs area efficiency. The geometry is also tunable: triangular or curved fin profiles offer further control over short-channel effects, pointing toward future variants where the channel is raised entirely off the substrate. This library, and the flow used to build it, is a reusable foundation for exploring those directions at the cell level rather than the transistor level alone.
