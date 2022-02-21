// import signal from 'signal';

const router = {
    init(){
        this.currentScreen = 0;
    },
    getCurrentScreen(){
        return this.currentScreen;
    },
    setScreen(index){
        this.currentScreen = index;
        // signal.emit('changeScreen', this.currentScreen);
    }
}

export default router;