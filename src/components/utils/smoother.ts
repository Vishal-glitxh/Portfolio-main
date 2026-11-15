import { ScrollSmoother } from "gsap/ScrollSmoother";

export let smoother: ScrollSmoother | undefined;

export const setSmoother = (val: ScrollSmoother | undefined) => {
  smoother = val;
};
