# Overview
## JESD204B Standard at a Glance
- A standardized serial interface between data converters (ADCs and DACs) and logic devices.(FPGAs or ASICs)
- Serial data rates up to 12.5 Gbps.
- Mechanism to achieve deterministic latency across the serial link.
- Uses [[8b-10b Encoding|8b/10b encoding]] for serdes synchronization, clock recovery and DC balance.
- JESD204B is a must for [[High density System|high density systems]].
## Benefits / Cost
- Reduced/simplified PCB area
	![[Pasted image 20260715163443.png]]
- Reduced package size
	![[Pasted image 20260715163823.png]] ![[Pasted image 20260715163905.png]]
- Comparable power for large throughput
- Scalable to higher frequencies 
- Simplified interface timing
- Standard interface 


## Timing Signals
## Layers Overview (Transport, Link, Physical)
## Deterministic Latency
## Subclasses 