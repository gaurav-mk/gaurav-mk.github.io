> [!abstract] About these notes
> Notes for the CST Antenna Design, FSS and RFID Simulation Masterclass, with one note per course section.

## 0.1 Course Sections
> [!grid]
> > [!info] Section 1
> > **[[1. Getting Started and Antenna Fundamentals|Getting Started and Antenna Fundamentals]]**
> >
> > CST basics, S-parameters, S11, VSWR, gain, RCS and bandwidth.
>
> > [!tip] Section 2
> > **[[2. Antenna Shape Design|Antenna Shape Design]]**
> >
> > Bricks, cylinders, parameters, Boolean operations, copies, slots and holes.
>
> > [!example] Section 3
> > **[[3. Patch Antenna Design|Patch Antenna Design]]**
> >
> > Building a patch antenna, simulating it, reading S11 and gain, and tuning it with sweeps.
>
> > [!note] Section 4
> > **[[4. Equation Based Antenna Design|Equation Based Antenna Design]]**
> >
> > Patch design equations, tuning a 13 GHz patch with sweeps, VSWR and efficiency.
>
> > [!warning] Section 5
> > **[[5. Bandstop FSS Design|Bandstop FSS Design]]**
> >
> > What an FSS is, the unit cell, the full sheet, sweeps and angle of incidence.
>
> > [!info] Section 6
> > **[[6. Bandpass FSS Design|Bandpass FSS Design]]**
> >
> > A double-sided loop and patch cell, the passband, sweeps and angle stability.
>
> > [!tip] Section 7
> > **[[7. Wideband FSS Design|Wideband FSS Design]]**
> >
> > Two different patterns merge into one wide stop band, plus a comparison of all three FSS designs.
>
> > [!example] Section 8
> > **[[8. Chipless RFID Fundamentals|Chipless RFID Fundamentals]]**
> >
> > RFID basics, how notches store bits, a 7-bit tag, RCS simulation, angle and polarization.
>
> > [!info] Section 9
> > **[[9. Chipless RFID Unit Cell Design|Chipless RFID Unit Cell Design]]**
> >
> > A 5-bit tag of nested square rings, ring coordinates, solver accuracy and polarization.
>
> > [!warning] Section 10
> > **[[10. Dual Polarized RFID Tag|Dual Polarized RFID Tag]]**
> >
> > Straight slots, slot length encoding, true dual polarization, and all three tags compared.
>
> > [!abstract] Section 11
> > **[[11. Patch Antenna Fundamentals|Patch Antenna Fundamentals]]**
> >
> > How a patch radiates, feeds, impedance matching, inset feeds and waveguide ports.
>
> > [!tip] Section 12
> > **[[12. Patch Antenna Without Insets|Patch Antenna Without Insets]]**
> >
> > Why a dip on target can be the wrong resonance, shown by the lecture's own numbers.
>
> > [!warning] Section 13
> > **[[13. Coaxial Fed Patch Antenna|Coaxial Fed Patch Antenna]]**
> >
> > These videos repeat Section 12, so this note only points to the right places.
>
> > [!note] Section 14
> > **[[14. Circular Patch Antenna|Circular Patch Antenna]]**
> >
> > Radius and resonance, an inset slot, a hand-sized port, and a comparison with the rectangular patch.
>
> > [!example] Section 15
> > **[[15. Monopole Antenna|Monopole Antenna]]**
> >
> > Mirror images, types of monopole, the doughnut pattern, partial ground, and tuning the height.
>
> > [!info] Section 16
> > **[[16. Wideband Monopole Antenna|Wideband Monopole Antenna]]**
> >
> > A printed monopole with partial ground, 72% bandwidth, and narrowband vs wideband.
>
> > [!warning] Section 17
> > **[[17. UWB Monopole Antenna|UWB Monopole Antenna]]**
> >
> > Defected ground, a band of nearly 6:1, how the pattern changes, and three monopoles compared.
>
> > [!tip] Section 18
> > **[[18. Rectangular Wideband Monopole Antenna|Rectangular Wideband Monopole]]**
> >
> > Four design steps with stubs and slots, and what each change really does.
>
> > [!abstract] Section 19
> > **[[19. Dipole Antenna|Dipole Antenna]]**
> >
> > Current and voltage on the arms, types of dipole, 73 Ω vs 50 Ω, and one-step tuning.
>
> > [!info] Section 20
> > **[[20. Microstrip Fed Folded Dipole Antenna|Microstrip Fed Folded Dipole]]**
> >
> > One line feeding two arms, monopole to dipole, bent vs folded, and a GSM version.
>
> > [!warning] Section 21
> > **[[21. Dual Band Dipole Antenna|Dual Band Dipole Antenna]]**
> >
> > A stacked parallel-strip feed, two WLAN bands, what each part tunes, and a missed target.
>
> > [!tip] Section 22
> > **[[22. Semi Elliptical Wideband Folded Dipole|Semi Elliptical Folded Dipole]]**
> >
> > Petal arms, a microstrip-to-slot feed, and a slot missing from the lecture's model.
>
> > [!abstract] Section 23
> > **[[23. Yagi Uda Antenna|Yagi Uda Antenna]]**
> >
> > Parasitic elements, 6 and 10 element models, tuning with a scale factor, and what it costs.
>
> > [!info] Section 24
> > **[[24. Printed Quasi Yagi Antenna|Printed Quasi Yagi Antenna]]**
> >
> > Printed monopoles on a ground edge, no balun, and why S11 alone can't prove a Yagi works.
>
> > [!warning] Section 25
> > **[[25. Printed Yagi Antenna|Printed Yagi Antenna]]**
> >
> > One strip as feed return and reflector, a via feed, and reading the right pattern cut.
>
> > [!tip] Section 26
> > **[[26. Wideband Quasi Yagi Antenna|Wideband Quasi Yagi Antenna]]**
> >
> > The ground edge as reflector, a microstrip-to-slot feed, and all four Yagis compared.
>
> > [!abstract] Section 27
> > **[[27. Rectangular Loop Antenna|Rectangular Loop Antenna]]**
> >
> > Small vs one-wavelength loops, patterns, and why the match stops at -7 dB.
>
> > [!info] Section 28
> > **[[28. Circular Loop Antenna|Circular Loop Antenna]]**
> >
> > Sizing a ring from its circumference, a radius sweep, and square vs circle.
>
> > [!warning] Section 29
> > **[[29. Multiple Ring Loop Antenna|Multiple Ring Loop Antenna]]**
> >
> > One fed ring, two parasitic rings, a better match, and the three loops compared.
>
> > [!tip] Section 30
> > **[[30. Rectangular Wire Loop Antenna|Rectangular Wire Loop Antenna]]**
> >
> > Titled capacitive loading, but a plain wire loop: what loading is, and a perimeter rule.
>
> > [!abstract] Section 31
> > **[[31. Compact Planar Loop Dipole Antenna|Compact Planar Loop Dipole]]**
> >
> > A dipole and loop coupled through the board, a one-sided beam, and two bands, not one.
>
> > [!info] Section 32
> > **[[32. Dual Fed Circularly Polarized Loop Antenna|Dual Fed CP Loop Antenna]]**
> >
> > What circular polarization needs, three design steps, and what was never tested.
>
> > [!warning] Section 33
> > **[[33. Printed Loop Antenna with LCD Frame|Printed Loop with LCD Frame]]**
> >
> > The frame as part of the antenna, a U-shaped element, and a loop that never reaches ground.
>
> > [!tip] Section 34
> > **[[34. Dual Band Dipole Antenna for WLAN|Dual Band Dipole for WLAN]]**
> >
> > These videos repeat Section 21, so this note only maps them.
>
> > [!abstract] Section 35
> > **[[35. Semi Elliptical Wideband Antenna|Semi Elliptical Wideband Antenna]]**
> >
> > These videos repeat Section 22, so this note only maps them.

## 0.2 Reference
- [[Shortcuts]]: every keyboard shortcut used in the course.
