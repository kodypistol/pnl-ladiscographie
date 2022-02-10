import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MeshBasicMaterial } from "three";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import * as dat from 'dat.gui'
import gsap from 'gsap'

let cameraControl = false;
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


const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 10)

scene.add(camera)


// old Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Planes
 */

// Deux frères
const planeRed = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: deuxFreresTexture,

    })
)
planeRed.name = 'DF'

    planeRed.position.set(-7, 0, 0)

    planeRed.rotation.x = 0
    planeRed.rotation.y = - Math.PI / 4.5

// Dans la Légende
const planeBlue = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.9, 1.9),
    new MeshBasicMaterial({
        map: dansLaLegendeTexture,
        side: THREE.DoubleSide,
    })
)
planeBlue.name = 'DLL'

planeBlue.rotation.x = 0
planeBlue.rotation.y = - Math.PI / 4.5

planeBlue.position.x = 7
planeBlue.position.z = -0.8


// Le Monde Chico
const planeYellow = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.5, 1.5),
    new MeshBasicMaterial({
        map: leMondeChicoTexture,
        side: THREE.DoubleSide,
    })
)
planeYellow.name = 'LMC'

planeYellow.rotation.x = 0
planeYellow.rotation.y = - Math.PI / 4.5

planeYellow.position.x = -7
planeYellow.position.z = -0.8

// Que La Famille
const planeGreen = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.2, 1.2),
    new MeshBasicMaterial({
        map: queLaFamilleTexture,
        side: THREE.DoubleSide,
        name: 'QLF'

    })
)
planeGreen.name = 'QLF'

planeGreen.rotation.x = 0
planeGreen.rotation.y = - Math.PI / 4.5

planeGreen.position.x = 7
planeGreen.position.z = -1.2


scene.add(planeRed, planeBlue, planeYellow, planeGreen)

/**
 * SVG
 */
const svgLoader = new SVGLoader();
const pnlTitlesFolder = gui.addFolder('TITLES');

let pnlGroup = null;

// Title: "PNL"
svgLoader.load(
    '/assets/svg/PNL.svg',
    (data) =>
    {
        console.log(data)
        const paths = data.paths;
        pnlGroup = new THREE.Group();

        for (let i = 0; i < paths.length; i ++)
        {
            const path = paths[i];

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color('white'),
                side: THREE.DoubleSide,
                depthWrite: false,
                transparent: true,
                opacity: 0
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

        pnlGroup.scale.set(0.014, 0.014, 0.014)

        pnlGroup.rotation.y = - Math.PI / 4.5
        pnlGroup.position.x = -2.110
        pnlGroup.position.y = -0.410
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

// "PNL" GUI DEBUG Title
        const pnlPNLTitleFolder = pnlTitlesFolder.addFolder('"PNL" title')
        const pnlPNLTitleFolderPositionFolder = pnlPNLTitleFolder.addFolder('Position (X,Y,Z)')
        const pnlPNLTitleFolderRotationFolder = pnlPNLTitleFolder.addFolder('Rotation (X,Y,Z)')
        const pnlPNLTitleFolderScaleFolder = pnlPNLTitleFolder.addFolder('Scale')


        //Position GUI
        pnlPNLTitleFolderPositionFolder.add(pnlGroup.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
        pnlPNLTitleFolderPositionFolder.add(pnlGroup.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
        pnlPNLTitleFolderPositionFolder.add(pnlGroup.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

        //Rotation GUI
        pnlPNLTitleFolderRotationFolder.add(pnlGroup.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
        pnlPNLTitleFolderRotationFolder.add(pnlGroup.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
        pnlPNLTitleFolderRotationFolder.add(pnlGroup.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

        // Scale GUI
        const pnlPNLTitleScaleParameters = {
            scale: pnlGroup.scale.x
        }

        pnlPNLTitleFolderScaleFolder.add(pnlPNLTitleScaleParameters, 'scale').min(0).max(0.030).step(0.0001).name('Scale').onFinishChange(() =>
        {
            pnlGroup.scale.set(pnlPNLTitleScaleParameters.scale, pnlPNLTitleScaleParameters.scale, pnlPNLTitleScaleParameters.scale)
        });
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

let laDiscographieGroup = null;

// Title: "La Discographie"
svgLoader.load(
    '/assets/svg/la-discographie.svg',
    (data) =>
    {
        console.log(data)
        const paths = data.paths;
        laDiscographieGroup = new THREE.Group();

        for (let i = 0; i < paths.length; i ++)
        {
            const path = paths[i];

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color('white'),
                side: THREE.DoubleSide,
                depthWrite: false,
                transparent: true,
                opacity: 0,
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

        laDiscographieGroup.scale.set(0.005, 0.005, 0.005)

        laDiscographieGroup.rotation.y = - Math.PI / 4.5

        laDiscographieGroup.position.x = -2.710
        laDiscographieGroup.position.y = -1.210
        laDiscographieGroup.position.z = -1.510

        scene.add(laDiscographieGroup);

        /**
         * GUI
         */

        /**
         *
         *      TITLES
         *
         */

            // "PNL" GUI DEBUG Title
        const pnlLaDiscographieTitleFolder = pnlTitlesFolder.addFolder('"La Discographie" title')
        const pnlLaDiscographieTitleFolderPositionFolder = pnlLaDiscographieTitleFolder.addFolder('Position (X,Y,Z)')
        const pnlLaDiscographieTitleFolderRotationFolder = pnlLaDiscographieTitleFolder.addFolder('Rotation (X,Y,Z)')
        const pnlLaDiscographieTitleFolderScaleFolder = pnlLaDiscographieTitleFolder.addFolder('Scale (X,Y,Z)')

        //Position GUI
        pnlLaDiscographieTitleFolderPositionFolder.add(laDiscographieGroup.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
        pnlLaDiscographieTitleFolderPositionFolder.add(laDiscographieGroup.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
        pnlLaDiscographieTitleFolderPositionFolder.add(laDiscographieGroup.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

        //Rotation GUI
        pnlLaDiscographieTitleFolderRotationFolder.add(laDiscographieGroup.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
        pnlLaDiscographieTitleFolderRotationFolder.add(laDiscographieGroup.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
        pnlLaDiscographieTitleFolderRotationFolder.add(laDiscographieGroup.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

        //Scale GUI
        const laDiscographieScaleParameters = {
            scale: laDiscographieGroup.scale.x
        }
        pnlLaDiscographieTitleFolderScaleFolder.add(laDiscographieScaleParameters, 'scale').min(0).max(0.015).step(0.0001).name('Scale').onFinishChange(() =>
        {
            laDiscographieGroup.scale.set(laDiscographieScaleParameters.scale, laDiscographieScaleParameters.scale, laDiscographieScaleParameters.scale)
        });

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

// DLL SVG

let DLLdateSVGGroup = null;

svgLoader.load(
    '/assets/svg/DLL.svg',
    (data) =>
    {
        console.log(data)
        const paths = data.paths;
        DLLdateSVGGroup = new THREE.Group();

        for (let i = 0; i < paths.length; i ++)
        {
            const path = paths[i];

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color('white'),
                side: THREE.DoubleSide,
                depthWrite: false,
                transparent: true,
                opacity: 0,
            });

            const shapes = SVGLoader.createShapes(path);

            for (let j = 0; j < shapes.length ; j++)
            {
                const shape = shapes[j];
                const geometry = new THREE.ShapeBufferGeometry(shape)
                const mesh = new THREE.Mesh(geometry, material);

                DLLdateSVGGroup.add(mesh);
            }
        }

        DLLdateSVGGroup.scale.set(0.002, 0.002, 0.002)

        DLLdateSVGGroup.position.set(1.030, -0.850, 0);
        DLLdateSVGGroup.rotation.set(0, - Math.PI / 4.5, 0);



        scene.add(DLLdateSVGGroup);

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

renderer.setClearColor('#0C1020')


/**
 * Debug Panel
 */

/**
 *
 *      PNL COVERS
 *
 */
const pnlCoversGUIFolder = gui.addFolder('PNL COVERS');

// Deux frères GUI
const pnlDeuxFreresFolder = pnlCoversGUIFolder.addFolder('DEUX FRÈRES');
const pnlDeuxFreresFolderPositionFolder = pnlDeuxFreresFolder.addFolder('Position (X,Y,Z)');
const pnlDeuxFreresFolderRotationFolder = pnlDeuxFreresFolder.addFolder('Rotation (X,Y,Z)');
const pnlDeuxFreresFolderScaleFolder = pnlDeuxFreresFolder.addFolder('Scale');

    // Position
pnlDeuxFreresFolderPositionFolder.add(planeRed.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlDeuxFreresFolderPositionFolder.add(planeRed.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlDeuxFreresFolderPositionFolder.add(planeRed.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

    // Rotation
pnlDeuxFreresFolderRotationFolder.add(planeRed.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlDeuxFreresFolderRotationFolder.add(planeRed.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlDeuxFreresFolderRotationFolder.add(planeRed.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

    // Scale
const pnlDeuxFreresScaleParameters = {
    scale: planeRed.scale.x
}
pnlDeuxFreresFolderScaleFolder.add(pnlDeuxFreresScaleParameters, 'scale').min(0.5).max(2).step(0.001).name('Scale').onFinishChange(() =>
{
    planeRed.scale.set(pnlDeuxFreresScaleParameters.scale, pnlDeuxFreresScaleParameters.scale, pnlDeuxFreresScaleParameters.scale)
});

// Dans la légende GUI
const pnlDansLaLegendeFolder = pnlCoversGUIFolder.addFolder('DANS LA LÉGENDE');
const pnlDansLaLegendeFolderPositionFolder = pnlDansLaLegendeFolder.addFolder('Position (X,Y,Z)');
const pnlDansLaLegendeFolderRotationFolder = pnlDansLaLegendeFolder.addFolder('Rotation (X,Y,Z)');
const pnlDansLaLegendeFolderScaleFolder = pnlDansLaLegendeFolder.addFolder('Scale');

    // Position
pnlDansLaLegendeFolderPositionFolder.add(planeBlue.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlDansLaLegendeFolderPositionFolder.add(planeBlue.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlDansLaLegendeFolderPositionFolder.add(planeBlue.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

    // Rotation
pnlDansLaLegendeFolderRotationFolder.add(planeBlue.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlDansLaLegendeFolderRotationFolder.add(planeBlue.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlDansLaLegendeFolderRotationFolder.add(planeBlue.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

    // Scale
const pnlDansLaLegendeScaleParameters = {
    scale: planeBlue.scale.x
}
pnlDansLaLegendeFolderScaleFolder.add(pnlDansLaLegendeScaleParameters, 'scale').min(0.5).max(2).step(0.001).name('Scale').onFinishChange(() =>
{
    planeBlue.scale.set(pnlDansLaLegendeScaleParameters.scale, pnlDansLaLegendeScaleParameters.scale, pnlDansLaLegendeScaleParameters.scale)
});

// Le Monde Chico GUI
const pnlLeMondeChicoFolder = pnlCoversGUIFolder.addFolder('LE MONDE CHICO');
const pnlLeMondeChicoFolderPositionFolder = pnlLeMondeChicoFolder.addFolder('Position (X,Y,Z)');
const pnlLeMondeChicoFolderRotationFolder = pnlLeMondeChicoFolder.addFolder('Rotation (X,Y,Z)');
const pnlLeMondeChicoFolderScaleFolder = pnlLeMondeChicoFolder.addFolder('Scale');

    // Position
pnlLeMondeChicoFolderPositionFolder.add(planeYellow.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlLeMondeChicoFolderPositionFolder.add(planeYellow.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlLeMondeChicoFolderPositionFolder.add(planeYellow.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

    // Rotation
pnlLeMondeChicoFolderRotationFolder.add(planeYellow.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlLeMondeChicoFolderRotationFolder.add(planeYellow.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlLeMondeChicoFolderRotationFolder.add(planeYellow.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

    // Scale
const pnlLeMondeChicoScaleParameters = {
    scale: planeYellow.scale.x
}
pnlLeMondeChicoFolderScaleFolder.add(pnlLeMondeChicoScaleParameters, 'scale').min(0.5).max(2).step(0.001).name('Scale').onFinishChange(() =>
{
    planeYellow.scale.set(pnlLeMondeChicoScaleParameters.scale, pnlLeMondeChicoScaleParameters.scale, pnlLeMondeChicoScaleParameters.scale)
});

// Que la famille GUI
const pnlQueLaFamilleFolder = pnlCoversGUIFolder.addFolder('QUE LA FAMILLE');
const pnlQueLaFamilleFolderPositionFolder = pnlQueLaFamilleFolder.addFolder('Position (X,Y,Z)');
const pnlQueLaFamilleFolderRotationFolder = pnlQueLaFamilleFolder.addFolder('Rotation (X,Y,Z)');
const pnlQueLaFamilleFolderScaleFolder = pnlQueLaFamilleFolder.addFolder('Scale');

// Position
pnlQueLaFamilleFolderPositionFolder.add(planeGreen.position, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlQueLaFamilleFolderPositionFolder.add(planeGreen.position, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlQueLaFamilleFolderPositionFolder.add(planeGreen.position, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

// Rotation
pnlQueLaFamilleFolderRotationFolder.add(planeGreen.rotation, 'x').min(-15).max(10).step(0.01).name('Position : X AXIS');
pnlQueLaFamilleFolderRotationFolder.add(planeGreen.rotation, 'y').min(-15).max(10).step(0.01).name('Position : Y AXIS');
pnlQueLaFamilleFolderRotationFolder.add(planeGreen.rotation, 'z').min(-15).max(10).step(0.01).name('Position : Z AXIS');

// Scale
const pnlQueLaFamilleScaleParameters = {
    scale: planeGreen.scale.x
}
pnlQueLaFamilleFolderScaleFolder.add(pnlQueLaFamilleScaleParameters, 'scale').min(0.5).max(2).step(0.001).name('Scale').onFinishChange(() =>
{
    planeGreen.scale.set(pnlQueLaFamilleScaleParameters.scale, pnlQueLaFamilleScaleParameters.scale, pnlQueLaFamilleScaleParameters.scale)
});

/**
 * Camera
 */
const cameraGUIFolder = gui.addFolder('Steps');

const cameraParameters = {
    step1allcoversfacingscreen: () =>
    {
        pnlGroup.position.set(-2.100, -0.410, -1.200);
        pnlGroup.rotation.set(0, 0, 0);
        pnlGroup.scale.set(0.014, 0.014, 0.014);

        laDiscographieGroup.position.set(-1.550, -1.210, -1.500);
        laDiscographieGroup.rotation.set(0, 0, 0);
        laDiscographieGroup.scale.set(0.005, 0.005, 0.005);

        planeRed.position.set(0, 0, -1.81);
        planeRed.rotation.set(0, 0, 0);
        planeRed.scale.set(1, 1, 1)

        planeBlue.position.set(-0.02, 0, -2.41);
        planeBlue.rotation.set(0, 0, 0);
        planeBlue.scale.set(1, 1, 1)

        planeYellow.position.set(-0.02, 0, -2.91);
        planeYellow.rotation.set(0, 0, 0);
        planeYellow.scale.set(1, 1, 1)

        planeGreen.position.set(-0.02, 0, -3.31);
        planeGreen.rotation.set(0, 0, 0);
        planeGreen.scale.set(1, 1, 1)

    },
    step2allmeshesrotated: () =>
    {
        pnlGroup.position.set(-2.100, -0.410, -1.200);
        pnlGroup.rotation.set(0, -Math.PI / 4.5, 0);
        pnlGroup.scale.set(0.014, 0.014, 0.014);

        laDiscographieGroup.position.set(-2.710, -1.210, -1.510);
        laDiscographieGroup.rotation.set(0, -Math.PI / 4.5, 0);
        laDiscographieGroup.scale.set(0.005, 0.005, 0.005);

        planeRed.position.set(0, 0, 0);
        planeRed.rotation.set(0, -Math.PI / 4.5, 0);
        planeRed.scale.set(1, 1, 1)

        planeBlue.position.set(0.7, 0, -0.800);
        planeBlue.rotation.set(0, -Math.PI / 4.5, 0);
        planeBlue.scale.set(1, 1, 1)

        planeYellow.position.set(1.2, 0, -0.800);
        planeYellow.rotation.set(0, -Math.PI / 4.5, 0);
        planeYellow.scale.set(1, 1, 1)

        planeGreen.position.set(1.7, 0, -1.200);
        planeGreen.rotation.set(0, -Math.PI / 4.5, 0);
        planeGreen.scale.set(1, 1, 1)

    }

}

cameraGUIFolder.add(cameraParameters, 'step1allcoversfacingscreen')
cameraGUIFolder.add(cameraParameters, 'step2allmeshesrotated')


/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const startingAnimation = () =>
{

    gsap.to(renderer, {
        setClearColor: '#4F5E92',
        duration: 2
    })


    setTimeout(() =>
    {

        // pnlGroup.material.color = new THREE.Color('ED6A65')
        for(let i = 0 ; i < pnlGroup.children.length ; i++)
        {
            pnlGroup.children[i].material.color = new THREE.Color('#ED6A65')
        }

        for(let i = 0 ; i < laDiscographieGroup.children.length ; i++)
        {
            laDiscographieGroup.children[i].material.color = new THREE.Color('#71F9FC')
        }

        pnlGroup.position.set(-2.100,-0.410,-1.200)
        pnlGroup.rotation.set(0,0,0)




        laDiscographieGroup.position.set(-1.550, -1.210, -1.500)
        laDiscographieGroup.rotation.set(0,0,0)

        planeRed.position.set(-7, 0, -1.81)
        planeRed.rotation.set(0,0,0)

        planeBlue.position.set(7, 0, -2.41)
        planeBlue.rotation.set(0,0,0)

        planeYellow.position.set(-7, 0, -2.91)
        planeYellow.rotation.set(0, 0, 0)

        planeGreen.position.set(7, 0, -3.31)
        planeGreen.rotation.set(0, 0, 0)




        const firstAnimation = () =>
        {
            for(let children of pnlGroup.children)
            {
                children.material.transparent = true
                children.material.opacity = 0

                gsap.to(children.material,
                    {
                        duration: 1,
                        delay: 1,
                        opacity:1
                    });

            }

            for(let children of laDiscographieGroup.children)
            {
                children.material.transparent = true
                children.material.opacity = 0

                gsap.to(children.material,
                    {
                        duration: 1,
                        delay: 1,
                        opacity:1
                    });
            }

            gsap.to(pnlGroup.scale,
                {
                    duration: 1,
                    delay: 1,
                    x: 0.016,
                    y: 0.016,
                    z:0.016

                });


            gsap.to(laDiscographieGroup.scale,
                {
                    duration: 1,
                    delay: 1,
                    x: 0.0055,
                    y: 0.0055,
                    z:0.0055

                });


        }



        const timelineStartingAnimation = gsap.timeline(
            {
                repeat: 0,
                onComplete: secondAnimation
            })

        // DF & LMC
        timelineStartingAnimation.to(planeRed.position,
            {
                duration: 1,
                delay: 2,
                x:0
            },0)
        timelineStartingAnimation.to(planeYellow.position,
            {
                duration: 0.7,
                delay: 0,
                x:0
            }, 2.1)

        // DLL & QLF
        timelineStartingAnimation.to(planeBlue.position,
            {
                duration: 1,
                delay: 2,
                x:0
            },0)
        timelineStartingAnimation.to(planeGreen.position,
            {
                duration: 0.7,
                delay: 0,
                x:0
            }, 2.1)

        firstAnimation()




    }, 500)
}

const secondAnimation = () =>
{
    const timelineSecondAnimation = gsap.timeline(
        {
            repeat: 0,
        })

    //DF: position
    timelineSecondAnimation.to(planeRed.position,
        {
            duration: 1,
            delay: 0.5,
            x:0,
            y:0,
            z:0
        },0)

    //DF: rotation
    timelineSecondAnimation.to(planeRed.rotation,
        {
            duration: 1,
            delay: 0.5,
            x:0,
            y: - Math.PI / 4.5,
            z: 0
        },0)

    //DLL: position
    timelineSecondAnimation.to(planeBlue.position,
        {
            duration: 1,
            delay: 0.5,
            x:0.7,
            y:0,
            z:-0.8
        },0)

    //DLL: rotation
    timelineSecondAnimation.to(planeBlue.rotation,
        {
            duration: 1,
            delay: 0.5,
            x:0,
            y: - Math.PI / 4.5,
            z: 0
        },0)

    //LMC: position
    timelineSecondAnimation.to(planeYellow.position,
        {
            duration: 1,
            delay: 0.5,
            x:1.2,
            y:0,
            z:-0.8
        },0)

    //LMC: rotation
    timelineSecondAnimation.to(planeYellow.rotation,
        {
            duration: 1,
            delay: 0.5,
            x:0,
            y: - Math.PI / 4.5,
            z: 0
        },0)

    //QLF: position
    timelineSecondAnimation.to(planeGreen.position,
        {
            duration: 1,
            delay: 0.5,
            x:1.7,
            y:0,
            z:-1.2
        },0)

    //QLF: rotation
    timelineSecondAnimation.to(planeGreen.rotation,
        {
            duration: 1,
            delay: 0.5,
            x:0,
            y: - Math.PI / 4.5,
            z: 0
        },0)

    //"PNL" title: position
    timelineSecondAnimation.to(pnlGroup.position,
        {
            duration: 1,
            delay: 0.5,
            x:-2.110,
            y:-0.410,
            z:-1.200
        },0)

    //"PNL" title: scale
    timelineSecondAnimation.to(pnlGroup.scale,
        {
            duration: 1,
            delay: 0.5,
            x:0.014,
            y:0.014,
            z:0.014
        },0)

    //"PNL" title: rotation
    timelineSecondAnimation.to(pnlGroup.rotation,
        {
            duration: 1,
            delay: 0.5,
            y: - Math.PI / 4.5
        },0)

    //"la discographie" title: position
    timelineSecondAnimation.to(laDiscographieGroup.position,
        {
            duration: 1,
            delay: 0.5,
            x:-2.710,
            y:-1.210,
            z:-1.510
        },0)

    //"la discographie" title: scale
    timelineSecondAnimation.to(laDiscographieGroup.scale,
        {
            duration: 1,
            delay: 0.5,
            x:0.005,
            y:0.005,
            z:0.005
        },0)

    //"la discographie" title: rotation
    timelineSecondAnimation.to(laDiscographieGroup.rotation,
        {
            duration: 1,
            delay: 0.5,
            y: - Math.PI / 4.5
        },0)

    setTimeout(() =>
    {
        cameraControl = true;

    }, 1500)
}


startingAnimation();

/**
 * Mouse follower & Raycaster
 */

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const cursor = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (event) => {


    // Cursor for camera controlling
    cursor.x = (event.clientX / sizes.width - 0.5) / 6;
    cursor.y = -(event.clientY / sizes.height - 0.5) / 6;

    if(cameraControl === true)
    {
        camera.lookAt(cursor.x, cursor.y)
    }

    //Mouse for Raycaster
    mouse.x = event.clientX / sizes.width * 2 - 1;
    mouse.y = - (event.clientY / sizes.height * 2 - 1);

});

let currentIntersect = 1;

const deuxFreresHover = () =>
{
    gsap.to(renderer,{
        duration: 1,
        setClearColor: '#9B61B9'
    })

    gsap.to(planeRed.position,{
        duration: 0.4,
        x:0.10,
        y:0,
        z:0.30
    })

    gsap.to(planeBlue.position,{
        duration: 0.4,
        x:0.65,
        z:-0.8
    })

    gsap.to(planeYellow.position,{
        duration: 0.4,
        x:1.15,
        y:0,
        z:-0.8

    })

    gsap.to(planeGreen.position,{
        duration: 0.4,
        z: -1.3
    })

}

const dansLaLegendeHover = () =>
{

    for(let children of DLLdateSVGGroup.children)
    {
        children.material.transparent = true
        children.material.opacity = 0

        gsap.to(children.material,
            {
                duration: 1,
                opacity:1
            });

    }

    gsap.to(DLLdateSVGGroup.position, {
        duration: 0.4,
        x:1.16
    })

    gsap.to(renderer,{
        duration: 1,
        setClearColor: '#E4A18D'
    })

    gsap.to(planeRed.position,{
        duration: 0.4,
        x: -0.06,
    })

    gsap.to(planeBlue.position,{
        duration: 0.4,
        x:0.8,
        z:-0.6
    })

    gsap.to(planeYellow.position,{
        duration: 0.4,
        x:1.2,
        y:0,
        z:-0.8
    })

    gsap.to(planeGreen.position,{
        duration: 0.4,
        z: -1.3
    })
}

const leMondeChicoHover = () =>
{
    gsap.to(renderer,{
        duration: 1,
        setClearColor: '#04090D'
    })

    gsap.to(planeRed.position,{
        duration: 0.4,
        x: -0.05,
        z: 0
    })

    gsap.to(planeBlue.position,{
        duration: 0.4,
        x:0.6,
        y:0,
        z:-0.8
    })

    gsap.to(planeYellow.position,{
        duration: 0.6,
        x: 1.4,
        z: -0.46
    })

    gsap.to(planeGreen.position,{
        duration: 0.6,
        x: 1.8,
        z: -1.3
    })
}

const queLaFamilleHover = () =>
{
    gsap.to(renderer,{
        duration: 1,
        setClearColor: '#B63752'
    })

    gsap.to(planeRed.position,{
        duration: 0.4,
        x: -0.05,
        z: 0
    })

    gsap.to(planeBlue.position,{
        duration: 0.4,
        x:0.6,
        y:0,
        z:-0.8
    })

    gsap.to(planeYellow.position,{
        duration: 0.8,
        x:1.2,
        z:-0.8
    })

    gsap.to(planeGreen.position,{
        duration: 0.8,
        x: 1.9,
        z: -1.3
    })
}

const leaveRaycasterHover = () =>
{
    renderer.setClearColor('#4F5E92')
    secondAnimation()

    for(let children of DLLdateSVGGroup.children)
    {
        children.material.transparent = true
        children.material.opacity = 0

        gsap.to(children.material,
            {
                duration: 0.5,
                delay: 0.5,
                opacity:0
            });

    }

    gsap.to(DLLdateSVGGroup.position, {
        duration: 0.5,
        delay: 0.5,
        x:1.06
    })
}

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    //Raycaster
    if(cameraControl)
    {
        raycaster.setFromCamera(mouse, camera)

        const hoveringElements = [planeRed, planeBlue, planeYellow, planeGreen]
        const intersectObjects = raycaster.intersectObjects(hoveringElements)

        if (intersectObjects.length)
        {
            if (currentIntersect !== intersectObjects[0].object)
            {
                switch (intersectObjects[0].object.name)
                {
                    case 'DF':
                        deuxFreresHover();
                        break;
                    case 'DLL':
                        dansLaLegendeHover()
                        break;
                    case 'LMC':
                        leMondeChicoHover()
                        break;
                    case 'QLF':
                        queLaFamilleHover()
                        break;
                    default:
                }
            }
            currentIntersect = intersectObjects[0].object
            // currentIntersect = null;


        }
        else
        {
            if (currentIntersect)
            {
                leaveRaycasterHover();
            }
            currentIntersect = null;
        }

    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()