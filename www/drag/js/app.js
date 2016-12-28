/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.mobilecheck = function() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


var canvas = document.createElement("canvas");
// Get WebGLRenderingContext from canvas element.
var gl = canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");
// Report the result.
if (gl && gl instanceof WebGLRenderingContext) {;
} else {

    document.getElementById("progress").innerHTML = "This app requires</br>webGL"
        //window.location.href = "http://www.google.com";
}


//------------------------------------------------------------------------------------------------------
// webgl line helper
var utils = PIXI.utils;

PIXI.GraphicsRenderer.prototype.buildPolygonLine = PIXI.GraphicsRenderer.prototype.buildLine;

PIXI.GraphicsRenderer.prototype.buildLine = function(graphicsData, webGLData) {
    if (graphicsData.lineWidth === 1) {
        webGLData.drawNativeLine = true;
        this.buildNativeLine(graphicsData, webGLData);
    } else {
        webGLData.drawNativeLine = false;
        this.buildPolygonLine(graphicsData, webGLData);
    }
};

PIXI.GraphicsRenderer.prototype.buildNativeLine = function(graphicsData, webGLData) {

    var i = 0;
    var points = graphicsData.points;

    if (points.length === 0) return;


    var verts = webGLData.points;
    //var indices = webGLData.indices;
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length / 6;

    // sort color
    var color = utils.hex2rgb(graphicsData.lineColor);
    var alpha = graphicsData.lineAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var wth = 1.0 / drawScaleAmt;
    //console.log(wth);
    var p1x, p1y, p2x, p2y;

    if (myGui.lineShadow === true) {
        for (i = 1; i < length; i++) {

            var alpha2 = (i - 1) / length;
            var alpha3 = i / length;
            p1x = points[(i - 1) * 2];
            p1y = points[(i - 1) * 2 + 1];

            p2x = points[i * 2];
            p2y = points[i * 2 + 1];

            var dx = p2x - p1x;
            var dy = p2y - p1y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            dx /= dist;
            dy /= dist;
            dx *= myGui.shadowWidth * Math.pow(alpha2, 2.0) * wth;
            dy *= myGui.shadowWidth * Math.pow(alpha2, 2.0) * wth;

            alpha2 *= myGui.shadowAlpha;
            alpha3 *= myGui.shadowAlpha;
            verts.push(p1x, p1y);
            verts.push(0.0, 0.0, 0.0, alpha2);


            verts.push(p1x - dy, p1y + dx);
            verts.push(0.0, 0.0, 0.0, 0.0);


            verts.push(p2x, p2y);
            verts.push(0.0, 0.0, 0.0, alpha3);



            verts.push(p2x - dy, p2y + dx);
            verts.push(0.0, 0.0, 0.0, 0.0);


            if (i == length - 1) {
                verts.push(p2x - dy, p2y + dx);
                verts.push(1.0, 1.0, 1.0, 0.0);

            }
        }
    }


    for (i = 1; i < length; i++) {

        var alpha2 = (i - 1) / length;
        var alpha3 = i / length;
        p1x = points[(i - 1) * 2];
        p1y = points[(i - 1) * 2 + 1];

        p2x = points[i * 2];
        p2y = points[i * 2 + 1];

        var dx = p2x - p1x;
        var dy = p2y - p1y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        dx /= dist;
        dy /= dist;
        dx *= myGui.lineWidth * Math.pow(alpha2, myGui.lineFadePower) * wth;
        dy *= myGui.lineWidth * Math.pow(alpha2, myGui.lineFadePower) * wth;

        if (myGui.bFadeLine) {
            alpha2 *= 1.0 * ((1.0 - velStopEnergy) * 0.5 + 0.5);
            alpha3 *= 1.0 * ((1.0 - velStopEnergy) * 0.5 + 0.5);
        } else {
            alpha2 *= 1.0;
            alpha3 *= 1.0;
        }

        if (i == 1) {
            verts.push(p1x, p1y);
            verts.push(1.0, 1.0, 1.0, alpha2);
        }

        verts.push(p1x - dy, p1y + dx);
        verts.push(1.0, 1.0, 1.0, alpha2);



        verts.push(p1x + dy, p1y - dx);
        verts.push(1.0, 1.0, 1.0, alpha2);



        verts.push(p2x - dy, p2y + dx);
        verts.push(1.0, 1.0, 1.0, alpha3);



        verts.push(p2x + dy, p2y - dx);
        verts.push(1.0, 1.0, 1.0, alpha3);



    }


    /*for (i = 0; i < indexCount; i++) {
        indices.push(indexStart++);
    }*/

};

PIXI.GraphicsRenderer._oldRender = PIXI.GraphicsRenderer.prototype.render;

PIXI.GraphicsRenderer.prototype.render = function(graphics) {
    var renderer = this.renderer;
    var gl = renderer.gl;
    var shader = renderer.shaderManager.plugins.primitiveShader,
        webGLData;

    if (graphics.dirty || !graphics._webGL[gl.id])
        this.updateGraphics(graphics, gl);

    var webGL = graphics._webGL[gl.id];
    // This could be speeded up for sure!
    renderer.blendModeManager.setBlendMode(graphics.blendMode);
    // var matrix = graphics.worldTransform.clone();
    // var matrix = renderer.currentRenderTarget.projectionMatrix.clone();
    // matrix.append(graphics.worldTransform);
    for (var i = 0; i < webGL.data.length; i++) {
        if (webGL.data[i].mode === 1) {
            webGLData = webGL.data[i];
            renderer.stencilManager.pushStencil(graphics, webGLData, renderer);
            // render quad..
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
            renderer.stencilManager.popStencil(graphics, webGLData, renderer);
        } else {
            webGLData = webGL.data[i];
            shader = renderer.shaderManager.primitiveShader;
            renderer.shaderManager.setShader(shader); //activatePrimitiveShader();

            // if (Math.random(0,1) > 0.99){
            //     console.log(renderer);
            // }
            //renderer.bindTexture(texTest.texture, 0);
            //gl.bindTexture(gl.TEXTURE_2D, texTest.texture.baseTexture._glTextures[gl.id]);
            gl.uniformMatrix3fv(shader.uniforms.translationMatrix._location, false, graphics.worldTransform.toArray(true));
            gl.uniformMatrix3fv(shader.uniforms.projectionMatrix._location, false, renderer.currentRenderTarget.projectionMatrix.toArray(true));
            gl.uniform3fv(shader.uniforms.tint._location, utils.hex2rgb(graphics.tint));
            gl.uniform1f(shader.uniforms.alpha._location, graphics.worldAlpha);
            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
            gl.vertexAttribPointer(shader.attributes.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.attributes.aColor, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
            //gl.vertexAttribPointer(shader.attributes.aTextureCoord, 2, gl.FLOAT, false, 4 * 8, 6*4);

            // if (Math.random() > 0.99){
            //     console.log(texTest.texture.baseTexture._glTextures[gl.id]);
            // }

            if (webGLData.drawNativeLine) {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, webGLData.points.length / 6);
            } else {
                // set the index buffer!
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
                gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
            }
            //gl.bindTexture(gl.TEXTURE_2D, null);

        }
    }
};
//------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
// animation utils (can this be in the main anim loop)?
function fadeIn(elem, ms) {
    if (!elem)
        return;

    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "inline-block";
    elem.style.visibility = "visible";

    if (ms) {
        var opacity = 0;
        var timer = setInterval(function() {
            opacity += 50 / ms;
            if (opacity >= 1) {
                clearInterval(timer);
                opacity = 1;
            }
            elem.style.opacity = opacity;
            elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }, 50);
    } else {
        elem.style.opacity = 1;
        elem.style.filter = "alpha(opacity=1)";
    }
}

function fadeOut(elem, ms) {
    if (!elem)
        return;

    if (ms) {
        var opacity = 1;
        var timer = setInterval(function() {
            opacity -= 50 / ms;
            if (opacity <= 0) {
                clearInterval(timer);
                opacity = 0;
                elem.style.display = "none";
                elem.style.visibility = "hidden";
            }
            elem.style.opacity = opacity;
            elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        }, 50);
    } else {
        elem.style.opacity = 0;
        elem.style.filter = "alpha(opacity=0)";
        elem.style.display = "none";
        elem.style.visibility = "hidden";
    }
}
//------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
// data loading: 
var loadedJson = false;
var dataobj;

function readTextFile(file, callback) {

    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            callback(rawFile.status, rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/site/www/drag/dataobj.json", function(code, data) {

    dataobj = JSON.parse(data);

    // calc and sort the angle length
    for (var i = 0; i < dataobj.length; i++) {
        var startAngle = 0;
        for (var j = 0; j < dataobj[i].angleDiffs.length; j++) {
            startAngle += dataobj[i].angleDiffs[j];
        }
        dataobj[i].angleChange = startAngle;
    }

    dataobj.sort(function(a, b) {
        return (a.angleChange > b.angleChange) ? 1 : ((b.angleChange > a.angleChange) ? -1 : 0);
    });

    console.log("done loading text");

    loadedJson = true;
});

// Update DOM elements with new data
function updateMetadata(data) {

    var line1 = data['line-1'] || '';
    var line2 = data['line-2'] || '';
    var attribution = data['attribution'] || '';
    var url = data['url'] || '';

    document.getElementById('info-link').innerHTML = line1 + "<br>" + line2;
    document.getElementById('info-link').href = url;
    document.getElementById('info-attribution').innerText = attribution;

    ga('send', 'event', 'Swipe', 'Swipe', data['line-1'] + ' ' + data['line-2']);
}

// Load metadata
var metadata = {};
readTextFile('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/site/www/drag/metadata-converted.json', function(code, data) {
    metadata = JSON.parse(data);
});

//------------------------------------------------------------------------------------------------------
// gui
//-------------------------------------------
var Gui = function() {
    this.lineColor = 0xffffff;
    this.lineOpacity = 0.7;
    this.lineWidth = 2;
    this.lineShadow = true;
    this.shadowWidth = 8.2;
    this.lineFadePower = 5.0;
    this.shadowAlpha = 0.53;
    this.dragSpeed = 0.90;
    this.velSmoothRate = 0.9;
    this.angleSmoothRate = 0.505;
    this.centerSmoothRate = 0.95;
    this.bgOpacity = 0.63;

    this.scale = 0.7385;
    this.variableSizes = true;
    this.reverseSwipe = true;
    this.maxZoom = 0.55;
    this.explode = function() {;
    };

    //this.imageResolution = 1;
    //this.resScale = 1.0;

    this.bTint = true;
    this.tintAmount = 0.1;
    this.bFadeLine = true;

};
var myGui = new Gui();

var isDevMode = (window.location.hash.indexOf('dev') == -1) ? false : true;

var guiSettings = {
    "preset": "Default",
    "remembered": {
        "Default": {
            "0": {}
        },
        "Jeff": {
            "0": {
                "dragSpeed": 0.5680101608806096,
                "velSmoothRate": 0.8,
                "angleSmoothRate": 0,
                "scale": 1.6054191363251482,
                "centerSmoothRate": 0.8758679085520745,
                "variableSizes": false,
                "reverseSwipe": true
            }
        },
        "Takashi": {
            "0": {
                "lineColor": "#e8f700",
                "lineOpacity": 0.75,
                "lineWidth": 3,
                "lineShadow": false,
                "shadowDistance": 3,
                "shadowBlur": 4,
                "dragSpeed": 0.5149026248941575,
                "velSmoothRate": 0.8,
                "angleSmoothRate": 0.02,
                "scale": 1,
                "centerSmoothRate": 0.95,
                "variableSizes": false,
                "reverseSwipe": false
            }
        },
        "Zoom Out": {
            "0": {
                "lineColor": 16777215,
                "lineOpacity": 0.7,
                "lineWidth": 1,
                "lineShadow": false,
                "shadowDistance": 3,
                "shadowBlur": 4,
                "dragSpeed": 0.674225232853514,
                "velSmoothRate": 0.8,
                "angleSmoothRate": 0.09551227773073666,
                "scale": 0.7383573243014395,
                "centerSmoothRate": 0.95,
                "maxZoom": 0.5554614733276884,
                "variableSizes": true,
                "reverseSwipe": false
            }
        }
    },
    "closed": false,
    "folders": {}
};



window.onload = function() {

    if (isDevMode) {
        var gui = new dat.GUI({
            load: guiSettings
        });


        var f1 = gui.addFolder('line');

        f1.addColor(myGui, 'lineColor');
        f1.add(myGui, 'lineOpacity', 0, 1);
        f1.add(myGui, 'lineWidth', 1, 10);
        f1.add(myGui, 'lineFadePower', 0.9, 10.0);
        f1.add(myGui, 'lineShadow');
        f1.add(myGui, 'shadowWidth', 0, 100);
        f1.add(myGui, 'shadowAlpha', 0, 1);

        var f2 = gui.addFolder('animation');
        f2.add(myGui, 'dragSpeed', 0.1, 5);
        f2.add(myGui, 'velSmoothRate', 0.0, 1.0);
        f2.add(myGui, 'angleSmoothRate', 0.0, 1.0);
        f2.add(myGui, 'scale', 0.0, 10.0);
        f2.add(myGui, 'centerSmoothRate', 0.0, 1.0);
        f2.add(myGui, 'maxZoom', 0.0, 4.0);
        f2.add(myGui, 'variableSizes');
        f2.add(myGui, 'reverseSwipe');

        var f3 = gui.addFolder('look');
        f3.add(myGui, 'bTint');
        f3.add(myGui, 'tintAmount', 0, 1);
        f3.add(myGui, 'bgOpacity', 0, 1);
        f3.add(myGui, 'bFadeLine');


        // var f4 = gui.addFolder('resolution');
        // f4.add(myGui, 'imageResolution', 0, 1).step(1);

        // f4.add(myGui, 'resScale', 0, 10);



        gui.remember(myGui);

        gui.close();
    }

    //shadowToggle.onFinishChange(updateLineShadow);
};
//------------------------------------------------------------------------------------------------------


//-------------------------------------------



imageWithPts = function() {
    this.startIndex = 0;
    this.endIndex = 0;
    this.alpha = 0.0;
    this.alphaTarget = 0.0;
    this.bSetYet = false;
    this.bLoaded = false;
    this.index = -1; // where am I in the dataObj
    this.cacheIndex = -1; // where am I in the cache array
    this.loadedIndex = -1; // where am I in the loaded array 
    this.bin = -1;
    this.position = 0;
    this.curAngle = 0;
    this.midAngle = 0;
    this.midDistance = 0;
    this.lineScale = 1.0;

}

imageWithPts.prototype.loadImage = function(url) {
    this.sprite1 = PIXI.Sprite.fromImage(url, true);
    //this.ElapsedMilliseconds = new Date().getTime() - this.StartMilliseconds;
}

imageWithPts.prototype.ready = function(url) {
    //console.log("ready");
    //console.log(this);
    this.sprite1.alpha = 0.0;
    this.sprite1.anchor.x = 0;
    this.sprite1.anchor.y = 0;
    this.sprite1.position.x = -100;
    this.sprite1.position.y = -100;
    this.sprite1.scale.x = 0.05;
    this.sprite1.scale.y = 0.05;
    this.bLoaded = true;
    container.addChild(this.sprite1);
}

imageWithPts.prototype.update = function() {
    if (this.bLoaded == false) {
        if (!this.sprite1.texture.baseTexture.hasLoaded) {
            //this.sprite1.texture.baseTexture.on('loaded', this.ready);
        } else {
            this.ready();
        }
    }
}


function angleDistance(angleA, angleB) {
    var diff = angleA - angleB;
    while (diff < -Math.PI) {
        diff += 2 * Math.PI;
    }
    while (diff > Math.PI) {
        diff -= 2 * Math.PI;
    }
    return diff;
}

var isMobile = mobilecheck();

var centerX = 0.0;
var centerY = 0.0;
var lastPointX;
var lastPointY;
var centerDiffX = 0;
var centerDiffY = 0;

var adderSum = 0;
var velStopEnergy = 0;

var nBins = 10;
//var resolutionScaleFactor = 1.0;
//var noChange = [];


// for (var i = 0; i < dataobj.length; i++){
//     console.log(i + " " + dataobj[i].angleChange);
// }
//console.log(noChange.length);

// console.log(dataobj[0]['angleDiffs']);

pts = [];
ptsSmooth = [];

iwp = [];
iwpCache = [];


var bAmDrawing = false;
var updateGraphics = false;
var lastFrameTime = 0;
var counter = 0;
var lastSecond = 0;

var loadingVisible = true;
var loadingCount = 0;



// var w = window.innerWidth;
// var h = window.innerHeight;
var touchID;

var bBgShowing = false;
var bCanLoadNewBg = true;
var bgAlpha = 0.0;
var lastFilename;
var pzVelSmooth = 0.0;
var drawScaleAmt = 1.0;
var firstDragEvent = true;


var texTest = PIXI.Sprite.fromImage("../img/01-uv-texture.png", true);
texTest.alpha = 1.0;
texTest.position.x = -500;


var blurSprite = PIXI.Sprite.fromImage("../img/test/blur.jpg", true);
blurSprite.alpha = 0.0;


function getDimensions() {
    return {
        width: window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,

        height: window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight
    };
}

var dimensions = getDimensions();

var renderer = new PIXI.WebGLRenderer(dimensions.width, dimensions.height, {
    autoResize: true,
    backgroundColor: 0x000000
});

console.log(renderer);
//renderer.bindTexture(texTest.texture, 0);

var gl = renderer.gl;

//console.log(gl);

//PIXI.autoDetectRenderer(w, h, { backgroundColor : 0x000000 });



renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF, true);
stage.interactive = true;
stage.hitArea = new PIXI.Rectangle(0, 0, dimensions.width, dimensions.height);

var dropShadowFilter = new PIXI.filters.DropShadowFilter();
var drawing = new PIXI.Graphics();
var container = new PIXI.Container();
var overalContainer = new PIXI.Container();

var bgContainer = new PIXI.Container();

// function updateLineShadow(val) {
//     drawing.filters = val ? [ dropShadowFilter ] : null;
// }

bgContainer.addChild(blurSprite);
overalContainer.addChild(bgContainer);
overalContainer.addChild(container);
overalContainer.addChild(drawing);
stage.addChild(overalContainer);

bgContainer.addChild(texTest);
drawing.position.x = 0;
drawing.position.y = 0;


var diag = Math.sqrt(renderer.view.width * renderer.view.width + renderer.view.height * renderer.view.height);
drawScaleAmt = 1000 / diag;



window.onresize = function(event) {
    var w = window.innerWidth;
    var h = window.innerHeight; //this part resizes the canvas but keeps ratio the same    
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px"; //this part adjusts the ratio:    
    renderer.resize(w, h);
    var diag = Math.sqrt(renderer.view.width * renderer.view.width + renderer.view.height * renderer.view.height);
    drawScaleAmt = 1000.0 / diag;
    stage.hitArea = new PIXI.Rectangle(0, 0, w, h);
}

// Prevent the page from scrolling if swipe up/down with your finger on elements
// like the Draw/Swipe nav or the metadata info on the bottom
document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
});

//var targetAngle = 0;

var smoothPt = new Point(renderer.view.width * 0.5, renderer.view.height * 0.5);

var lastMouseX = 0;
var lastMouseY = 0;
var velThisFrame = 0;
var velSmooth = 0;

var lastDiff = new Point(0, 0);
var angleSmooth = 0;
//var angle = 0;
var myAngle = 0;
var frameNum = 0;
var bHaveShownInstructionGif = false;
var bInstructionGifCanFade = false;

// needed to sort on dataObj index angle..
function sortByAngle(dataToSortOn) {
    return function(a, b) {
        return (dataToSortOn[a.index].angleChange > dataToSortOn[b.index].angleChange) ? 1 : ((dataToSortOn[b.index].angleChange > dataToSortOn[a.index].angleChange) ? -1 : 0);
    }
}



function loadBgImage(fileToLoad) {

    //console.log("bg " + iwp[iwp.length - 1].origAngle);
    //console.log("loading " + fileToLoad);
    bgContainer.removeChild(blurSprite);
    blurSprite.texture.destroy(true);
    blurSprite.destroy();

    //https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/blur/1423.jpg
    blurSprite = PIXI.Sprite.fromImage('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/blur/' + fileToLoad, true);

    //https://storage.googleapis.com/navigator-media-usa/media/draw/v3/blurredImages/2.jpg

    bgContainer.addChild(blurSprite);

    var angle = 3.14 + (iwp[iwp.length - 1].curAngle - iwp[iwp.length - 1].origAngle);
    while (angle < -Math.PI) {
        angle += 2 * Math.PI;
    }
    while (angle > Math.PI) {
        angle -= 2 * Math.PI;
    }
    var newAngle = Math.round(angle / (Math.PI * 0.5)) * (Math.PI * 0.5)

    blurSprite.rotation = newAngle; //3.14 + (iwp[iwp.length - 1].curAngle - iwp[iwp.length - 1].origAngle);
    //iwp[iwp.length - 1].origAngle;
}



// 
//------------------------------------------------------------------------------------------------
function loadRandomIntoCache(useBins) {


    var limitToBin = false;
    var selectedBin = -1;

    if (useBins === true) {
        // calculate BINS 

        var bins = [];
        for (var i = 0; i < nBins; i++) {
            bins[i] = 0;
        }

        for (var i = 0; i < iwpCache.length; i++) {
            bins[iwpCache[i].bin]++;
        }

        var i,
            l,
            minVal,
            minIndex;
        minVal = Number.MAX_VALUE;
        for (i = 0, l = bins.length; i < l; i++) {
            if (minVal > bins[i]) {
                minVal = bins[i];
                minIndex = i;
            }
        }

        limitToBin = true;
        selectedBin = minIndex;
    }


    var goodToChooseFrom = [];
    for (var i = 0; i < dataobj.length; i++) {
        var isok = true;

        // if we are in the cache, don't load again! 
        for (var j = 0; j < iwpCache.length; j++) {
            if (iwpCache[j].index == i) {
                isok = false;
            }
        }

        // if we are on the screen, don't load again! 
        for (var j = 0; j < iwp.length; j++) {
            if (iwp[j].index == i) {
                isok = false;
            }
        }

        if (limitToBin === true) {
            var bin = Math.floor(i / ((dataobj.length / nBins)));
            if (bin != selectedBin) {
                isok = false;
            }
        }

        if (isok) {



            goodToChooseFrom.push(i);
        }
    }

    var goodOne = goodToChooseFrom[Math.floor(Math.random() * goodToChooseFrom.length)];

    var imageWithPtsTemp = new imageWithPts();

    imageWithPtsTemp.index = goodOne;
    imageWithPtsTemp.bin = Math.floor(goodOne / ((dataobj.length / nBins)));
    imageWithPtsTemp.startIndex = -1;
    imageWithPtsTemp.endIndex = -1;
    //console.log('imgsQuarterRes/' + dataobj[goodOne]['fileName']);
    //imageWithPtsTemp.texture = PIXI.Texture.fromImage('imgsQuarterRes/' + dataobj[goodOne]['fileName']);
    //imageWithPtsTemp.sprite1 = PIXI.Sprite.fromImage('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v1/imgsQuarterRes/' + dataobj[goodOne]['fileName'], true);

    //http://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/imgsQuarterRes75/1147.jpg


    if (isMobile) {
        imageWithPtsTemp.loadImage('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/imgsQuarterRes75/' + dataobj[goodOne]['fileName']);
        iwpCache.push(imageWithPtsTemp);
        //resolutionScaleFactor = 0.75;
    } else {
        imageWithPtsTemp.loadImage('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/imgsQuarterRes/' + dataobj[goodOne]['fileName']);
        iwpCache.push(imageWithPtsTemp);
        //resolutionScaleFactor = 1.0;
    }

    ///100069.jpg

    //imageWithPtsTemp.sprite1 = new PIXI.Sprite(imageWithPtsTemp.texture );

    // calc these things later
    //imageWithPtsTemp.origLength = len;
    //imageWithPtsTemp.origAngle = Math.atan2(diffy, diffx);

    //iwpCache.sort(sortByAngle(dataobj)); 

}



//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
var firstTouch = true;
stage.mousedown = stage.touchstart = function(moveData) {


    if (loadingVisible === true) return;


    if (bInstructionGifCanFade === true) {
        bInstructionGifCanFade = false;
        fadeOut(document.getElementById('instruction'), 10);
    }


    if (moveData.data.identifier === undefined) {
        touchID = 0;
    } else {
        touchID = moveData.data.identifier;
    }



    bAmDrawing = true;
    lastMouseX = moveData.data.global.x;
    lastMouseY = moveData.data.global.y;
};

stage.mouseupoutside = function(mouseData) {
    bAmDrawing = false;
}

stage.mouseout = function(moveData) {
    bAmDrawing = false;
}

stage.mousemove = stage.touchmove = function(moveData) {


    if (loadingVisible === true) return;



    if (bAmDrawing === true) {

        if (moveData.data.identifier !== undefined) {
            if (touchID !== moveData.data.identifier) {
                return;
            }
        }

        if (firstTouch) {
            firstTouch = false;
            //updateMetadata(matchedMetadata);
            //loading
            //document.body.removeChild(document.getElementById('instruction'));  
            //console.log(document.getElementById('loading'))
            //fadeOut( document.getElementById('loading'), 400 );
        }

        var diffx = (moveData.data.global.x - lastMouseX);
        var diffy = (moveData.data.global.y - lastMouseY);
        if (myGui.reverseSwipe) {
            diffx *= -1;
            diffy *= -1;
        }



        //angleSmooth =

        //console.log(moveData.data.global.x + " " + moveData.data.global.y + " " + diffx + " " + diffy);
        velThisFrame = Math.sqrt(diffx * diffx + diffy * diffy);
        lastDiff.x = diffx;
        lastDiff.y = diffy;


        if (firstDragEvent) {
            var angleDiff = Math.atan2(-lastDiff.y, -lastDiff.x);
            angleSmooth = angleDiff;
            firstDragEvent = false;
            myAngle = angleSmooth;
        }

        //console.log(len);
        lastMouseX = moveData.data.global.x;
        lastMouseY = moveData.data.global.y;


    }
};

stage.mouseup = stage.mouseupoutside = stage.touchend = stage.touchendoutside = function(moveData) {
    bAmDrawing = false;
};


animate();


var timef = 0;


function addLineFromCache(lineToAddFromCache) {


    //console.log("in add line from cache loaded len : " + loadedCache.length + " " + lineToAddFromCache);

    var lineToAdd = loadedCache[lineToAddFromCache].index;

    // var metaFilename = dataobj[lineToAdd].fileName.replace('jpg', 'json');
    // readTextFile('metadata/' + metaFilename.substr(0, 1) + '/' + metaFilename, updateMetadataCallback);
    var filename = dataobj[lineToAdd].fileName;

    lastFilename = filename;

    var id = filename.substr(0, filename.length - 4);
    if (firstTouch) {
        matchedMetadata = metadata[id];

        updateMetadata(matchedMetadata);
    } else {
        //console.log(id + " " + filename );
        updateMetadata(metadata[id]);
    }

    var diffx = dataobj[lineToAdd]['startPt'].x - dataobj[lineToAdd]['endPt'].x;
    var diffy = dataobj[lineToAdd]['startPt'].y - dataobj[lineToAdd]['endPt'].y;
    var len = Math.sqrt(diffx * diffx + diffy * diffy);

    if (pts.length == 0) {
        pts[0] = new Point(300, 300);
    }

    var startPt = pts.length - 1;

    var scaleMe = 1.0;
    if (myGui.variableSizes === true) {
        scaleMe = 0.75 + (Math.random() * 0.5);
    }

    for (var i = 0; i < dataobj[lineToAdd]['angleDiffs'].length; i++) {
        myAngle += dataobj[lineToAdd]['angleDiffs'][i];
        var p = pts[pts.length - 1];
        var newp = new Point(p.x + (300.0 / dataobj[lineToAdd]['angleDiffs'].length) * scaleMe * Math.cos(myAngle), p.y + (300.0 / dataobj[lineToAdd]['angleDiffs'].length) * scaleMe * Math.sin(myAngle));
        pts.push(newp);
    }

    var endPt = pts.length - 1;

    var imageWithPtsTemp = loadedCache[lineToAddFromCache];
    imageWithPtsTemp.startIndex = startPt;
    imageWithPtsTemp.endIndex = endPt;

    /*
    imageWithPtsTemp.texture = PIXI.Texture.fromImage('imgsQuarterRes/' + dataobj[lineToAdd]['fileName']);
    imageWithPtsTemp.sprite1 = new PIXI.Sprite(imageWithPtsTemp.texture );
    */
    imageWithPtsTemp.sprite1.alpha = 0.0;

    imageWithPtsTemp.sprite1.anchor.x = dataobj[lineToAdd]['startPt'].x / 2048.0;
    imageWithPtsTemp.sprite1.anchor.y = dataobj[lineToAdd]['startPt'].y / 2020.0;
    //console.log(imageWithPtsTemp.sprite1.anchor.x + " " + imageWithPtsTemp.sprite1.anchor.y);


    imageWithPtsTemp.origLength = len;
    imageWithPtsTemp.origAngle = Math.atan2(diffy, diffx);


    diffx = dataobj[lineToAdd]['startPt'].x - 2048 / 2;
    diffy = dataobj[lineToAdd]['startPt'].y - 2020 / 2;

    imageWithPtsTemp.midAngle = Math.atan2(diffy, diffx);
    imageWithPtsTemp.midDistance = Math.sqrt(diffx * diffx + diffy * diffy);

    imageWithPtsTemp.lineScale = len / 2876.0;

    //console.log("sprite " + lineToAddFromCache + " width "  + imageWithPtsTemp.sprite1.width);


    //container.addChild(imageWithPtsTemp.sprite1);
    //stage.removeChild(drawing);
    //stage.addChild(drawing);
    //stage.addChild(imageWithPtsTemp.texture);   

    // IWP     
    iwp.push(imageWithPtsTemp);
    while (iwp.length > 15) {
        container.removeChild(iwp[0].sprite1);
        iwp[0].sprite1.texture.destroy(true);
        iwp[0].sprite1.destroy();
        iwp.splice(0, 1);
    }

    // now, let's remove and add childs again. 

    for (var i = 0; i < iwp.length; i++) {
        container.removeChild(iwp[i].sprite1);
        container.addChild(iwp[i].sprite1);
    }


    loadRandomIntoCache(true);

    iwpCache.splice(loadedCache[lineToAddFromCache].cacheIndex, 1); // we need to know where we are in the cache array (diff then loaded aray)

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


var loadedCache = [];

function makeLoadedCache() {
    loadedCache = [];
    for (var i = 0; i < iwpCache.length; i++) {
        if (iwpCache[i].bLoaded === true) {
            loadedCache.push(iwpCache[i]);
        }
    }
    for (var i = 0; i < loadedCache.length; i++) {
        loadedCache[i].loadedIndex = i;
    }
}


//--------------------------------------------------------------------------------------------
function animate() {
    requestAnimationFrame(animate);

    if (loadedJson === false) {
        console.log("skipping frame");


        renderer.render(stage);
        return;

        // console.log(myGui.speed);
    } else {
        //console.log("good");
    }
    // check which iwpCaches have loaded: 

    // for (var i = 0; i < iwpCache.length; i++){

    //         console.log("iwpCache " + i + "," + iwpCache[i].index + "," + iwpCache[i].texture.baseTexture.hasLoaded);

    // }


    //------------------------------------------------------ load into cache: 
    if (frameNum > 0) {
        if (iwpCache.length < 50 && frameNum % 10 == 0) {
            loadRandomIntoCache(false);
        }
    }
    frameNum++;

    //console.log("------- new frame --------- ");

    for (var i = 0; i < iwpCache.length; i++) {
        iwpCache[i].update();
        iwpCache[i].cacheIndex = i;
    }

    makeLoadedCache();



    //console.log("iwpCache " + iwpCache.length + " loaded " + loadedCache.length);

    for (var i = 0; i < loadedCache.length; i++) {
        loadedCache[i].sprite1.alpha = 0.0;
        loadedCache[i].sprite1.anchor.x = 0;
        loadedCache[i].sprite1.anchor.y = 0;
        loadedCache[i].sprite1.position.x = -300; //Math.floor(i  % 10) * 25;
        loadedCache[i].sprite1.position.y = -300; //Math.floor(i / 10) * 25;; 
        loadedCache[i].sprite1.scale.x = 0.05;
        loadedCache[i].sprite1.scale.y = 0.05;

    }


    if (loadedCache.length > 20) {
        if (loadingVisible === true) {
            loadingVisible = false;

            //console.log(document.getElementById('loading'))
            fadeOut(document.getElementById('progress'), 10);
            console.log("fading out");

            if (bHaveShownInstructionGif === false) {
                elem = document.getElementById('instruction');

                ////www/img/instruction-swipe%402x.gif
                elem.src = '../img/instruction-swipe%402x.gif' + '?x=' + Math.random();
                elem.style.display = 'block';
                bHaveShownInstructionGif = true;
                bInstructionGifCanFade = true;
                //fadeIn(elem, 20);
            }



        }
    } else {

        if (loadingVisible === false) {
            loadingVisible = true;

            //console.log("fading in");

            fadeIn(document.getElementById('progress'), 10);
        }

        var len = loadedCache.length;
        if (len !== loadingCount) {

            loadingCount = len;

            if (document.getElementById("progress") != null) {
                //console.log("change");
                document.getElementById("progress").innerHTML = "Loading</br>" + Math.round((loadingCount / 20.0) * 100) + " / 100";
            }


        }

        renderer.render(stage);
        return;

    }

    if (firstDragEvent) {
        return;
    }

    if (loadedCache.length == 0) {
        console.log("skipping frame - no cache yet");
        renderer.render(stage);
        return;
    }

    if (bAmDrawing === false) {
        velThisFrame = 0;
    }

    velSmooth = (myGui.velSmoothRate) * velSmooth + (1.0 - myGui.velSmoothRate) * velThisFrame * drawScaleAmt;

    if (velThisFrame * drawScaleAmt < pzVelSmooth) {
        pzVelSmooth = (myGui.pzVelSmoothDownRate) * pzVelSmooth + (1.0 - myGui.pzVelSmoothDownRate) * velThisFrame * drawScaleAmt;
    } else {
        pzVelSmooth = (myGui.pzVelSmoothUpRate) * pzVelSmooth + (1.0 - myGui.pzVelSmoothUpRate) * velThisFrame * drawScaleAmt;
    }

    //console.log(velSmooth);
    var angleDiff = Math.atan2(-lastDiff.y, -lastDiff.x);
    var diffAngle = angleDiff - angleSmooth;
    while (diffAngle < -Math.PI) diffAngle += (2 * Math.PI);
    while (diffAngle > Math.PI) diffAngle -= (2 * Math.PI);

    angleSmooth += (1.0 - myGui.angleSmoothRate) * diffAngle;

    //while (angleSmooth > 2 * Math.PI) angleSmooth -= (2 * Math.PI);
    //while (angleSmooth < 0) angleSmooth += (2 * Math.PI);


    var adder = velSmooth * myGui.dragSpeed;
    //console.log("adding " + adder);
    // console.log("adding " + adder);

    if (adder < 0.1 && ptsSmooth.length > 100) {
        velStopEnergy = 0.99 * velStopEnergy + 0.01 * 1.0;
    } else {
        velStopEnergy = 0.9 * velStopEnergy + 0.1 * 0.0;
    }


    // logic for BG loading: 

    // console.log(velStopEnergy);

    if (velStopEnergy > 0.2) {
        bBgShowing = true;
        if (bCanLoadNewBg == true) {

            //console.log(lastFilename);
            //console.log("LOAD BG");
            loadBgImage(lastFilename);
            bCanLoadNewBg = false;
        }
    } else {
        bBgShowing = false;
    }

    if (bBgShowing == true) {
        bgAlpha = bgAlpha * 0.99 + 0.01 * myGui.bgOpacity;
    } else {
        bgAlpha = bgAlpha * 0.97 + 0.02 * 0.0;
    }

    if (velStopEnergy < 0.1) {
        bCanLoadNewBg = true;
    }



    //console.log(pts.length );
    if (ptsSmooth.length > 100) {
        //console.log("huh");
        blurSprite.alpha = bgAlpha; //velStopEnergy;
    } else {
        blurSprite.alpha = 0.0;
    }

    if (blurSprite.texture.baseTexture &&
        blurSprite.texture.baseTexture.hasLoaded) {
        var aspectScreen = renderer.view.width / renderer.view.height;
        var aspectImage = 512 / 505;

        blurSprite.anchor.x = 0.5;
        blurSprite.anchor.y = 0.5;

        blurSprite.position.x = renderer.view.width / 2;
        blurSprite.position.y = renderer.view.height / 2;

        if (aspectScreen > aspectImage) { // width of screen is greater, scale to width
            blurSprite.width = renderer.view.width;
            blurSprite.height = renderer.view.width * (1 / aspectImage);
        } else {
            blurSprite.height = renderer.view.height;
            blurSprite.width = renderer.view.height * (aspectImage);
        }

        blurSprite.width *= 1.05;
        blurSprite.height *= 1.05
    }


    adderSum += adder;

    if (loadedCache.length > 0) {
        if (Math.round(adderSum) >= pts.length && loadedCache.length > 0) {

            if (pts.length < 200) {

                //console.log("hi ! ??");

                var target = angleSmooth;
                var angleToFind = target - myAngle;
                var minDist = 10000000;
                var minIndex = -1;
                for (var i = 0; i < loadedCache.length; i++) {
                    var index = loadedCache[i].index;
                    //console.log(i + " " + dataobj[index].angleChange);
                    var dist = Math.abs(angleDistance(dataobj[index].angleChange, angleToFind));
                    if (dist < minDist) {
                        minDist = dist;
                        minIndex = i;
                    }
                }
                if (minIndex != -1 && Math.random() > 0.1) {
                    addLineFromCache(minIndex);
                    makeLoadedCache();
                } else {
                    addLineFromCache(Math.floor(getRandomArbitrary(0, loadedCache.length)));
                    makeLoadedCache();
                }

                //console.log(" bye ! ??");

                // <!-- this is an option -->
                //addLineFromCache(Math.floor(getRandomArbitrary(0, loadedCache.length)));
                //makeLoadedCache();

            } else {

                // find the best ANGLE 
                var target = angleSmooth;
                var angleToFind = target - myAngle;
                var minDist = 10000000;
                var minIndex = -1;
                for (var i = 0; i < loadedCache.length; i++) {
                    var index = loadedCache[i].index;
                    var dist = Math.abs(angleDistance(dataobj[index].angleChange, angleToFind)); //dataobj[index].angleChange - angleToFind);
                    if (dist < minDist) {
                        minDist = dist;
                        minIndex = i;
                    }
                }
                if (minIndex != -1 && Math.random() > 0.1) {
                    addLineFromCache(minIndex);
                    makeLoadedCache();
                } else {
                    addLineFromCache(Math.floor(getRandomArbitrary(0, loadedCache.length)));
                    makeLoadedCache();
                }


            }
        }
    }


    var newLen = Math.round(adderSum);
    for (var i = ptsSmooth.length; i < newLen; i++) {
        if (i < pts.length) {
            ptsSmooth.push(pts[i]);
        }
    }


    updateGraphics = true;

    // if (ptsSmooth.length > 50){
    //     var diffx = ptsSmooth[ptsSmooth.length-1].x - ptsSmooth[ptsSmooth.length-50].x;
    //     var diffy = ptsSmooth[ptsSmooth.length-1].y - ptsSmooth[ptsSmooth.length-50].y;
    //     var angle = Math.atan2(diffy, diffx);
    //     var angleDiff = (targetAngle - angle);
    //     while (angleDiff < -Math.PI) angleDiff += 2*Math.PI;
    //     while (angleDiff > Math.PI) angleDiff -= 2*Math.PI;
    //     targetAngle -= angleDiff*0.05;
    // }

    //console.log(pts.length);

    //------------------------------------------------------- drawing
    if (updateGraphics === true && ptsSmooth.length > 1) {
        drawing.clear();
        drawing.lineStyle(1, myGui.lineColor, myGui.lineOpacity);
        dropShadowFilter.blur = myGui.shadowBlur;
        dropShadowFilter.distance = myGui.shadowDistance;

        if (pts.length > 0) {



            smoothPt.x = myGui.centerSmoothRate * smoothPt.x + (1.0 - myGui.centerSmoothRate) * ptsSmooth[ptsSmooth.length - 1].x;
            smoothPt.y = myGui.centerSmoothRate * smoothPt.y + (1.0 - myGui.centerSmoothRate) * ptsSmooth[ptsSmooth.length - 1].y;

            //console.log("smooth " + centerX + " " + ptsSmooth[ptsSmooth.length-1].x);
            //smoothPt.x = myGui.centerSmoothRate * smoothPt.x + (1.0 - myGui.centerSmoothRate) * centerX;
            //smoothPt.y = myGui.centerSmoothRate * smoothPt.y + (1.0 - myGui.centerSmoothRate) * centerY;  
        }

        //velStopEnergy = 0.0;

        //console.log(velStopEnergy);


        if (ptsSmooth.length > 0) {

            var start = Math.max(ptsSmooth.length - 1000, 0);
            for (var i = start; i < ptsSmooth.length; i++) {



                var scale = myGui.scale * (1 - velStopEnergy) * (1.0 / drawScaleAmt) + myGui.maxZoom * velStopEnergy * (1.0 / drawScaleAmt);



                //var scale = myGui.scale * (1-velStopEnergy) + 3.0 * velStopEnergy;

                var p = new Point(ptsSmooth[i].x - smoothPt.x, ptsSmooth[i].y - smoothPt.y).clone().rotate((0) * (180.0 / Math.PI)).multiplyNum(scale).addX(renderer.view.width * 0.5).addY(renderer.view.height * 0.5);

                if (i == ptsSmooth.length - 1) {
                    lastPointX = p.x;
                    lastPointY = p.y;
                }

                if (i == start) {
                    drawing.moveTo(p.x, p.y); //ptsSmooth[i].x - smoothPt.x + 400, ptsSmooth[i].y - smoothPt.y + 400);
                } else {
                    drawing.lineTo(p.x, p.y); //ptsSmooth[i].x - smoothPt.x + 400, ptsSmooth[i].y - smoothPt.y + 400);
                }
            }
        }



        // console.log(iwp.length + " iwp "  +
        //             loadedCache.length + " loadedCache " + 
        //             iwpCache.length + "iwp cache" );



        for (var i = 0; i < iwp.length; i++) {

            //console.log(pts.length + " " + iwp[i].startIndex + " "+ iwp[i].endIndex);


            //console.log("in here " + iwp[i].startIndex);
            if (ptsSmooth.length > iwp[i].startIndex) {
                iwp[i].alphaTarget = 1.0; // = 0.96 * iwp[i].alpha + 0.04 * 1.0;
                //iwp[i].sprite1.alpha = iwp[i].alpha;
            }

            if (iwp.length > 7) {
                //0,1,2,3,4,5,6,7,8,9
                var pct = i / (iwp.length - 7);
                if (pct > 1) {
                    pct = 1;
                }
                iwp[i].alphaTarget = pct;

            }
            iwp[i].alpha = 0.96 * iwp[i].alpha + 0.04 * iwp[i].alphaTarget;
            iwp[i].sprite1.alpha = iwp[i].alpha;


            if (myGui.bTint == true) {
                var pct2 = i / iwp.length;
                var amt = myGui.tintAmount;
                var one_m_amt = 1.0 - amt;
                iwp[i].sprite1.tint = PIXI.utils.rgb2hex([pct2 * amt + one_m_amt, pct2 * amt + one_m_amt, pct2 * amt + one_m_amt]);
            } else {
                iwp[i].sprite1.tint = PIXI.utils.rgb2hex([1, 1, 1]);
            }


            var w = renderer.view.width;


            var scale = myGui.scale * (1 - velStopEnergy) * (1.0 / drawScaleAmt) + myGui.maxZoom * velStopEnergy * (1.0 / drawScaleAmt);

            var startPt = new Point(pts[iwp[i].startIndex].x - smoothPt.x, pts[iwp[i].startIndex].y - smoothPt.y).clone().rotate((0) * (180.0 / Math.PI)).multiplyNum(scale).addX(renderer.view.width * 0.5).addY(renderer.view.height * 0.5);
            var endPt = new Point(pts[iwp[i].endIndex].x - smoothPt.x, pts[iwp[i].endIndex].y - smoothPt.y).clone().rotate((0) * (180.0 / Math.PI)).multiplyNum(scale).addX(renderer.view.width * 0.5).addY(renderer.view.height * 0.5);
            var curAngle = Math.atan2(endPt.y - startPt.y, endPt.x - startPt.x);
            var dist = startPt.getDistance(endPt);
            var scale = dist / iwp[i].origLength;
            iwp[i].curAngle = curAngle;

            //console.log(i);
            //console.log(iwp[i]);
            //console.log(i + " " + iwp[i].sprite1);

            // if you want to see the images lined up (to spot issues with caching) 
            // iwp[i].sprite1.anchor.x = 0;
            // iwp[i].sprite1.anchor.y = 0;

            // iwp[i].sprite1.scale.x =  0.05; //scale*4.0;
            // iwp[i].sprite1.scale.y =  0.05; ///scale*4.0;

            // iwp[i].sprite1.rotation = 0; //3.14 + (curAngle-iwp[i].origAngle);
            // iwp[i].sprite1.position.x = i * 25; //startPt.x;
            // iwp[i].sprite1.position.y = 400; //startPt.y;

            if (!isMobile) {
                iwp[i].sprite1.scale.x = scale * 4.0;
                iwp[i].sprite1.scale.y = scale * 4.0;
            } else {
                iwp[i].sprite1.scale.x = scale * 5.333;
                iwp[i].sprite1.scale.y = scale * 5.333;
            }

            //(1.0 / resolutionScaleFactor);

            // if (resolutionScaleFactor != 1.0) {
            //     iwp[i].sprite1.scale.x *= myGui.resScale * (1.0 / iwp[i].lineScale);
            //     iwp[i].sprite1.scale.y *= myGui.resScale * (1.0 / iwp[i].lineScale);

            // }


            iwp[i].sprite1.rotation = 3.14 + (curAngle - iwp[i].origAngle);
            iwp[i].sprite1.position.x = startPt.x;
            iwp[i].sprite1.position.y = startPt.y;


            //imageWithPtsTemp.sprite1.anchor.x = dataobj[lineToAdd]['startPt'].x / 2048.0;
            //imageWithPtsTemp.sprite1.anchor.y = dataobj[lineToAdd]['startPt'].y / 2020.0;



            // if (i === iwp.length - 1){


            //     var x = iwp[i].sprite1.position.x;
            //     var y = iwp[i].sprite1.position.y;

            //     var angle = iwp[i].sprite1.rotation;

            //     //drawing.moveTo(x,y);


            //     x += iwp[i].midDistance * iwp[i].sprite1.scale.x * 0.25 * Math.cos(0 + iwp[i].curAngle - iwp[i].origAngle + iwp[i].midAngle);
            //     y += iwp[i].midDistance * iwp[i].sprite1.scale.y * 0.25 * Math.sin(0 + iwp[i].curAngle - iwp[i].origAngle + iwp[i].midAngle);


            // }

        }

        // Keep this on for now since GUI changes won't take affect if we're not rendering
        // updateGraphics = false;
        updateGraphics = true;
    }



    renderer.render(stage);



}

// See which images are popular for people checking out on Google Maps
document.getElementById('info-link').onclick = function(e) {
    ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: e.target.href
    });
}