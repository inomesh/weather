// this file is for checking and 
// setting service worker only.

window.addEventListener('load',()=>{

    if (!('serviceWorker' in navigator)){
        console.log("service worker not supported");
        return
    };

    navigator.serviceWorker.register('/sw.js',{
        scope: '/'
    })
    .then(function(registeration){
        console.log("SW is registered! this scope is ",registeration.scope);
    })
    .catch(function(error){
        console.error(error)
    })
})
