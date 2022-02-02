import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader, MeshBasicMaterial} from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader();
const deuxFreresTexture = textureLoader.load('/assets/covers/df.png')
const dansLaLegendeTexture = textureLoader.load('/assets/covers/dll.jpg')
const leMondeChicoTexture = textureLoader.load('/assets/covers/lmc.png')
const queLaFamilleTexture = textureLoader.load('/assets/covers/qlf.jpg')

// Font loader

const fontLoader = new THREE.FontLoader();

fontLoader.load(
    '/assets/fonts/Display_Regular.js',
    (font) => {
        console.log('Font loaded.')

        const fontShape = font.generateShapes('PNL\nla discographie', 100);


        const textGeometry = new THREE.ShapeGeometry(fontShape);

        textGeometry.computeBoundingBox()
        textGeometry.translate(
            - (textGeometry.boundingBox.max.x - 0.2)  * 0.5, //Dividing by 2, its the same adel
             (textGeometry.boundingBox.max.y - 0.2) * 2,
            - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        )
        textGeometry.center()


        const material = new THREE.MeshStandardMaterial({ color: 'white' })
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
    }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
//     const aspectRatio = sizes.width / sizes.height
//     const camera = new THREE.OrthographicCamera(
//     aspectRatio * - 1,
//     aspectRatio * 1,
//     1,
//     - 1,
//     0.01, 100
// )
// camera.position.z = -10
//
// scene.add(camera)

const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 10)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Planes
 */

// Deux frères
const planeRed = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: deuxFreresTexture
    })
)
    planeRed.rotation.x = 0
    planeRed.rotation.y = - Math.PI / 4.5

// Dans la Légende
const planeBlue = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.9, 1.9),
    new MeshBasicMaterial({
        map: dansLaLegendeTexture,
        side: THREE.DoubleSide
    })
)
planeBlue.rotation.x = 0
planeBlue.rotation.y = - Math.PI / 4.5

planeBlue.position.x = 0.7
planeBlue.position.z = -0.8


// Le Monde Chico
const planeYellow = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.5, 1.5),
    new MeshBasicMaterial({
        map: leMondeChicoTexture,
        side: THREE.DoubleSide,
    })
)
planeYellow.rotation.x = 0
planeYellow.rotation.y = - Math.PI / 4.5

planeYellow.position.x = 1.2
planeYellow.position.z = -0.8

// Que La Famille
const planeGreen = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.2, 1.2),
    new MeshBasicMaterial({
        map: queLaFamilleTexture,
        side: THREE.DoubleSide
    })
)
planeGreen.rotation.x = 0
planeGreen.rotation.y = - Math.PI / 4.5

planeGreen.position.x = 1.7
planeGreen.position.z = -1.2


scene.add(planeRed, planeBlue, planeYellow, planeGreen)

// Light
// const light = new THREE.AmbientLight( 0x222222 );
// scene.add( light );

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.setClearColor('#8c9aff')



/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update cube
    // plane.rotation.x = (Math.PI * lastElapsedTime) * 0.3
    // plane.rotation.z = (Math.PI * lastElapsedTime) * 0.3
    // console.log(plane.rotation)

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()