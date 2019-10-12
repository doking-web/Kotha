async function getConversetions(){
    const con = await fetch("/user/conversetions",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    const json = await con.json()
    return json;
}

function displayConversetions(data){ 
 
}

function setup() {
    $(".chat-layout").style.height = innerHeight + 'px';
    const msgInput = $("#messege");

    $("#msg_form").onsubmit = () => {
        addMsg(msgInput.value, "me");
        msgInput.value = "";
        return false;
    };

    function addMsg(val, from) {

        const div = $("#msgContent");

        const msg = document.createElement("div")
        const p = document.createElement("div")
        msg.classList.add(from);
        msg.id = "msg";
        p.innerText = val;
        msg.appendChild(p);
        div.appendChild(msg);
        scrollToBottom();
    }

    function scrollToBottom(){
        const div = $("#msgContent");
        div.parentElement.scrollTop = div.scrollHeight;
    }

    getConversetions().then(displayConversetions)


}
setup();