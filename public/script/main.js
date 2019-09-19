document.querySelectorAll("nav li a")
    .forEach((a,i,l)=>{
    if(a.innerText.toLocaleLowerCase() 
        === document.title.toLocaleLowerCase())
        return l[i].classList.add("active");
});
navSwipe($("#navul"))

loaded()
$("main").style.marginTop = $("nav").getBoundingClientRect().height + "px";
$("#navul").style.top = $("nav").getBoundingClientRect().height + "px";
