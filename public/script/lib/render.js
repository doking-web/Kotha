
class renderDOM{
    constructor(el){
        this.root = dom.create(el);
    }

    add(el){
        const current = new renderDOM(el);
        this.root.appendChild(current);
        return current;
    }
    text(text){
        this.root.innerText = text;
        return this;
    }
    append(root){
        
        root.appendChild(this.root);
    }
}

class renderDOMError extends Error{

}


// My own library
const dom = { };


dom.create = (element) => document.createElement(element);

dom.for = function (data, callback){
    if(data === undefined) throw new renderDOMError("Data need for this operation");
    else if(Array.isArray(data)) {
        data.forEach(callback);
    }
    else throw new renderDOMError("Datatype not supported");

}

// dom.constructor = renderDOM.constructor;

function preConfigure(){
    HTMLElement.prototype.class = function (name){
        if(name) this.classList.add(name);
        else return this.classList;
        return this;
    };
    document.addEventListener("load", configure);

}




function configure(){

}

preConfigure();











