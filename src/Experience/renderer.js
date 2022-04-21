import * as THREE from "three";
import raycaster from './raycaster'
import experienceManager from "./experienceManager";
import sceneManager from "./managers/sceneManager";
import scenography from "./scenography";
import raycasterScenography from "./raycasterScenography";

const renderer = {
    init(canvas)
    {
        // Initialize the WebGL renderer
        this.threeRenderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });

        // Setting parameters in order to make it work properly
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
        this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.threeRenderer.setClearColor('#0C1020');

        window.addEventListener('resize', () =>
        {
            this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
            this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    },
    getRenderer(){
        return this.threeRenderer;
    },
    draw(){
        this.threeRenderer.render(sceneManager.getThreeScene(), sceneManager.getThreeCamera());
    },




    /**
     * -------------- LOOP TICK FUNCTION --------------
     */
    startLoop()
    {
        this.clock = new THREE.Clock();
        this.lastElapsedTime = 0;

        this.currentIntersect = null;
        this.newNavigation = true;
        this.hoveredElementsHistory = [];

        this.tick = () =>
        {
            this.elapsedTime = this.clock.getElapsedTime();
            this.deltaTime = this.elapsedTime - this.lastElapsedTime;
            this.lastElapsedTime = this.elapsedTime;


            // Raycaster
            if(raycaster.getCameraControl())
            {

                raycaster.threeSetFromCamera();

                this.hoveringElements = [scenography.objects.df, scenography.objects.dll,
                    scenography.objects.lmc, scenography.objects.qlf]

                this.intersectObjects = raycaster.getRaycaster().intersectObjects(this.hoveringElements)

                if (this.intersectObjects.length)
                {
                    if (this.currentIntersect !== this.intersectObjects[0].object)
                    {
                        switch (this.intersectObjects[0].object.name)
                        {
                            case 'DF':
                                if (this.newNavigation)
                                {
                                    this.newNavigation = false;
                                    console.log('LA NEW NAVIGATION EST FALSE MTN')
                                    break;
                                } else {
                                    this.hoveredElementsHistory.length > 1 ? this.hoveredElementsHistory.shift() :                                     this.hoveredElementsHistory.push('DF');
                                    this.hoveredElementsHistory.push('DF');
                                    console.log('file d\'attente de hover:');
                                    console.log(this.hoveredElementsHistory);
                                    raycasterScenography.hoverAlbum('DF');
                                }
                                break;
                            case 'DLL':
                                this.hoveredElementsHistory.length > 1 ? this.hoveredElementsHistory.shift() :                                     this.hoveredElementsHistory.push('DF');
                                this.hoveredElementsHistory.push('DLL');
                                console.log('file d\'attente de hover:');
                                console.log(this.hoveredElementsHistory);
                                raycasterScenography.hoverAlbum('DLL');

                                break;
                            case 'LMC':
                                this.hoveredElementsHistory.length > 1 ? this.hoveredElementsHistory.shift() :                                     this.hoveredElementsHistory.push('DF');
                                this.hoveredElementsHistory.push('LMC');
                                console.log('file d\'attente de hover:');
                                console.log(this.hoveredElementsHistory);
                                raycasterScenography.hoverAlbum('LMC');

                                break;
                            case 'QLF':
                                this.hoveredElementsHistory.length > 1 ? this.hoveredElementsHistory.shift() :                                     this.hoveredElementsHistory.push('DF');
                                this.hoveredElementsHistory.push('QLF');
                                console.log('file d\'attente de hover:');
                                console.log(this.hoveredElementsHistory);
                                raycasterScenography.hoverAlbum('QLF');

                                break;

                            default:
                        }
                    }
                    this.currentIntersect = this.intersectObjects[0].object

                }
                else
                {
                    if (this.currentIntersect)
                    {
                        console.log('je suis dnas le else if ')
                    }
                    this.currentIntersect = null;
                }

            }

            // Render
            this.draw();

            // Call tick again on the next frame
            window.requestAnimationFrame(this.tick)
        }

        this.tick()
    }
}

export default renderer;