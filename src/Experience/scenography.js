import * as THREE from "three";
import {MeshBasicMaterial} from "three";
import sceneManager from "./managers/sceneManager";
import experienceManager from "./experienceManager";
import renderer from './renderer'
import gsap from 'gsap';
import debugPanel from "./debugPanel";

const scenography = {
    objects: {
      df: null,
      dll: null,
      lmc: null,
      qlf: null,
      pnlTitleSVG: null,
      laDiscographieSVG: null,
      dfSVG: null,
      dllSVG: null,
      lmcSVG: null,
      qlfSVG: null,
    },

    init()
    {

        this.everythingContainer = new THREE.Group();
        sceneManager.addObject(this.everythingContainer);


        const DF = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: experienceManager.texturesObjects.dfTexture,

            })
        )
        DF.name = 'DF'

        DF.position.set(-7, 0, -1.81)
        DF.rotation.set(0, 0, 0)
        DF.scale.set(1.12, 1.12, 1.12)


        this.objects.df = DF
        sceneManager.addObject(DF)


        const DLL = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: experienceManager.texturesObjects.dllTexture,

            })
        )
        DLL.name = 'DLL'

        DLL.position.set(7, 0, -2.41)
        DLL.rotation.set(0,0,0)
        DLL.scale.set(1.08, 1.08, 1.08)


        this.objects.dll = DLL
        sceneManager.addObject(DLL)

        const LMC = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: experienceManager.texturesObjects.lmcTexture,

            })
        )
        LMC.name = 'LMC'

        LMC.position.set(-7, 0, -2.91)
        LMC.rotation.set(0, 0, 0)


        this.objects.lmc = LMC
        sceneManager.addObject(LMC)

        const QLF = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: experienceManager.texturesObjects.qlfTexture,

            })
        )
        QLF.name = 'QLF'

        QLF.position.set(7, 0, -3.31)
        QLF.rotation.set(0, 0, 0)

        this.objects.qlf = QLF
        sceneManager.addObject(QLF)

        // SVGs
        this.objects.pnlTitleSVG = experienceManager.svgObjects.pnlTitleSVG
        this.objects.pnlTitleSVG.name = 'PNL Title'
        this.objects.pnlTitleSVG.position.set(-2.100, -0.410, -1.200);
        this.objects.pnlTitleSVG.rotation.set(0, 0, 0);
        this.objects.pnlTitleSVG.scale.set(0.014, 0.014, 0.014);
        this.setOpacity(this.objects.pnlTitleSVG, 0)
        this.setColor(this.objects.pnlTitleSVG, '#ED6A65')

        sceneManager.addObject(this.objects.pnlTitleSVG)

        this.objects.laDiscographieSVG = experienceManager.svgObjects.laDiscographieSVG
        this.objects.laDiscographieSVG.position.set(-1.550, -1.210, -1.500);
        this.objects.laDiscographieSVG.rotation.set(0, 0, 0);
        this.objects.laDiscographieSVG.scale.set(0.005, 0.005, 0.005);
        this.setOpacity(this.objects.laDiscographieSVG, 0);
        this.setColor(this.objects.laDiscographieSVG, '#71F9FC');

        sceneManager.addObject(this.objects.laDiscographieSVG)



        this.objects.dfSVG = experienceManager.svgObjects.dfSVG
        this.setOpacity(this.objects.dfSVG, 0);
        sceneManager.addObject(this.objects.dfSVG)


        this.objects.dllSVG = experienceManager.svgObjects.dllSVG
        this.setOpacity(this.objects.dllSVG, 0);
        sceneManager.addObject(this.objects.dllSVG)

        this.objects.lmcSVG = experienceManager.svgObjects.lmcSVG
        this.setOpacity(this.objects.lmcSVG, 0);
        sceneManager.addObject(this.objects.lmcSVG)

        this.objects.qlfSVG = experienceManager.svgObjects.qlfSVG
        this.setOpacity(this.objects.qlfSVG, 0);
        sceneManager.addObject(this.objects.qlfSVG)



        // START ANIMATION
        this.startIntro();

    },
    setColor(mesh, color){
        mesh.children.forEach((child) =>
        {
            child.material.color = new THREE.Color(color);
        })
    },
    setOpacity(mesh, opacity){
        mesh.children.forEach((child) =>
        {
            child.material.transparent = true;
            child.material.opacity = opacity;
        })

    },
    startIntro(){
        /**
         * FADE IN & ZOOM
         */
        // Scene Background
        gsap.to(renderer.getRenderer(), {
            setClearColor: '#4F5E92',
            duration: 2,
        })

        // PNL TITLE
        this.objects.pnlTitleSVG.children.forEach((child) =>
        {
            gsap.to(child.material, {
                duration: 1,
                delay: 1,
                opacity:1
            })
        })
        gsap.to(this.objects.pnlTitleSVG.scale, {
            delay: 1,
            duration: 1,
            x: 0.014,
            y: 0.014,
            z:0.014
        })
        // LA DISCOGRAPHIE TITLE
        this.objects.laDiscographieSVG.children.forEach((child) =>
        {
            gsap.to(child.material, {
                duration: 1,
                delay: 1,
                opacity:1
            })
        })
        gsap.to(this.objects.laDiscographieSVG.scale, {
            delay:1,
            duration: 1,
            x: 0.0055,
            y: 0.0055,
            z:0.0055
        })

        /**
         * COVER APPARITION
         */
        // Setting GSAP timeline
        const introAnimationCovers = gsap.timeline(
            {
                repeat: 0,
                onComplete: this.initMainNavigation.bind(this)
            })
        // DEUX FRÈRES ANIMATION POSITION
        introAnimationCovers.to(this.objects.df.position,
            {
                duration: 1,
                delay: 2,
                x:0
            },0)

        // DANS LA LÉGENDE ANIMATION POSITION
        introAnimationCovers.to(this.objects.dll.position,
            {
                duration: 1,
                delay: 2,
                x:0
            },0)

        // LE MONDE CHICO ANIMATION POSITION
        introAnimationCovers.to(this.objects.lmc.position,
            {
                duration: 1,
                delay: 2,
                x:0
            },0)

        // QUE LA FAMILLE ANIMATION POSITION
        introAnimationCovers.to(this.objects.qlf.position,
            {
                duration: 1,
                delay: 2,
                x:0
            },0)
    },
    initMainNavigation(){
        console.log(this.objects)
        /**
         * ROTATE
         */
        const initializeMainNav = gsap.timeline(
            {
                repeat: 0,
                onComplete: this.setupComplete.bind(this)
            })

        // PNL Title: rotation
        initializeMainNav.to(this.objects.pnlTitleSVG.rotation,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: - Math.PI / 5,
                z: 0
            }, 0)

        // La Discographie: rotation
        initializeMainNav.to(this.objects.laDiscographieSVG.rotation,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: - Math.PI / 5,
                z: 0
            }, 0)

        //DF: rotation
        initializeMainNav.to(this.objects.df.rotation,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: - Math.PI / 5,
                z: 0
            }, 0)

        // DLL: rotation
        initializeMainNav.to(this.objects.dll.rotation,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: - Math.PI / 5,
                z: 0
            }, 0)

        // LMC: rotation
        initializeMainNav.to(this.objects.lmc.rotation,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: - Math.PI / 5,
                z: 0
            }, 0)

        // QLF: rotation
        initializeMainNav.to(this.objects.qlf.rotation,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: - Math.PI / 5,
                z: 0
            }, 0)
        /**
         * POSITION
         */

        // PNL Title: position
        initializeMainNav.to(this.objects.pnlTitleSVG.position,
            {
                duration: 1,
                delay: 0.5,
                x:-2.3,
                y: -0.29,
                z: -3.14
            }, 0)

        // La Discographie: position
        initializeMainNav.to(this.objects.laDiscographieSVG.position,
            {
                duration: 1,
                delay: 0.5,
                x:-2.81,
                y: -1.28,
                z: -2.47
            }, 0)

        //DF: position
        initializeMainNav.to(this.objects.df.position,
            {
                duration: 1,
                delay: 0.5,
                x:0,
                y: 0,
                z: -1.8
            }, 0)

        // DLL: position
        initializeMainNav.to(this.objects.dll.position,
            {
                duration: 1,
                delay: 0.5,
                x:0.55,
                y: 0,
                z: -2.4
            }, 0)

        // LMC: position
        initializeMainNav.to(this.objects.lmc.position,
            {
                duration: 1,
                delay: 0.5,
                x:1.27,
                y: 0,
                z: -4.23
            }, 0)

        // QLF: position
        initializeMainNav.to(this.objects.qlf.position,
            {
                duration: 1,
                delay: 0.5,
                x: 2.34,
                y: 0,
                z: -8.43
            }, 0)

    },
    setupComplete(){
        this.everythingContainer.add(this.objects.pnlTitleSVG);
        this.everythingContainer.add(this.objects.laDiscographieSVG);
        this.everythingContainer.add(this.objects.df);
        this.everythingContainer.add(this.objects.dll);
        this.everythingContainer.add(this.objects.lmc);
        this.everythingContainer.add(this.objects.qlf);

        debugPanel.initEverythingContainer();
    }
}

export default scenography;