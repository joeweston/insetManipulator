
class Border {
  constructor(insets = []){
    this._insets = insets;
    this._topInsets = insets.filter(inset => inset.side === "top");
    this._leftInsets = insets.filter(inset => inset.side === "left");
    this._bottomInsets = insets.filter(inset => inset.side === "bottom");
    this._rightInsets = insets.filter(inset => inset.side === "right");
  }
  addInsetTop(size, blur, color){
    let len = this._topInsets.length;
    if (len === 1){
      size += this._topInsets[0].size
    } 
    if (len > 1){
      size += this._topInsets[len - 1].size;
    }
    this._insets.push(new SubInset("top", size, blur, color));
    this._topInsets.push(new SubInset("top", size, blur, color));
    return this;
  }
  addInsetLeft(size, blur, color){
    let len = this._leftInsets.length;
    if (len === 1){
      size += this._leftInsets[0].size
    } 
    if (len > 1){
      size += this._leftInsets[len - 1].size;
    }
    this._insets.push(new SubInset("left", size, blur, color));
    this._leftInsets.push(new SubInset("left", size, blur, color));
    return this;
  }
  addInsetBottom(size, blur, color){
    let len = this._bottomInsets.length;
    if (len === 1){
      size += this._bottomInsets[0].size
    } 
    if (len > 1){
      size += this._bottomInsets[len - 1].size;
    }
    this._insets.push(new SubInset("bottom", size, blur, color));
    this._bottomInsets.push(new SubInset("bottom", size, blur, color));
    return this;
  }
  addInsetRight(size, blur, color){
    let len = this._rightInsets.length;
    if (len === 1){
      size += this._rightInsets[0].size
    } 
    if (len > 1){
      size += this._rightInsets[len - 1].size;
    }
    this._insets.push(new SubInset("right", size, blur, color));
    this._rightInsets.push(new SubInset("right", size, blur, color));
    return this;
  }
  addInset(side, size, blur, color){
    switch (side){
      case "top":
      this.addInsetTop(size, blur, color);
      break;
      case "left":
      this.addInsetLeft(size, blur, color);
      break;
      case "bottom":
      this.addInsetBottom(size, blur, color);
      break;
      case "right":
      this.addInsetRight(size, blur, color);
      break;
      default:
      throw "error, arg needs to be 'top', 'left', 'bottom' or 'right'."
    }
    return this;
  }


  removeInset(){
    let removed = this._insets.splice(-1, 1)[0].side;
    switch (removed) {
      case "top":
      this._topInsets.splice(-1, 1);
      break;
      case "left":
      this._leftInsets.splice(-1, 1);
      break;
      case "bottom":
      this._bottomInsets.splice(-1, 1);
      break;
      case "right":
      this._rightInsets.splice(-1, 1);
      break;
      default:
      throw "error, direction needs to be 'top', 'left', 'bottom' or 'right'."
    }
    return this;
  }
  get innerCss(){
    let cssString = ""
    for (let i = 0; i < this._insets.length; i++){
      if( i === 0 ){
        cssString += `                   ${this._insets[i].css}`
      } else{
        cssString +=`,\n                   ${this._insets[i].css}`
      }
    }
    if(this._insets.length === 0){
      cssString = "  none";
    }
    return cssString;
  }
  get css(){
    let innerCssString = this.innerCss;
    let cssString = "";
    cssString += `-webkit-box-shadow:\n${innerCssString}; \n`;
    cssString += `   -moz-box-shadow:\n${innerCssString};\n`;
    cssString += `        box-shadow:\n${innerCssString};`;
    return cssString;
  }

  get insetsCount(){
    return this._insets.length;
  }
  
}


class SubInset {
  constructor(side, size, blur, color){
    this._side = side;
    this._size = size;
    this._color = color;
    this._blur = blur
  }
  set side(val){
    this._size = val;
  }
  get side(){
    return this._side;
  }
  get size(){
    return this._size;
  }
  set size(val){
    this._size = val;
  }
  set color(val){
    this._color = val;
  }
  get blurActual(){
    return this._blur * 2;
  }
  get spreadActual(){
    return - Math.floor(this.blurActual * 0.7);
  }
  get hl(){
     switch ( this._side ){
      case "left":
        return `${this._size}`;
        break;
      case "right":
        return `-${this._size}`;
      default:
        return 0;
    }   
  }
  get vl(){
    switch ( this._side ){
      case "top":
        return `${this._size}`;
        break;
      case "bottom":
        return `-${this._size}`;
      default:
        return 0;
    }
  }
  get css(){
    return `inset ${this.hl}${this.hl === 0 ? "" : "px"} ${this.vl}${this.vl === 0 ? "" : "px"} ${this.blurActual}${this.blurActual === 0 ? "" : "px"} ${this.spreadActual}${this.spreadActual === 0 ? "" : "px"} ${this._color}`
  }
}
/*
var a = new SubInset("bottom", 20, 10, "green");
var b = new Border()
b.addInset("left", 20, 20 , "blue")
b.addInset("top", 20, 20 , "blue")
b.addInset("top", 20, 20 , "blue")
b.addInset("bottom", 20, 20 , "blue")
b.addInset("right", 20, 20 , "blue")
b.removeInset();
console.log(b.innerCss)*/





