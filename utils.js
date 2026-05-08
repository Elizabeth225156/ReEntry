//put export before everything

export let RE = 6371000; //Earth radius (m)
export let g0 = 9.81; //gravity at sea level (m/s^2)
export let rho0 = 1.225; //sea-level air density (kg/m^3)
export let H = 8400; //scale height of atmosphere (m)

export function density(h){
    return rho0 * Math.exp(-h / H);
}

export function gravity(h) {
  return g0 * Math.pow(RE / (RE + h), 2);
}

export function drag(rho, V, S, CD) {
  return 0.5 * rho * V * V * S * CD;
}

export function lift(rho, V, S, CL) {
  return 0.5 * rho * V * V * S * CL;
}

export function ballisticCoefficient(m, S, CD) {
  return m / (S * CD);
}

export function derivatives(h, s, V, gamma, m, S, CD, CL, phi) {
  let rho = density(h);
  let g   = gravity(h);
  let D   = drag(rho, V, S, CD);
  let L   = lift(rho, V, S, CL);

  //rates of change
  let dh     = V * Math.sin(gamma);
  let ds     = V * Math.cos(gamma) / (RE + h);
  let dV     = -(D / m) - g * Math.sin(gamma);
  let dGamma = (L * Math.cos(phi)) / (m * V) 
             + (V / (RE + h) - g / V) * Math.cos(gamma);

  return { dh, ds, dV, dGamma };
}

export function heatFlux(rho, V, Rn) {
  let k = 1.83e-4; //sutton-graves constant (SI units)
  return k * Math.sqrt(rho / Rn) * Math.pow(V, 3);
}

function gLoad(L, D, m) {
  return Math.sqrt(L*L + D*D) / (m * g0);
}

export function rk4Step(state, dt, m, S, CD, CL, phi) {
  let k1 = derivatives(state.h, state.s, state.V, state.gamma, m, S, CD, CL, phi);
  let k2 = derivatives(state.h + 0.5*dt*k1.dh,
                       state.s + 0.5*dt*k1.ds,
                       state.V + 0.5*dt*k1.dV,
                       state.gamma + 0.5*dt*k1.dGamma,
                       m, S, CD, CL, phi);
  let k3 = derivatives(state.h + 0.5*dt*k2.dh,
                       state.s + 0.5*dt*k2.ds,
                       state.V + 0.5*dt*k2.dV,
                       state.gamma + 0.5*dt*k2.dGamma,
                       m, S, CD, CL, phi);
  let k4 = derivatives(state.h + dt*k3.dh,
                       state.s + dt*k3.ds,
                       state.V + dt*k3.dV,
                       state.gamma + dt*k3.dGamma,
                       m, S, CD, CL, phi);

  state.h     += dt/6 * (k1.dh + 2*k2.dh + 2*k3.dh + k4.dh);
  state.s     += dt/6 * (k1.ds + 2*k2.ds + 2*k3.ds + k4.ds);
  state.V     += dt/6 * (k1.dV + 2*k2.dV + 2*k3.dV + k4.dV);
  state.gamma += dt/6 * (k1.dGamma + 2*k2.dGamma + 2*k3.dGamma + k4.dGamma);

  return state;
}