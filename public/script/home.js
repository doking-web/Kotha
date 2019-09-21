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
    setInterval(addm, 500);
    document.querySelector(".inputs > div")
        .prepend(renderMsg(msgData));
    document.querySelector("#send")
        .onclick = addMsg;
}

function addMsg(){
    
    const msgInput = document.querySelector("#messege")
    const msgVal = msgInput.value
    msgInput.value = "";
    
    const div = document.querySelector("#msgContent");
    
    const msg = document.createElement("div")
    const p = document.createElement("div")
    msg.classList.add("me");
    msg.id = "msg";
    p.innerText = msgVal;
    msg.appendChild(p);
    div.appendChild(msg);
}

function addm(){
    
    //const msgInput = document.querySelector("#messege")
    const msgVal = "bal"//msgInput.value
    
    const div = document.querySelector("#msgContent");
    
    const msg = document.createElement("div")
    const p = document.createElement("div")
    msg.classList.add("he");
    msg.id = "msg";
    p.innerText = msgVal;
    msg.appendChild(p);
    div.appendChild(msg);
}

function renderMsg(data){
    const div = document.createElement("div");
    div.id = "msgContent"
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





