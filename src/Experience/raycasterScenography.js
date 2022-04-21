import renderer from './renderer'
import sceneManager from "./managers/sceneManager";
import gsap from 'gsap'
import discoverAlbumManager from "./managers/discoverAlbumManager";

const raycasterScenography = {
    hoverAlbum(album){


        window.addEventListener('click', this.onClick)


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
           x: this.actualObject.position.x + 0.05
        });

        // don't forget if hoveredElementsHistory[0] && hoveredElementsHistory[1] are equal
    },
    onClick(event)
    {
        this.actualHoverElement = renderer.hoveredElementsHistory[1];

        if (this.actualHoverElement)
        {
            // if (this.actualHoverElement === renderer.hoveredElementsHistory[0])
            // {
            //     console.log('les meme donc pas de click sale fou va')
            // } else {
                discoverAlbumManager.discoverDeuxFreres();
                console.log('clicked on ', this.actualHoverElement)
            // }
        }
    }
}

export default raycasterScenography;