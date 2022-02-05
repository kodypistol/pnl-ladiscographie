import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader, MeshBasicMaterial} from "three";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import * as dat from 'dat.gui'


/**
 * Base
 */
// Dat GUI
    const gui = new dat.GUI({ width: 400 });


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

// const fontLoader = new THREE.FontLoader();
//
// fontLoader.load(
//     '/assets/fonts/Display_Regular.js',
//     (font) => {
//         console.log('Font loaded.')
//
//         const fontShape = font.generateShapes('PNL\nla discographie', 10);
//
//
//         const textGeometry = new THREE.ShapeGeometry(fontShape);
//
//         textGeometry.computeBoundingBox()
//         textGeometry.translate(
//             - (textGeometry.boundingBox.max.x - 0.2)  * 0.5, //Dividing by 2, its the same adel
//              (textGeometry.boundingBox.max.y - 0.2) * 2,
//             - (textGeometry.boundingBox.max.z - 0.03) * 0.5
//         )
//         textGeometry.center()
//
//
//         const material = new THREE.MeshStandardMaterial({ color: 'white' })
//         const text = new THREE.Mesh(textGeometry, material)
//         scene.add(text)
//     }
// )



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

const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 1000)
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

/**
 * SVG
 */
const svgLoader = new SVGLoader();
const pnlTitlesFolder = gui.addFolder('TITLES');

const pnlTitleSVG = svgLoader.load(
    '/assets/svg/PNL.svg',
    (data) =>
    {
        console.log(data)
        const paths = data.paths;
        const pnlGroup = new THREE.Group();

        for (let i = 0; i < paths.length; i ++)
        {
            const path = paths[i];

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color('white'),
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const shapes = SVGLoader.createShapes(path);

            for (let j = 0; j < shapes.length ; j++)
            {
                const shape = shapes[j];
                const geometry = new THREE.ShapeBufferGeometry(shape)
                const mesh = new THREE.Mesh(geometry, material);

                pnlGroup.add(mesh);
            }
        }

        pnlGroup.scale.set(0.010, 0.010, 0.010)

        pnlGroup.rotation.y = - Math.PI / 4.5
        pnlGroup.position.x = -1.700
        pnlGroup.position.y = -0.100
        pnlGroup.position.z = -1.200

        scene.add(pnlGroup);

        /**
         * GUI
         */

        /**
         *
         *      TITLES
         *
         */

// "PNL" Title
        const pnlPNLTitleFolder = pnlTitlesFolder.addFolder('"PNL" title')
        pnlPNLTitleFolder.add(pnlGroup.position, 'x').min(-5).max(10).step(0.01).name('Position : X AXIS');
        pnlPNLTitleFolder.add(pnlGroup.position, 'y').min(-5).max(10).step(0.01).name('Position : Y AXIS');
        pnlPNLTitleFolder.add(pnlGroup.position, 'z').min(-5).max(10).step(0.01).name('Position : Z AXIS');

    },
    (xhr) =>
    {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (err) =>
    {
        console.log('An error happened: ' + err)
    }
);

const laDiscographieTitleSVG = svgLoader.load(
    '/assets/svg/la-discographie.svg',
    (data) =>
    {
        console.log(data)
        const paths = data.paths;
        const laDiscographieGroup = new THREE.Group();

        for (let i = 0; i < paths.length; i ++)
        {
            const path = paths[i];

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color('white'),
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const shapes = SVGLoader.createShapes(path);

            for (let j = 0; j < shapes.length ; j++)
            {
                const shape = shapes[j];
                const geometry = new THREE.ShapeBufferGeometry(shape)
                const mesh = new THREE.Mesh(geometry, material);

                laDiscographieGroup.add(mesh);
            }
        }

        laDiscographieGroup.scale.set(0.006, 0.006, 0.006)

        laDiscographieGroup.rotation.y = - Math.PI / 4.5

        laDiscographieGroup.position.x = -3.000
        laDiscographieGroup.position.y = -1.250
        laDiscographieGroup.position.z = -2.500

        scene.add(laDiscographieGroup);

        /**
         * GUI
         */

        /**
         *
         *      TITLES
         *
         */

// "PNL" Title
        const pnlLaDiscographieTitleFolder = pnlTitlesFolder.addFolder('"La Discographie" title')
        pnlLaDiscographieTitleFolder.add(laDiscographieGroup.position, 'x').min(-5).max(10).step(0.01).name('Position : X AXIS');
        pnlLaDiscographieTitleFolder.add(laDiscographieGroup.position, 'y').min(-5).max(10).step(0.01).name('Position : Y AXIS');
        pnlLaDiscographieTitleFolder.add(laDiscographieGroup.position, 'z').min(-5).max(10).step(0.01).name('Position : Z AXIS');
    },
    (xhr) =>
    {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (err) =>
    {
        console.log('An error happened: ' + err)
    }
);

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
 * Debug Panel
 */

/**
 * Camera
 */
const cameraGUIFolder = gui.addFolder('Camera');

const cameraParameters = {
    reset: () =>
    {
        camera.position.set(0, 0, 10)
    }
}

cameraGUIFolder.add(cameraParameters, 'reset')



/**
 *
 *      PNL COVERS
 *
 */
const pnlCoversGUIFolder = gui.addFolder('PNL COVERS');

// Deux frères GUI
const pnlDeuxFreresFolder = pnlCoversGUIFolder.addFolder('DEUX FRÈRES');

pnlDeuxFreresFolder.add(planeRed.position, 'x').min(-5).max(10).step(0.01).name('Position : X AXIS');
pnlDeuxFreresFolder.add(planeRed.position, 'y').min(-5).max(10).step(0.01).name('Position : Y AXIS');
pnlDeuxFreresFolder.add(planeRed.position, 'z').min(-5).max(10).step(0.01).name('Position : Z AXIS');

// Dans la légende GUI
const pnlDansLaLegendeFolder = pnlCoversGUIFolder.addFolder('DANS LA LÉGENDE');

pnlDansLaLegendeFolder.add(planeBlue.position, 'x').min(-5).max(10).step(0.01).name('Position : X AXIS');
pnlDansLaLegendeFolder.add(planeBlue.position, 'y').min(-5).max(10).step(0.01).name('Position : Y AXIS');
pnlDansLaLegendeFolder.add(planeBlue.position, 'z').min(-5).max(10).step(0.01).name('Position : Z AXIS');

// Le Monde Chico GUI
const pnlLeMondeChicoFolder = pnlCoversGUIFolder.addFolder('LE MONDE CHICO');

pnlLeMondeChicoFolder.add(planeYellow.position, 'x').min(-5).max(10).step(0.01).name('Position : X AXIS');
pnlLeMondeChicoFolder.add(planeYellow.position, 'y').min(-5).max(10).step(0.01).name('Position : Y AXIS');
pnlLeMondeChicoFolder.add(planeYellow.position, 'z').min(-5).max(10).step(0.01).name('Position : Z AXIS');

// Que la famille GUI
const pnlQueLaFamilleFolder = pnlCoversGUIFolder.addFolder('QUE LA FAMILLE');

pnlQueLaFamilleFolder.add(planeGreen.position, 'x').min(-5).max(10).step(0.01).name('Position : X AXIS');
pnlQueLaFamilleFolder.add(planeGreen.position, 'y').min(-5).max(10).step(0.01).name('Position : Y AXIS');
pnlQueLaFamilleFolder.add(planeGreen.position, 'z').min(-5).max(10).step(0.01).name('Position : Z AXIS');



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