import * as THREE from "three";
import {MeshBasicMaterial} from "three";
import sceneManager from "./managers/sceneManager";
import experienceManager from "./experienceManager";

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




        const DF = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: experienceManager.texturesObjects.dfTexture,

            })
        )
        DF.name = 'DF'

        DF.position.set(0, 0, 0)
        DF.rotation.x = 0
        DF.rotation.y = - Math.PI / 4.5

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

        DLL.position.set(0, 0, 0)
        DLL.rotation.x = 0
        DLL.rotation.y = - Math.PI / 4.5

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

        LMC.position.set(0, 0, 0)
        LMC.rotation.x = 0
        LMC.rotation.y = - Math.PI / 4.5

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

        QLF.position.set(0, 0, 0)
        QLF.rotation.x = 0
        QLF.rotation.y = - Math.PI / 4.5

        this.objects.qlf = QLF
        sceneManager.addObject(QLF)

        // SVGs
        this.objects.pnlTitleSVG = experienceManager.svgObjects.pnlTitleSVG
        this.objects.pnlTitleSVG.name = 'PNL Title'
        this.objects.pnlTitleSVG.position.y = -1
        this.objects.pnlTitleSVG.transparent = true;
        this.objects.pnlTitleSVG.opacity = 0
        sceneManager.addObject(this.objects.pnlTitleSVG)

        this.objects.laDiscographieSVG = experienceManager.svgObjects.laDiscographieSVG
        sceneManager.addObject(this.objects.laDiscographieSVG)

        this.objects.dfSVG = experienceManager.svgObjects.dfSVG
        sceneManager.addObject(this.objects.dfSVG)

        this.objects.dllSVG = experienceManager.svgObjects.dllSVG
        sceneManager.addObject(this.objects.dllSVG)

        this.objects.lmcSVG = experienceManager.svgObjects.lmcSVG
        sceneManager.addObject(this.objects.lmcSVG)

        this.objects.qlfSVG = experienceManager.svgObjects.qlfSVG
        sceneManager.addObject(this.objects.qlfSVG)

    }
}

export default scenography;