let tl = gsap.timeline();

tl.from("nav img" , {
    y : -100 ,
    opacity : 0,
    duration : 2,
})

tl.from("nav h3" , {
    y : -100 ,
    opacity : 0,
    duration : 2,
    stagger : 0.1
})

tl.from("nav button" , {
    y : -100 ,
    opacity : 0,
    duration : 2,
})

tl.from("#animation #left-image" , {
    x : -100,
    opacity: 0 ,
    duration: 2 
})

tl.from("#animation #right-image" , {
    x : 100,
    opacity: 0 ,
    duration: 2 
})

tl.from("#animation #top-image" , {
    y : 100,
    opacity: 0 ,
    duration: 2 ,
})