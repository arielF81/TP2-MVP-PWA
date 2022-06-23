if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js").then((message) => {
        console.log('sw anda');
    });
} else {
    console.log('sw no soportado');
}