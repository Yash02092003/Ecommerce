gsap.to(".imagecontainer" , {
    ease : Expo.eaeInOut ,
    width : "100%",
    duration : 2 ,
    stagger : 2
})

gsap.to(".text h1" , {
    delay : 2,
    ease : Expo.eaeInOut ,
    stagger : 3,
    top : "-100%"
})