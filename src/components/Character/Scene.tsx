import { useEffect, useRef, useState } from "react";
import { isLightweightLayout } from "../../hooks/useLightweightLayout";
import * as THREE from "three";
import setCharacter, { disposeObject } from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { handleMouseMove, handleTouchEnd, handleHeadRotation, handleTouchMove } from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const [status, setStatus] = useState("Loading 3D character…");
  const canvasDiv = useRef<HTMLDivElement>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;
    const lightweight = isLightweightLayout();
    const controller = new AbortController();
    let disposed = false;
    let frame = 0;
    let introTimer: ReturnType<typeof setTimeout> | undefined;
    let character: THREE.Object3D | undefined;
    let mobileRig: THREE.Group | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animations: ReturnType<typeof setAnimations> | undefined;
    let cleanupHover: (() => void) | undefined;
    const scene = new THREE.Scene();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (error) {
      console.warn("3D unavailable; continuing with the portfolio.", error);
      setStatus("3D is unavailable on this device. You can still explore the portfolio.");
      setLoading(100);
      return;
    }
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, Math.max(1, rect.height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lightweight ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = lightweight ? 1.25 : 1;
    container.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(14.5, rect.width / Math.max(1, rect.height), 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = lightweight ? 0.72 : 1.1;
    camera.updateProjectionMatrix();
    const light = setLighting(scene);
    const model = setCharacter(renderer, scene, camera);
    let head: THREE.Object3D | undefined;
    let screen: THREE.Object3D | undefined;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    const fail = (error: unknown) => {
      if (disposed) return;
      console.warn("3D unavailable; continuing with the portfolio.", error);
      controller.abort();
      setStatus("3D could not load. You can still explore the portfolio.");
      setLoading(100);
    };
    const timeout = setTimeout(() => fail(new Error("Model loading timed out")), 15000);
    const onResize = () => {
      if (character) handleResize(renderer, camera, canvasDiv);
    };
    model.loadCharacter(controller.signal).then(gltf => {
      if (disposed || controller.signal.aborted) { disposeObject(gltf.scene); return; }
      clearTimeout(timeout);
      renderer.domElement.dataset.modelStatus = "ready";
      character = gltf.scene;
      if (lightweight) {
        // Keep the monitor out of the hero portrait, as in the desktop intro.
        character.getObjectByName("Plane004")?.children.forEach(child => { child.visible = false; });
        const screenLight = character.getObjectByName("screenlight");
        if (screenLight) screenLight.visible = false;
      }
      if (lightweight) {
        mobileRig = new THREE.Group();
        mobileRig.add(character);
        scene.add(mobileRig);
      } else {
        scene.add(character);
      }
      animations = setAnimations(gltf);
      if (hoverDivRef.current) cleanupHover = animations.hover(gltf, hoverDivRef.current);
      setStatus("");
      head = character.getObjectByName("spine006");
      screen = character.getObjectByName("screenlight");
      onResize();
      setLoading(100);
      introTimer = setTimeout(() => {
        if (disposed) return;
        light.turnOnLights(lightweight);
        animations?.startIntro();
      }, lightweight ? 150 : 400);
    }).catch(fail);
    const onMouseMove = (event: MouseEvent) => handleMouseMove(event, (x, y) => { mouse = { x, y }; });
    const onTouchMove = (event: TouchEvent) => handleTouchMove(event, (x, y) => { mouse = { x, y }; });
    const onTouchEnd = () => handleTouchEnd((x, y, ix, iy) => {
      mouse = { x, y }; interpolation = { x: ix, y: iy };
    });
    const landing = document.getElementById("landingDiv");
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    landing?.addEventListener("touchmove", onTouchMove, { passive: true });
    landing?.addEventListener("touchend", onTouchEnd);
    const clock = new THREE.Clock();
    let visible = true;
    let lastFrame = 0;
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
    observer.observe(container);
    const animate = (now = 0) => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      if (!visible || document.hidden || (lightweight && now - lastFrame < 1000 / 30)) return;
      lastFrame = now;
      if (mobileRig && !reducedMotion) {
        mobileRig.rotation.y = Math.sin(now * 0.0007) * 0.065;
        mobileRig.position.y = Math.sin(now * 0.0014) * 0.025;
      }
      if (head) handleHeadRotation(head, mouse.x, mouse.y, interpolation.x, interpolation.y, THREE.MathUtils.lerp);
      if (screen) light.setPointLight(screen);
      animations?.mixer.update(Math.min(clock.getDelta(), 0.05));
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      disposed = true;
      controller.abort();
      cancelAnimationFrame(frame);
      observer.disconnect();
      clearTimeout(timeout);
      clearTimeout(introTimer);
      cleanupHover?.();
      animations?.dispose();
      model.dispose();
      light.dispose();
      disposeObject(scene);
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      landing?.removeEventListener("touchmove", onTouchMove);
      landing?.removeEventListener("touchend", onTouchEnd);
    };
  }, [setLoading]);

  return <div className="character-container"><div className="character-model" ref={canvasDiv}>
    {status && <p className="character-status" role="status">{status}</p>}
    <div className="character-rim" /><div className="character-hover" ref={hoverDivRef} />
  </div></div>;
};
export default Scene;
