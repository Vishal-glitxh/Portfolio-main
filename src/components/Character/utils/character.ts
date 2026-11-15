import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { decryptFile } from "./decrypt";

export const disposeObject = (object: THREE.Object3D) => {
  object.traverse(child => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach(material => {
      Object.values(material).forEach(value => {
        if (value instanceof THREE.Texture) value.dispose();
      });
      material.dispose();
    });
  });
};

const setCharacter = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (signal: AbortSignal) => {
    const data = await decryptFile("/models/character.enc", "MyCharacter12", signal);
    signal.throwIfAborted();
    const gltf = await loader.parseAsync(data, "");
    try {
      signal.throwIfAborted();
      await renderer.compileAsync(gltf.scene, camera, scene);
      signal.throwIfAborted();
      gltf.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = true;
        }
      });
      for (const name of ["footR", "footL"]) {
        const foot = gltf.scene.getObjectByName(name);
        if (foot) foot.position.y = 3.36;
      }
      return gltf;
    } catch (error) {
      disposeObject(gltf.scene);
      throw error;
    } finally {
      dracoLoader.dispose();
    }
  };
  return { loadCharacter, dispose: () => dracoLoader.dispose() };
};
export default setCharacter;
