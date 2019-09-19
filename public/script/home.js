function setup(){
    
    document.querySelector(".chat-layout")
        .style.height = innerHeight+'px';

    const msgData=[
        {from:"he", msg:"hi"},
        {from:"me", msg:"hello"},
        {from:"he", msg:"nice"},
        {from:"me", msg:"why"},
        {from:"he", msg:"u r"},
        {from:"me", msg:"thx"},
        {from:"he", msg:"wc"},
        
        ]
    
    document.querySelector(".inputs")
        .prepend(renderMsg(msgData));
}

function renderMsg(data){
    const div = document.createElement("div");
    for(let i=0;i<data.length;i++){
        const msg = document.createElement("div")
        const p = document.createElement("div")
        msg.classList.add(data[i].from);
        msg.id = "msg";
        p.innerText = data[i].msg;
        msg.appendChild(p);
        div.appendChild(msg);
    }
    return div;
}

setup();





