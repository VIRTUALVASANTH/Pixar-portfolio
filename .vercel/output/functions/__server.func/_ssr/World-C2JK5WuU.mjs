import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, t as useCursor } from "../_libs/react+react-three__drei.mjs";
import { A as RepeatWrapping, C as MeshBasicMaterial, D as Object3D, T as MeshStandardMaterial, U as require_jsx_runtime, b as MathUtils, d as Color, i as useThree, j as SRGBColorSpace, l as CanvasTexture, r as useFrame, t as Canvas, u as ClampToEdgeWrapping, z as Vector3 } from "../_libs/@react-three/fiber+[...].mjs";
import { i as useWorld, n as play, r as BOOKS } from "./routes-DCVEtJCA.mjs";
import { i as Vignette, n as EffectComposer, r as Noise, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/World-C2JK5WuU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var POSES = {
	door: {
		pos: [
			0,
			1.5,
			4.72
		],
		look: [
			0,
			1.28,
			2.55
		]
	},
	overview: {
		pos: [
			.1,
			1.62,
			2.12
		],
		look: [
			.04,
			1.08,
			-1.45
		]
	},
	bookshelf: {
		pos: [
			-.45,
			1.48,
			.35
		],
		look: [
			-3.05,
			1.32,
			-1.15
		]
	},
	desk: {
		pos: [
			.55,
			1.38,
			.75
		],
		look: [
			2.65,
			1.12,
			-.95
		]
	},
	window: {
		pos: [
			.04,
			1.32,
			.7
		],
		look: [
			.1,
			1.42,
			-2.45
		]
	},
	bed: {
		pos: [
			.15,
			1.28,
			1.45
		],
		look: [
			-2,
			.72,
			.15
		]
	}
};
function poseFor(phase, focus) {
	if (phase === "boot" || phase === "door") return POSES.door;
	return POSES[focus];
}
function CameraRig() {
	const { camera } = useThree();
	const focus = useWorld((s) => s.focus);
	const phase = useWorld((s) => s.phase);
	const reduceMotion = useWorld((s) => s.reduceMotion);
	const look = (0, import_react.useRef)(new Vector3(0, 1.28, 2.55));
	const base = (0, import_react.useRef)(new Vector3(0, 1.5, 4.72));
	const tweening = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const pose = poseFor(phase, focus);
		const duration = reduceMotion ? .25 : phase === "entering" ? 3.4 : 2.35;
		tweening.current = true;
		useWorld.getState().setTransitioning(true);
		const tl = gsapWithCSS.timeline({ onComplete: () => {
			tweening.current = false;
			base.current.set(pose.pos[0], pose.pos[1], pose.pos[2]);
			useWorld.getState().setTransitioning(false);
			if (phase === "entering") {
				useWorld.getState().setPhase("room");
				window.setTimeout(() => useWorld.getState().setIntroTitle(false), 2800);
			}
		} });
		tl.to(camera.position, {
			x: pose.pos[0],
			y: pose.pos[1],
			z: pose.pos[2],
			duration,
			ease: "power3.inOut"
		}, 0);
		tl.to(look.current, {
			x: pose.look[0],
			y: pose.look[1],
			z: pose.look[2],
			duration,
			ease: "power3.inOut"
		}, 0);
		return () => {
			tl.kill();
		};
	}, [
		camera,
		focus,
		phase,
		reduceMotion
	]);
	useFrame((state, delta) => {
		const d = Math.min(delta, .1);
		camera.lookAt(look.current);
		if (tweening.current) return;
		if (useWorld.getState().openBook || useWorld.getState().desktopOpen) return;
		const px = state.pointer.x * .14;
		const py = state.pointer.y * .07;
		camera.position.x = MathUtils.damp(camera.position.x, base.current.x + px, 1.6, d);
		camera.position.y = MathUtils.damp(camera.position.y, base.current.y + py + Math.sin(state.clock.elapsedTime * .4) * .012, 1.6, d);
	});
	return null;
}
var cache = null;
function canvas(w, h) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	return {
		c,
		ctx: c.getContext("2d")
	};
}
function toTex(c, rx = 1, ry = 1) {
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(rx, ry);
	t.anisotropy = 4;
	t.needsUpdate = true;
	return t;
}
function wood(w, h, base, grain, planks) {
	const { c, ctx } = canvas(w, h);
	ctx.fillStyle = base;
	ctx.fillRect(0, 0, w, h);
	const ph = h / planks;
	for (let p = 0; p < planks; p++) {
		ctx.globalAlpha = .18 + p % 3 * .06;
		ctx.fillStyle = grain;
		ctx.fillRect(0, p * ph, w, ph - 3);
		ctx.globalAlpha = .45;
		ctx.fillStyle = "#2a160c";
		ctx.fillRect(0, (p + 1) * ph - 3, w, 3);
	}
	ctx.globalAlpha = .12;
	ctx.strokeStyle = grain;
	ctx.lineWidth = 1;
	for (let i = 0; i < 12; i++) {
		ctx.beginPath();
		ctx.moveTo(0, (i + .3) / 12 * h);
		ctx.lineTo(w, (i + .7) / 12 * h);
		ctx.stroke();
	}
	ctx.globalAlpha = 1;
	return c;
}
function plaid(w, h) {
	const { c, ctx } = canvas(w, h);
	ctx.fillStyle = "#6b3a28";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#2c4a38";
	for (let i = 0; i < w; i += 32) {
		ctx.fillRect(i, 0, 10, h);
		ctx.fillRect(0, i, w, 10);
	}
	ctx.fillStyle = "#c4a574";
	for (let i = 16; i < w; i += 32) {
		ctx.fillRect(i, 0, 3, h);
		ctx.fillRect(0, i, w, 3);
	}
	return c;
}
function poster(kind) {
	const { c, ctx } = canvas(128, 176);
	const [a, b] = {
		peak: ["#1b3a4a", "#e8b86d"],
		forest: ["#163028", "#7da080"],
		dusk: ["#4a2040", "#e07a4a"]
	}[kind];
	const g = ctx.createLinearGradient(0, 0, 0, 176);
	g.addColorStop(0, a);
	g.addColorStop(1, b);
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 128, 176);
	ctx.fillStyle = "#1a120c";
	ctx.beginPath();
	ctx.moveTo(0, 176);
	ctx.lineTo(0, 110);
	ctx.lineTo(64, kind === "peak" ? 50 : 90);
	ctx.lineTo(128, 110);
	ctx.lineTo(128, 176);
	ctx.fill();
	ctx.strokeStyle = "#f4e6c8";
	ctx.lineWidth = 6;
	ctx.strokeRect(8, 8, 112, 160);
	return c;
}
function screen() {
	const { c, ctx } = canvas(256, 160);
	const g = ctx.createRadialGradient(180, 40, 10, 128, 80, 180);
	g.addColorStop(0, "#c4843a");
	g.addColorStop(1, "#1a120c");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 256, 160);
	ctx.fillStyle = "#f4e6c8";
	ctx.font = "bold 48px Georgia, serif";
	ctx.textAlign = "center";
	ctx.fillText("V", 128, 88);
	ctx.font = "12px sans-serif";
	ctx.fillText("VASANTH OS", 128, 112);
	ctx.fillStyle = "#c4843a";
	ctx.fillRect(0, 140, 256, 20);
	return c;
}
function bookCover(title, color, accent) {
	const { c, ctx } = canvas(128, 192);
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 128, 192);
	ctx.strokeStyle = accent;
	ctx.lineWidth = 4;
	ctx.strokeRect(10, 10, 108, 172);
	ctx.fillStyle = accent;
	ctx.font = "600 16px Georgia, serif";
	ctx.textAlign = "center";
	title.split(" ").forEach((w, i) => ctx.fillText(w, 64, 90 + i * 22));
	return c;
}
function getTextures() {
	if (cache) return cache;
	const floor = toTex(wood(128, 128, "#8a5a32", "#d8b07a", 8), 8, 6);
	const furniture = toTex(wood(128, 128, "#6b4428", "#c4a06a", 6), 2, 2);
	const blanket = toTex(plaid(128, 128), 2, 2);
	const peak = toTex(poster("peak"));
	const forest = toTex(poster("forest"));
	const dusk = toTex(poster("dusk"));
	peak.wrapS = peak.wrapT = ClampToEdgeWrapping;
	forest.wrapS = forest.wrapT = ClampToEdgeWrapping;
	dusk.wrapS = dusk.wrapT = ClampToEdgeWrapping;
	const scr = toTex(screen());
	scr.wrapS = scr.wrapT = ClampToEdgeWrapping;
	cache = {
		floor,
		furniture,
		blanket,
		posterPeak: peak,
		posterForest: forest,
		posterDusk: dusk,
		screen0: scr
	};
	return cache;
}
function makeBookTexture(title, color, accent) {
	const t = toTex(bookCover(title, color, accent));
	t.wrapS = t.wrapT = ClampToEdgeWrapping;
	return t;
}
var HW = 3.55;
var HD = 2.72;
var H = 2.7;
function Scene() {
	const t = (0, import_react.useMemo)(() => getTextures(), []);
	const mats = (0, import_react.useMemo)(() => {
		return {
			floor: new MeshStandardMaterial({
				map: t.floor,
				roughness: .38,
				metalness: .04
			}),
			wood: new MeshStandardMaterial({
				map: t.furniture,
				roughness: .5
			}),
			wall: new MeshStandardMaterial({
				color: "#e8dcc8",
				roughness: .92
			}),
			ceiling: new MeshStandardMaterial({
				color: "#d8cbb6",
				roughness: 1
			}),
			blanket: new MeshStandardMaterial({
				map: t.blanket,
				roughness: .8
			}),
			throwM: new MeshStandardMaterial({
				color: "#2f4a38",
				roughness: .82
			}),
			pillow: new MeshStandardMaterial({
				color: "#e8dcc8",
				roughness: .8
			}),
			rug: new MeshStandardMaterial({
				color: "#6a3d2a",
				roughness: .9
			}),
			curtain: new MeshStandardMaterial({
				color: "#efe6d4",
				roughness: .85,
				side: 2
			}),
			leather: new MeshStandardMaterial({
				color: "#3a2418",
				roughness: .7
			}),
			door: new MeshStandardMaterial({
				color: "#6b4423",
				roughness: .48,
				emissive: "#4a3018",
				emissiveIntensity: .28
			}),
			plaster: new MeshStandardMaterial({
				color: "#d8c4a4",
				roughness: .85
			}),
			dark: new MeshStandardMaterial({
				color: "#1a1612",
				roughness: .4
			}),
			leaf: new MeshStandardMaterial({
				color: "#2f4a38",
				roughness: .7
			}),
			pot: new MeshStandardMaterial({
				color: "#6b3a24",
				roughness: .8
			}),
			metal: new MeshStandardMaterial({
				color: "#c9a36a",
				metalness: .7,
				roughness: .25
			})
		};
	}, [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				0,
				0
			],
			receiveShadow: true,
			material: mats.floor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [7.5, 5.840000000000001] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				H / 2,
				-2.72
			],
			receiveShadow: true,
			material: mats.wall,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				HW * 2,
				H,
				.12
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-3.55,
				H / 2,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			receiveShadow: true,
			material: mats.wall,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				HD * 2,
				H,
				.12
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				HW,
				H / 2,
				0
			],
			rotation: [
				0,
				-Math.PI / 2,
				0
			],
			receiveShadow: true,
			material: mats.wall,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				HD * 2,
				H,
				.12
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				H,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: mats.ceiling,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [HW * 2, HD * 2] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, { mats }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowWall, { mats }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bed, { mats }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookshelf, { mats }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {
			mats,
			t
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plants, { mats }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				.15,
				.02,
				.15
			],
			receiveShadow: true,
			material: mats.rug,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.6,
				.03,
				1.7
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Posters, { t })
	] });
}
function Atmosphere() {
	const mood = useWorld((s) => s.mood);
	const lampOn = useWorld((s) => s.lampOn);
	const rain = useWorld((s) => s.rain);
	const night = mood === "night";
	const storm = mood === "storm" || rain;
	const sun = night ? .2 : storm ? .9 : 3.6;
	const fog = night ? "#07080d" : storm ? "#161820" : "#1c140f";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: [fog]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				fog,
				8,
				20
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			night ? "#1a2238" : "#f0d2a0",
			"#3a2418",
			night ? .25 : .65
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: night ? .2 : .42,
			color: night ? "#6a7aaa" : "#ffd8a8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				1.2,
				2.5,
				-4.6
			],
			intensity: sun,
			color: storm ? "#9aa4b8" : "#ffd19a",
			castShadow: useWorld.getState().quality === "high"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				1.55,
				4.15
			],
			intensity: 2.2,
			color: "#f0c98a",
			distance: 6,
			decay: 2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				1.8,
				.3
			],
			intensity: .7,
			color: "#f0d2a0",
			distance: 6,
			decay: 2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-2.15,
				1.18,
				-1.42
			],
			intensity: lampOn ? night ? 2.2 : .9 : 0,
			color: "#ffb060",
			distance: 4.2,
			decay: 2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				2.7,
				1.15,
				-1.1
			],
			intensity: night ? 1 : .4,
			color: "#6ec8ff",
			distance: 3,
			decay: 2
		}),
		!night && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GodRays, { storm })
	] });
}
function GodRays({ storm }) {
	const mat = (0, import_react.useMemo)(() => new MeshBasicMaterial({
		color: storm ? "#c5d0e0" : "#ffd7a0",
		transparent: true,
		opacity: .045,
		depthWrite: false,
		blending: 2,
		side: 2
	}), [storm]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			.15,
			1.55,
			-2.15
		],
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				.18,
				(i - 1) * .1,
				0
			],
			position: [
				0,
				-.1,
				.7 + i * .25
			],
			material: mat,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.3 + i * .15, 2.4] })
		}, i))
	});
}
function Door({ mats }) {
	const group = (0, import_react.useRef)(null);
	const handle = (0, import_react.useRef)(null);
	const phase = useWorld((s) => s.phase);
	const doorOpen = useWorld((s) => s.doorOpen);
	const hovered = useWorld((s) => s.hovered) === "door";
	useCursor(hovered && phase === "door");
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		if (!group.current) return;
		group.current.rotation.y = MathUtils.damp(group.current.rotation.y, doorOpen ? -1.18 : 0, 1.4, d);
		if (handle.current) handle.current.rotation.z = MathUtils.damp(handle.current.rotation.z, doorOpen ? -1.1 : 0, 3.2, d);
	});
	const onDoor = () => {
		if (useWorld.getState().phase !== "door") return;
		play("creak", { rate: .9 });
		play("whoosh");
		useWorld.getState().openTheDoor();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			0,
			2.66
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-1.2,
					1.35,
					1.15
				],
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.1,
					2.7,
					2.3
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					1.2,
					1.35,
					1.15
				],
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.1,
					2.7,
					2.3
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					2.64,
					1.15
				],
				material: mats.ceiling,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.5,
					.08,
					2.3
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.01,
					1.15
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, 2.3] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-1.55,
					H / 2,
					0
				],
				receiveShadow: true,
				material: mats.plaster,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.4,
					H,
					.12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					1.55,
					H / 2,
					0
				],
				receiveShadow: true,
				material: mats.plaster,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.4,
					H,
					.12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					2.48,
					0
				],
				material: mats.plaster,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.18,
					.44,
					.12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: group,
				position: [
					-.52,
					0,
					.04
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						.52,
						1.1,
						0
					],
					castShadow: true,
					material: mats.door,
					onClick: (e) => {
						e.stopPropagation();
						onDoor();
					},
					onPointerOver: (e) => {
						e.stopPropagation();
						useWorld.getState().setHovered("door", "Open the door");
					},
					onPointerOut: () => useWorld.getState().setHovered(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.04,
						2.18,
						.07
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: handle,
					position: [
						.92,
						1.05,
						.06
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						material: mats.metal,
						onClick: (e) => {
							e.stopPropagation();
							onDoor();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.025,
							.025,
							.08,
							10
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							.07,
							0,
							.02
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						material: mats.metal,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.016,
							.016,
							.14,
							8
						] })
					})]
				})]
			}),
			[-.54, .54].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					1.1,
					.01
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.02,
					2.16,
					.01
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#ffd19a",
					transparent: true,
					opacity: .65
				})]
			}, x))
		]
	});
}
function WindowWall({ mats }) {
	const rain = useWorld((s) => s.rain);
	const mood = useWorld((s) => s.mood);
	const hovered = useWorld((s) => s.hovered) === "window";
	useCursor(hovered);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			0,
			-2.64
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.55,
					-.18
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.4, 2.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: mood === "night" ? "#0b1020" : rain ? "#4a5360" : "#c9d6c4" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.52,
					.02
				],
				onClick: (e) => {
					e.stopPropagation();
					useWorld.getState().setFocus("window");
				},
				onPointerOver: (e) => {
					e.stopPropagation();
					useWorld.getState().setHovered("window", "Sit with the light");
				},
				onPointerOut: () => useWorld.getState().setHovered(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.72,
					1.92,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#efe6d4",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.52,
					.06
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.48,
					1.7,
					.02
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d7ecff",
					transparent: true,
					opacity: .22,
					roughness: .08
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.52,
					.07
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					1.7,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#efe6d4" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.72,
					.12
				],
				material: mats.wood,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.9,
					.1,
					.22
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-1.15,
					1.5,
					.16
				],
				material: mats.curtain,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.95, 2.15] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					1.15,
					1.5,
					.16
				],
				material: mats.curtain,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.95, 2.15] })
			})
		]
	});
}
function Bed({ mats }) {
	const hovered = useWorld((s) => s.hovered) === "bed";
	useCursor(hovered);
	const lampOn = useWorld((s) => s.lampOn);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-2.05,
			0,
			.35
		],
		onClick: (e) => {
			e.stopPropagation();
			useWorld.getState().setFocus("bed");
		},
		onPointerOver: (e) => {
			e.stopPropagation();
			useWorld.getState().setHovered("bed", "A place to rest ideas");
		},
		onPointerOut: () => useWorld.getState().setHovered(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.28,
					0
				],
				castShadow: true,
				receiveShadow: true,
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.55,
					.28,
					2.15
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.48,
					0
				],
				castShadow: true,
				material: mats.pillow,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.48,
					.22,
					2.05
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					.02,
					.6,
					.12
				],
				rotation: [
					.04,
					.02,
					.01
				],
				castShadow: true,
				material: mats.blanket,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.42,
					.1,
					1.55
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-.28,
					.66,
					.05
				],
				rotation: [
					.08,
					-.2,
					.04
				],
				material: mats.throwM,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.7,
					.08,
					.9
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-.32,
					.66,
					-.78
				],
				rotation: [
					.2,
					.1,
					0
				],
				material: mats.pillow,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.16,
					.38
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.95,
					0,
					-1.55
				],
				onClick: (e) => {
					e.stopPropagation();
					play("click");
					useWorld.getState().toggleLamp();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.42,
							0
						],
						material: mats.wood,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.42,
							.08,
							.42
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.22,
							0
						],
						material: mats.wood,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.38,
							.36,
							.38
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.82,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.16,
							.2,
							.22,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f0d2a0",
							emissive: "#ffb060",
							emissiveIntensity: lampOn ? .85 : .05
						})]
					})
				]
			})
		]
	});
}
function Bookshelf({ mats }) {
	const hovered = useWorld((s) => s.hovered) === "shelf";
	useCursor(hovered);
	const inst = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const palette = (0, import_react.useMemo)(() => [
		"#6b3a24",
		"#1f4a4a",
		"#24344d",
		"#8a3b22",
		"#2d4a2a",
		"#5c2438"
	].map((c) => new Color(c)), []);
	(0, import_react.useLayoutEffect)(() => {
		const mesh = inst.current;
		if (!mesh) return;
		let n = 0;
		for (let shelf = 0; shelf < 5; shelf++) {
			let x = -.34;
			for (let i = 0; i < 8; i++) {
				const w = .05 + (shelf + i) % 4 * .008;
				const h = .16 + i % 4 * .018;
				dummy.position.set(x, .28 + shelf * .42 + h / 2, 0);
				dummy.scale.set(w, h, .18);
				dummy.updateMatrix();
				mesh.setMatrixAt(n, dummy.matrix);
				mesh.setColorAt(n, palette[(i + shelf) % palette.length]);
				x += w + .012;
				n++;
				if (x > .36) break;
			}
		}
		mesh.instanceMatrix.needsUpdate = true;
		if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
	}, [dummy, palette]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-3.22,
			0,
			-1.15
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					1.16,
					-.14
				],
				castShadow: true,
				receiveShadow: true,
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.92,
					2.28,
					.04
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-.44,
					1.16,
					0
				],
				material: mats.wood,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					2.28,
					.32
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					.44,
					1.16,
					0
				],
				material: mats.wood,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					2.28,
					.32
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					2.28,
					0
				],
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.92,
					.04,
					.32
				] })
			}),
			Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.18 + i * .42,
					.02
				],
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.86,
					.03,
					.28
				] })
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
				ref: inst,
				args: [
					void 0,
					void 0,
					40
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1,
					1,
					1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					roughness: .62,
					vertexColors: true
				})]
			}),
			BOOKS.map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryBook, {
				id: book.id,
				shelf: book.shelf,
				slot: book.slot,
				color: book.color,
				accent: book.accent,
				title: book.title
			}, book.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					1.2,
					.2
				],
				visible: false,
				onPointerOver: (e) => {
					e.stopPropagation();
					useWorld.getState().setHovered("shelf", "The stories live here");
				},
				onPointerOut: () => useWorld.getState().setHovered(null),
				onClick: (e) => {
					e.stopPropagation();
					useWorld.getState().setFocus("bookshelf");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1,
					2.3,
					.4
				] })
			})
		]
	});
}
function StoryBook({ id, shelf, slot, color, accent, title }) {
	const tex = (0, import_react.useMemo)(() => makeBookTexture(title, color, accent), [
		title,
		color,
		accent
	]);
	const hovered = useWorld((s) => s.hovered) === id;
	useCursor(hovered);
	const ref = (0, import_react.useRef)(null);
	const x = -.32 + slot * .14;
	const y = .38 + shelf * .42;
	useFrame((_, delta) => {
		if (!ref.current) return;
		ref.current.position.z = MathUtils.damp(ref.current.position.z, hovered ? .08 : 0, 6, Math.min(delta, .1));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: [
			x,
			y,
			.04
		],
		onClick: (e) => {
			e.stopPropagation();
			play("page");
			play("whoosh");
			useWorld.getState().setBook(id);
		},
		onPointerOver: (e) => {
			e.stopPropagation();
			play("hover");
			useWorld.getState().setHovered(id, `Open · ${title}`);
		},
		onPointerOut: () => useWorld.getState().setHovered(null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.09,
				.22,
				.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				roughness: .5,
				emissive: hovered ? accent : "#000",
				emissiveIntensity: hovered ? .25 : 0
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.046,
				0,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.2, .22] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: tex,
				roughness: .55
			})]
		})]
	});
}
function Globe() {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (ref.current) ref.current.rotation.y += Math.min(delta, .1) * .15;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			.22,
			2.12,
			.02
		],
		onClick: (e) => {
			e.stopPropagation();
			play("click");
			useWorld.getState().tapGlobe();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.1,
				16,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c3a4a",
				roughness: .45
			})]
		})
	});
}
function Desk({ mats, t }) {
	const hovered = useWorld((s) => s.hovered) === "desk";
	const monitorsOn = useWorld((s) => s.monitorsOn);
	const phase = useWorld((s) => s.phase);
	useCursor(hovered);
	const on = monitorsOn || phase === "room";
	const power = () => {
		play("boot");
		play("whoosh");
		useWorld.getState().setDesktop(true, "home");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			2.85,
			0,
			-1.05
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.74,
					0
				],
				castShadow: true,
				receiveShadow: true,
				material: mats.wood,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.55,
					.08,
					.72
				] })
			}),
			[-.62, .62].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					x,
					.37,
					0
				],
				material: mats.wood,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08,
					.74,
					.68
				] })
			}, x)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				x: -.28,
				z: -.12,
				on,
				rot: .18,
				mats,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
				x: .38,
				z: -.08,
				on,
				rot: -.28,
				mats,
				t
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-.02,
					.795,
					.16
				],
				material: mats.dark,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.02,
					.14
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-.85,
					.52,
					.35
				],
				rotation: [
					0,
					.5,
					0
				],
				material: mats.leather,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.07,
					.42
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-.85,
					.82,
					.17
				],
				rotation: [
					0,
					.5,
					0
				],
				material: mats.leather,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					.48,
					.08
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.9,
					.1
				],
				visible: false,
				onClick: (e) => {
					e.stopPropagation();
					power();
				},
				onPointerOver: (e) => {
					e.stopPropagation();
					useWorld.getState().setHovered("desk", "Wake the machine");
				},
				onPointerOut: () => useWorld.getState().setHovered(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.6,
					1.2,
					.9
				] })
			})
		]
	});
}
function Monitor({ x, z, on, rot, mats, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			1.12,
			z
		],
		rotation: [
			0,
			rot,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			material: mats.dark,
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.62,
				.4,
				.04
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				0,
				.022
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.56, .34] }), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: t.screen0,
				toneMapped: false
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#0a0c10" })]
		})]
	});
}
function Plants({ mats }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
		[
			-1.15,
			.12,
			-2.35,
			1
		],
		[
			.55,
			.12,
			-2.32,
			.85
		],
		[
			1.15,
			.82,
			-2.42,
			.55
		]
	].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			s[0],
			s[1],
			s[2]
		],
		scale: s[3],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			material: mats.pot,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.09,
				.07,
				.12,
				8
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				.14,
				0
			],
			material: mats.leaf,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.12,
				8,
				6
			] })
		})]
	}, i)) });
}
function Posters({ t }) {
	const items = [
		{
			map: t.posterPeak,
			pos: [
				-2.55,
				1.85,
				-2.58
			]
		},
		{
			map: t.posterForest,
			pos: [
				-1.95,
				1.72,
				-2.58
			]
		},
		{
			map: t.posterDusk,
			pos: [
				2.55,
				1.95,
				-2.58
			]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: items.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p.pos,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.42, .58] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			map: p.map,
			roughness: .7
		})]
	}, i)) });
}
function RendererGuard() {
	const gl = useThree((s) => s.gl);
	(0, import_react.useEffect)(() => {
		const ctx = gl.getContext();
		const info = String(ctx.getParameter(ctx.RENDERER) || "");
		const software = /swiftshader|llvmpipe|software|microsoft basic/i.test(info);
		const mobile = useWorld.getState().isMobile;
		if (!software && !mobile) {
			useWorld.setState({ quality: "high" });
			gl.shadowMap.enabled = true;
		} else {
			useWorld.setState({ quality: "low" });
			gl.shadowMap.enabled = false;
		}
	}, [gl]);
	return null;
}
function World() {
	const quality = useWorld((s) => s.quality);
	const phase = useWorld((s) => s.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		className: "absolute inset-0 z-0",
		shadows: quality === "high",
		dpr: quality === "low" ? 1 : [1, 1.5],
		frameloop: "always",
		gl: {
			antialias: quality === "high",
			alpha: false,
			powerPreference: "high-performance",
			toneMapping: 4,
			toneMappingExposure: 1.2,
			failIfMajorPerformanceCaveat: false
		},
		camera: {
			fov: 38,
			near: .08,
			far: 40,
			position: [
				0,
				1.5,
				4.72
			]
		},
		style: {
			touchAction: "none",
			background: "#140e0b",
			zIndex: 0
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RendererGuard, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {}),
			quality === "high" && phase !== "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EffectComposer, {
				enableNormalPass: false,
				multisampling: 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
						intensity: .42,
						luminanceThreshold: .78,
						mipmapBlur: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {
						darkness: .45,
						offset: .28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Noise, { opacity: .02 })
				]
			})
		]
	});
}
//#endregion
export { World };
