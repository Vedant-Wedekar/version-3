import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Real 3D models (GLB) — served from client/public/models/            */
/* ------------------------------------------------------------------ */

const PLANE_URL = "/models/plane.glb";
const CLOUD_URL = "/models/cloud.glb";

/* ------------------------------------------------------------------ */
/* TUNING KNOBS — adjust these if a model faces the wrong way.         */
/*                                                                     */
/* Our world is viewed top-down: the camera looks straight down at     */
/* the XY plane, and vehicles must point their nose toward +X.         */
/*                                                                     */
/*  layFlat : rotates the model so its top faces the camera.           */
/*            Plane looks side-on / edge-on?  ->  try -Math.PI / 2     */
/*  heading : spins the model so the nose points +X.                   */
/*            Flying backwards?  ->  add or subtract Math.PI           */
/*            Flying sideways?   ->  add or subtract Math.PI / 2       */
/*  length  : size in world units (the map is 100 units wide)          */
/* ------------------------------------------------------------------ */

export const PLANE_TUNE = {
  layFlat: Math.PI / 2,
  heading: Math.PI / 2,
  length: 7.5,
};

export const CLOUD_TUNE = {
  layFlat: Math.PI / 2,
  heading: 0,
  length: 11,
};

/* Loads a GLB once (cached by URL), clones it, centers it at the      */
/* origin, and scales its longest side to `length` world units.        */
function useNormalized(url, length) {
  const gltf = useLoader(GLTFLoader, url);
  return useMemo(() => {
    const scene = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxLen = Math.max(size.x, size.y, size.z) || 1;

    scene.position.sub(center);
    const root = new THREE.Group();
    root.add(scene);
    root.scale.setScalar(length / maxLen);
    return root;
  }, [gltf, length]);
}

/* The real Eclipse jet. Must be rendered inside <Suspense>.           */
export function PlaneGLB() {
  const obj = useNormalized(PLANE_URL, PLANE_TUNE.length);
  return (
    <group rotation={[0, 0, PLANE_TUNE.heading]}>
      <group rotation={[PLANE_TUNE.layFlat, 0, 0]}>
        <primitive object={obj} />
      </group>
    </group>
  );
}

/* The volumetric cloud. Must be rendered inside <Suspense>.           */
export function CloudGLB({ scale = 1 }) {
  const obj = useNormalized(CLOUD_URL, CLOUD_TUNE.length * scale);
  return (
    <group rotation={[0, 0, CLOUD_TUNE.heading]}>
      <group rotation={[CLOUD_TUNE.layFlat, 0, 0]}>
        <primitive object={obj} />
      </group>
    </group>
  );
}
