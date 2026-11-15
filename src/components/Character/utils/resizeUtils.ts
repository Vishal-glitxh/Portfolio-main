import * as THREE from "three";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>
) {
  if (!canvasDiv.current) return;
  const { width, height } = canvasDiv.current.getBoundingClientRect();
  if (width <= 0 || height <= 0) return;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
