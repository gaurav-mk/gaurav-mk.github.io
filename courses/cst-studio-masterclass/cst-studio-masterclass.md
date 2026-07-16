# Testing in Progress, Please Ignore this section -------------------
- An ideal sine wave has a continuous and even progression of phase with time from 0° to 360° for each cycle. Actual signals, however, display a certain amount of variation from ideal phase progression over time. This phenomenon is phase jitter. Although many causes can contribute to phase jitter, one major cause is random noise, which is characterized statistically as being Gaussian (normal) in distribution.
- This phase jitter leads to the energy of the sine wave in the frequency domain spreading out, producing a continuous power spectrum. This power spectrum is usually reported as a series of values whose units are dBc/Hz at a given offset in frequency from the sine wave (carrier).
>- The value is a ratio (expressed in decibels) of the power contained within a 1 Hz bandwidth with respect to the power at the carrier frequency. For each measurement, the offset from the carrier frequency is also given.
- It is meaningful to integrate the total power contained within some interval of offset frequencies (for example, 10 kHz to 10 MHz). This is the integrated phase noise over that frequency offset interval and can be readily related to the time jitter due to the phase noise within that offset frequency interval.
- Phase noise has a detrimental effect on the performance of analog to digital converters (ADCs), digital to analog converters (DACs), and RF mixers. It lowers the achievable dynamic range of the converters and mixers, although they are affected in somewhat different ways.

![[8b10bencoding.webp]]

[[JESD204B]]

<svg viewBox="0 0 720 198" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">
<defs>
<pattern id="cg-g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="#7cb342" stroke-width="0.25" opacity="0.1"></path></pattern>
<clipPath id="cl-l"><rect x="10" y="10" width="290" height="178"></rect></clipPath>
<clipPath id="cl-r"><rect x="420" y="10" width="290" height="178"></rect></clipPath>
</defs>
<rect width="720" height="198" fill="url(#cg-g)"></rect>
<rect x="10" y="10" width="290" height="178" rx="8" fill="color-mix(in oklab,#7cb342 5%,#12161a)" stroke="#262c31" stroke-width="1"></rect>
<text x="22" y="29" font-family="Roboto Mono" font-size="8.5" fill="#5f676e" letter-spacing="0.12em">BLE ZONE</text>
<rect x="30" y="46" width="13" height="13" rx="2" fill="#7cb342"></rect><text x="36" y="40" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">GW</text>
<circle cx="36" cy="52" r="54" fill="none" stroke="#7cb342" stroke-width="0.6" stroke-dasharray="4 3" clip-path="url(#cl-l)"></circle>
<rect x="168" y="36" width="13" height="13" rx="2" fill="#7cb342"></rect><text x="174" y="30" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">GW</text>
<circle cx="174" cy="42" r="54" fill="none" stroke="#7cb342" stroke-width="0.6" stroke-dasharray="4 3" clip-path="url(#cl-l)"></circle>
<rect x="228" y="98" width="13" height="13" rx="2" fill="#7cb342"></rect><text x="234" y="92" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">GW</text>
<circle cx="234" cy="104" r="50" fill="none" stroke="#7cb342" stroke-width="0.6" stroke-dasharray="4 3" clip-path="url(#cl-l)"></circle>
<circle cx="120" cy="104" r="20" fill="color-mix(in oklab,#e0a458 8%,transparent)" stroke="#e0a458" stroke-width="1" stroke-dasharray="3 2"></circle>
<circle cx="120" cy="104" r="9" fill="none" stroke="#e0a458" stroke-width="1.5"></circle>
<circle cx="120" cy="104" r="3" fill="#e0a458"></circle>
<text x="120" y="140" text-anchor="middle" font-family="Roboto Mono" font-size="9" fill="#7cb342" font-weight="600">± 0.5 m</text>
<text x="120" y="155" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">precise fix</text>
<rect x="420" y="10" width="290" height="178" rx="8" fill="color-mix(in oklab,#e0a458 4%,#12161a)" stroke="#262c31" stroke-width="1"></rect>
<text x="432" y="29" font-family="Roboto Mono" font-size="8.5" fill="#5f676e" letter-spacing="0.12em">MIOTY ZONE</text>
<rect x="668" y="38" width="13" height="13" rx="2" fill="#e0a458"></rect><text x="674" y="32" text-anchor="middle" font-family="Roboto Mono" font-size="7" fill="#5f676e">BS</text>
<circle cx="674" cy="44" r="260" fill="none" stroke="#e0a458" stroke-width="0.6" stroke-dasharray="6 4" clip-path="url(#cl-r)"></circle>
<circle cx="555" cy="104" r="44" fill="color-mix(in oklab,#e0a458 5%,transparent)" stroke="#e0a458" stroke-width="0.7" stroke-dasharray="3 3"></circle>
<circle cx="555" cy="104" r="26" fill="color-mix(in oklab,#e0a458 9%,transparent)" stroke="#e0a458" stroke-width="1.2"></circle>
<circle cx="555" cy="104" r="3" fill="#e0a458"></circle>
<text x="555" y="162" text-anchor="middle" font-family="Roboto Mono" font-size="9" fill="#e0a458" font-weight="600">± 30 m</text>
<text x="555" y="177" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">fallback coverage</text>
<text x="360" y="92" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">degrades</text>
<text x="360" y="104" text-anchor="middle" font-family="Roboto Mono" font-size="7.5" fill="#5f676e">gracefully</text>
<line x1="316" y1="96" x2="336" y2="96" stroke="#3a4046" stroke-width="1"></line><polygon points="332,92 339,96 332,100" fill="#3a4046"></polygon>
<line x1="384" y1="96" x2="404" y2="96" stroke="#3a4046" stroke-width="1"></line><polygon points="388,92 381,96 388,100" fill="#3a4046"></polygon>
</svg>


<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" style="background:#12161a;">
<circle cx="40" cy="60" r="10" fill="#7cb342">
<animate attributeName="r" values="10;16;10" dur="1.8s" repeatCount="indefinite"></animate>
<animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite"></animate>
</circle>
<text x="40" y="90" text-anchor="middle" font-family="Roboto Mono" font-size="9" fill="#5f676e">GW pulse</text>

<g transform="translate(150,60)">
<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#e0a458" stroke-width="2">
<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite"></animateTransform>
</rect>
</g>
<text x="150" y="90" text-anchor="middle" font-family="Roboto Mono" font-size="9" fill="#5f676e">rotating gate</text>

<path id="track" d="M 220 60 L 280 60" fill="none" stroke="#3a4046" stroke-width="1"></path>
<circle r="4" fill="#7cb342">
<animateMotion dur="2s" repeatCount="indefinite" path="M 220 60 L 280 60"></animateMotion>
</circle>
<text x="250" y="90" text-anchor="middle" font-family="Roboto Mono" font-size="9" fill="#5f676e">packet motion</text>
</svg>


