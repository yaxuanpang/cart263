import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// canvas
const canvas = document.querySelector("canvas#three-ex");
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 50)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight);

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);


//make a plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ color: "#657997" }),
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(plane)

window.requestAnimationFrame(animate)

function animate()
{

    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

