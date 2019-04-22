export default class SignalCanvas{
    constructor(name){
        this.size = 300;
        this.signal_color = ['rgb(124,252,0)','rgba(255,255,0)','rgba(242, 38, 1)'];
        this.name = name;
        this.initializeCanvas(name);
    }
    
    initializeCanvas(){
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width',this.size);
        this.canvas.setAttribute('height',this.size);
        this.canvas.setAttribute('id',this.name);
        // document.body.appendChild(this.canvas)   
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.size/2;
        this.centerY = this.size/4;
        this.radius = 6;
    }

    drawCircle(startAngle, endAngle, color_index){
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle*Math.PI, endAngle*Math.PI, false)
        this.ctx.lineWidth = 12;
        this.ctx.strokeStyle = this.signal_color[color_index]
        this.ctx.stroke()
    }

    drawLeftHalfOfCircle(color_index){
        this.drawCircle(0.5, 1.5, color_index)
    }

    drawRightHalfOfCircle(color_index){
        this.drawCircle(1.5, 2.5, color_index)
    }

    drawTopHalfOfCircle(color_index){
        this.drawCircle(0, 1, color_index)
    }

    drawBottomHalfOfCircle(color_index){
        this.drawCircle(1, 2, color_index)
    }

    drawLeftDiagOfCircle(color_index){
        this.drawCircle(0.25, 1.25, color_index)
    }

    drawRightDiagOfCircle(color_index){
        this.drawCircle(1.25, 2.25, color_index)
    }


    drawFullCircle(color_index){
        this.drawCircle(0, 2, color_index)    
    }

    getCanvas(){
        return this.canvas;
    }
}
