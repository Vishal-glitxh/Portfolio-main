import { ScrollSmoother } from "gsap/ScrollSmoother";

export let smoother: ScrollSmoother;

export const setSmoother = (val: ScrollSmoother) => {
  smoother = val;
};
