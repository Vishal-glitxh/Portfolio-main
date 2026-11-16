import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xfcdfac, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xefb85c, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  let disposed = false;
  let environment: THREE.Texture | undefined;
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      if (disposed) { texture.dispose(); return; }
      environment = texture;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: THREE.Object3D) {
    const mesh = screenLight as THREE.Mesh;
    const material = mesh.material as THREE.MeshStandardMaterial;
    if (material && material.opacity > 0.9) {
      pointLight.intensity = material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights(lightweight = false) {
    gsap.to(scene, {
      environmentIntensity: lightweight ? 0.9 : 0.64,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: lightweight ? 1.3 : 1,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights, dispose: () => {
    disposed = true;
    gsap.killTweensOf([scene, directionalLight, ".character-rim"]);
    environment?.dispose();
    scene.environment = null;
    directionalLight.dispose();
    pointLight.dispose();
  } };
};

export default setLighting;
