import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return decryptFile("/models/character.enc", "MyCharacter12")
      .then((encryptedBlob) => {
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
        return new Promise<GLTF | null>((resolve, reject) => {
          loader.load(
            blobUrl,
            (gltf) => {
              const character = gltf.scene;
              renderer.compileAsync(character, camera, scene).then(() => {
                character.traverse((child) => {
                  if (child.name === "Mesh") {
                    // child is Object3D
                  }
                  if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.frustumCulled = true;
                  }
                });
                resolve(gltf);
                setCharTimeline(character, camera);
                setAllTimeline();
                const footR = character.getObjectByName("footR");
                const footL = character.getObjectByName("footL");
                if (footR) footR.position.y = 3.36;
                if (footL) footL.position.y = 3.36;
                dracoLoader.dispose();
              }).catch((err) => {
                reject(err);
              });
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        });
      });
  };

  return { loadCharacter };
};

export default setCharacter;
