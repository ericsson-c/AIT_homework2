// drawing.js

fs = require('fs');

class GenericElement {
   constructor(name) {
        // insert name into headers (<name ... </name>)
        this.name = name;
   }

   toString() {
       return '';
   }

    addAttr(name, value) {
        this[name] = value;
    }

    setAttr(name, value){
        this.addAttr(name, value);
    }

    addAttrs(obj) {
        const entries = Object.entries(obj);
        const reducer = function(prev, curr) {
            this[curr[0]] = curr[1];
        }
        entries.reduce(reducer.bind(this), entries[0]);
    }

    removeAttrs(arr) {

        const reducer = function(prev, curr) {
            if (this.hasOwnProperty(curr)) {
                delete this[curr];
            }
        }
        arr.reduce(reducer.bind(this));
    }

    addChild(child) {
        this.children.push(child);
    }
}

class RootElement extends GenericElement {
    constructor(...args) {
        super(args[0]);
        this.header = 'xmlns="http://www.w3.org/2000/svg">\n';
        this.children = [];
    }

    toString() {
        let output = '<svg ' + this.header;
        const addChildren = function (prev, curr) {
            output += curr.toString() + '\n';
        }
        this.children.reduce(addChildren, this[0]);
        output += '\n</svg>';

        return output;
    }
    
    write(fileName, cb) {
    
        const data = this.toString();
        fs.writeFile(fileName, data, cb);
    }
}

class RectangleElement extends RootElement {
   constructor(x, y, width, height, fill) {
        super('rect');
        this['x'] = x;
        this['y'] = y;
        this['width'] = width;
        this['height'] = height;
        this['fill'] = fill;
   }

   toString() {

        let output = '';
        output += 
        `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.fill}"></rect>`;
        return output;
   }
}

class TextElement extends RootElement{
    constructor(x, y, fontSize, fill, content) {
        super('text');
        this['x'] = x;
        this['y'] = y;
        this['fontSize'] = fontSize;
        this['fill'] = fill;
        this['content'] = content;
    }

    toString() {

        let output = '';
        output +=
        `<text x="${this.x}" y="${this.y}" fill="${this.fill}" font-size="${this.fontSize}">${this.content}</text>"`;
        return output;
   }
}


// the following is used for testing
// create root element with fixed width and height
const root = new RootElement();
root.addAttrs({width: 800, height: 170, abc: 200, def: 400});
root.removeAttrs(['abc','def', 'non-existent-attribute']);

// create circle, manually adding attributes, then add to root element
const c = new GenericElement('circle');
c.addAttr('r', 75);
c.addAttr('fill', 'yellow');
c.addAttrs({'cx': 200, 'cy': 80});
root.addChild(c);

// create rectangle, add to root svg element
const r = new RectangleElement(0, 0, 200, 100, 'blue');
root.addChild(r);

// create text, add to root svg element
const t = new TextElement(50, 70, 70, 'red', 'wat is a prototype? 😬');
root.addChild(t);

// show string version, starting at root element
console.log(root.toString());

// write string version to file, starting at root element
root.write('test.svg', () => console.log('done writing!'));


// my tests:

/*
let test = new RootElement('name', 'name2');
test.addAttrs({'x': 'y','a':'b'});
//test.removeAttrs({'arr': ['x','a']});
test.addChild(new RectangleElement(50, 50, 100, 500, 'blue'));
//console.log(test.toString());
const callback = (err) => {
    if (err) {
        console.log(err);
    } else return;
}
//test.write('text.svg', callback);
*/