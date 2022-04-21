import renderer from './renderer'
import sceneManager from "./managers/sceneManager";
import gsap from 'gsap'

const raycasterScenography = {
    hoverAlbum(album){
        switch (album) {
            case 'DF':
                console.log('df album');
                this.moveAlbum('DF');
                break;
            case 'DLL':
                console.log('dll album')
                this.moveAlbum('DLL');

                break;
            case 'LMC':
                console.log('lmc')
                this.moveAlbum('LMC');

                break;
            case 'QLF':
                console.log('qlf')
                this.moveAlbum('QLF');

                break;
        }
    },
    moveAlbum(album)
    {
        this.lastHoverElement = renderer.hoveredElementsHistory[0];
        this.actualObject = sceneManager.getThreeScene().getObjectByName(album);

        gsap.to(this.actualObject.position, {
           x: this.actualObject.position.x + 2
        });

        // don't forget if hoveredElementsHistory[0] && hoveredElementsHistory[1] are equal
    }
}

export default raycasterScenography;