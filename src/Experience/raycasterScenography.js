const raycasterScenography = {
    hoverAlbum(album){
        switch (album) {
            case 'DF':
                this.newNavigation = false;
                if (this.newNavigation)
                {
                    console.log('df album')
                } else {
                    this.newNavigation = true;
                }
                break;
        }
    }
}

export default raycasterScenography;