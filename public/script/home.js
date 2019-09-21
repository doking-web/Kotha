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

    function addm() {
        const msgVal = "bal";
        addMsg(msgVal, "he");
    }

    // TODO: remove below

    const msgData = [{
            from: "he",
            msg: "hi"
        },
        {
            from: "me",
            msg: "hello"
        },
        {
            from: "he",
            msg: "nice"
        },
        {
            from: "me",
            msg: "why"
        },
        {
            from: "he",
            msg: "u r"
        },
        {
            from: "me",
            msg: "thx"
        },
        {
            from: "he",
            msg: "wc"
        },

    ]
    setInterval(addm, 500);

    msgData.forEach(msg => {
        addMsg(msg.msg, msg.from);
    });

}


setup();