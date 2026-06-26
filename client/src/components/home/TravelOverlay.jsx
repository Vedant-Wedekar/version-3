import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PlaneGLB } from "../three/Models";

/* ------------------------------------------------------------------ */
/* Coordinate helpers — island {x,y} percentages -> 3D world space     */
/* World space: x 0..100 (left->right), y 0..100 (bottom->top)         */
/* ------------------------------------------------------------------ */

const toWorld = (p) => new THREE.Vector3(p.x, 100 - p.y, 0);

function buildCurve(from, to) {
  const a = toWorld(from);
  const b = toWorld(to);
  const dir = new THREE.Vector3().subVectors(b, a);
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

  const perp = new THREE.Vector3(-dir.y, dir.x, 0).normalize();
  const side = from.x <= to.x ? 1 : -1;
  const bulge = Math.min(dir.length() * 0.3, 16);
  mid.add(perp.multiplyScalar(bulge * side));

  return { curve: new THREE.QuadraticBezierCurve3(a, mid, b), side, mid };
}

/** SVG path (0-100 map space) matching the exact curve the vehicle flies. */
export function routeSvgPath(from, to) {
  const { mid } = buildCurve(from, to);
  return `M ${from.x} ${from.y} Q ${mid.x} ${100 - mid.y} ${to.x} ${to.y}`;
}

const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/* ------------------------------------------------------------------ */
/* Camera — locks the frustum to the 0..100 map space. Exported.       */
/* ------------------------------------------------------------------ */

export function MapCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.left = 0;
    camera.right = 100;
    camera.top = 100;
    camera.bottom = 0;
    camera.near = 0.1;
    camera.far = 200;
    camera.position.set(0, 0, 60);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Low-poly fallbacks — shown for the instant before the GLB loads     */
/* ------------------------------------------------------------------ */

export function PlaneModel({ propRef }) {
  return (
    <group>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <capsuleGeometry args={[0.85, 4, 6, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>
      <mesh position={[3.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.8, 1.4, 12]} />
        <meshStandardMaterial color="#0f766e" roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0, 0.35]}>
        <boxGeometry args={[1.7, 9.5, 0.18]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.4} />
      </mesh>
      <mesh position={[-2.5, 0, 0.25]}>
        <boxGeometry args={[1, 3.4, 0.14]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.4} />
      </mesh>
      <mesh position={[-2.6, 0, 0.8]}>
        <boxGeometry args={[0.9, 0.16, 1.3]} />
        <meshStandardMaterial color="#0f766e" />
      </mesh>
      <group ref={propRef} position={[3.9, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 2.8, 0.28]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>
    </group>
  );
}

export function BoatModel() {
  return (
    <group>
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[3.6, 1.7, 0.9]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>
      <mesh position={[1.9, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.85, 1.6, 4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>
      <mesh position={[-0.3, 0, 0.2]}>
        <boxGeometry args={[3.65, 1.75, 0.22]} />
        <meshStandardMaterial color="#0f766e" />
      </mesh>
      <mesh position={[-0.4, 0, 0.85]}>
        <boxGeometry args={[1.5, 1.2, 0.8]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0, 0.85]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.08, 1.1, 0.7]} />
        <meshStandardMaterial color="#67e8f9" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[-0.5, 0, 1.35]}>
        <boxGeometry args={[1.9, 1.4, 0.12]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The moving vehicle — travels the curve, then reports arrival        */
/* ------------------------------------------------------------------ */

function Vehicle({ flight, onArrive }) {
  const group = useRef();
  const shadow = useRef();
  const prop = useRef();
  const tRef = useRef(0);
  const doneRef = useRef(false);

  const { curve, side } = useMemo(
    () => buildCurve(flight.from, flight.to),
    [flight]
  );

  const isPlane = flight.type === "plane";

  useFrame((_, delta) => {
    if (doneRef.current || !group.current) return;

    tRef.current = Math.min(tRef.current + delta / flight.duration, 1);
    const e = easeInOut(tRef.current);

    const pos = curve.getPoint(e);
    const tan = curve.getTangent(e);
    const heading = Math.atan2(tan.y, tan.x);

    const g = group.current;
    g.rotation.order = "ZYX";

    if (isPlane) {
      const alt = Math.sin(Math.PI * e);
      g.position.set(pos.x, pos.y, 6 + alt * 5);
      g.rotation.z = heading;
      g.rotation.x = alt * 0.55 * -side;
      g.scale.setScalar(0.5 + alt * 0.28);
      if (prop.current) prop.current.rotation.x += delta * 40;

      if (shadow.current) {
        shadow.current.position.set(pos.x + alt * 2.4, pos.y - alt * 2.8, 1);
        shadow.current.scale.setScalar(Math.max(1 - alt * 0.45, 0.2));
        shadow.current.material.opacity = Math.max(0.22 - alt * 0.12, 0.04);
      }
    } else {
      g.position.set(pos.x, pos.y, 5);
      g.rotation.z = heading;
      g.rotation.x = Math.sin(e * Math.PI * 5) * 0.08;
      g.rotation.y = Math.sin(e * Math.PI * 7) * 0.06;
      g.scale.setScalar(0.52);
      if (shadow.current) {
        shadow.current.position.set(pos.x + 0.5, pos.y - 0.6, 1);
        shadow.current.scale.setScalar(0.9);
        shadow.current.material.opacity = 0.18;
      }
    }

    if (tRef.current >= 1 && !doneRef.current) {
      doneRef.current = true;
      onArrive();
    }
  });

  return (
    <>
      <mesh ref={shadow} position={[-50, -50, 1]}>
        <circleGeometry args={[isPlane ? 2 : 1.6, 24]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0} />
      </mesh>

      <group ref={group} position={[-50, -50, 5]}>
        {isPlane ? (
          // Real Eclipse jet; primitive fallback for the first frames
          <Suspense fallback={<PlaneModel propRef={prop} />}>
            <PlaneGLB />
          </Suspense>
        ) : (
          <BoatModel />
        )}
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public overlay — transparent canvas pinned over the map             */
/* ------------------------------------------------------------------ */

export default function TravelOverlay({ flight, onArrive }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <Canvas
        orthographic
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <MapCamera />
        <ambientLight intensity={1} />
        <hemisphereLight intensity={0.5} groundColor="#bae6fd" />
        <directionalLight position={[30, 40, 80]} intensity={1.4} />
        <directionalLight position={[-20, -10, 40]} intensity={0.35} />
        {flight && (
          <Vehicle key={flight.key} flight={flight} onArrive={onArrive} />
        )}
      </Canvas>
    </div>
  );
}
