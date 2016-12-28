window.mobilecheck = function() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};



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


// check webgl : 

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


// this is for checking frame rate (stats.js)

var Stats = function() {

    var mode = 0;

    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
    container.addEventListener('click', function(event) {

        event.preventDefault();
        showPanel(++mode % container.children.length);

    }, false);

    //

    function addPanel(panel) {

        container.appendChild(panel.dom);
        return panel;

    }

    function showPanel(id) {

        for (var i = 0; i < container.children.length; i++) {

            container.children[i].style.display = i === id ? 'block' : 'none';

        }

        mode = id;

    }

    //

    var beginTime = (performance || Date).now(),
        prevTime = beginTime,
        frames = 0;

    var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
    var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));

    if (self.performance && self.performance.memory) {

        var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));

    }

    showPanel(0);

    return {

        REVISION: 16,

        dom: container,

        addPanel: addPanel,
        showPanel: showPanel,

        begin: function() {

            beginTime = (performance || Date).now();

        },

        end: function() {

            frames++;

            var time = (performance || Date).now();

            msPanel.update(time - beginTime, 200);

            if (time > prevTime + 1000) {

                fpsPanel.update((frames * 1000) / (time - prevTime), 100);

                prevTime = time;
                frames = 0;

                if (memPanel) {

                    var memory = performance.memory;
                    memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);

                }

            }

            return time;

        },

        update: function() {

            beginTime = this.end();

        },

        // Backwards Compatibility

        domElement: container,
        setMode: showPanel

    };

};

Stats.Panel = function(name, fg, bg) {

    var min = Infinity,
        max = 0,
        round = Math.round;
    var PR = round(window.devicePixelRatio || 1);

    var WIDTH = 80 * PR,
        HEIGHT = 48 * PR,
        TEXT_X = 3 * PR,
        TEXT_Y = 2 * PR,
        GRAPH_X = 3 * PR,
        GRAPH_Y = 15 * PR,
        GRAPH_WIDTH = 74 * PR,
        GRAPH_HEIGHT = 30 * PR;

    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = 'width:80px;height:48px';

    var context = canvas.getContext('2d');
    context.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
    context.textBaseline = 'top';

    context.fillStyle = bg;
    context.fillRect(0, 0, WIDTH, HEIGHT);

    context.fillStyle = fg;
    context.fillText(name, TEXT_X, TEXT_Y);
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

    context.fillStyle = bg;
    context.globalAlpha = 0.9;
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

    return {

        dom: canvas,

        update: function(value, maxValue) {

            min = Math.min(min, value);
            max = Math.max(max, value);

            context.fillStyle = bg;
            context.globalAlpha = 1;
            context.fillRect(0, 0, WIDTH, GRAPH_Y);
            context.fillStyle = fg;
            context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

            context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

            context.fillStyle = bg;
            context.globalAlpha = 0.9;
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));

        }

    };

};

var isMobile = mobilecheck();

//------------------------------------------------------------------------------------------------------
//  webgl line helper
//
//  this is because the pixi js line renderer needs <3 
// 

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
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length / 6;

    // sort color
    var color = utils.hex2rgb(graphicsData.lineColor);
    var alpha = graphicsData.lineAlpha;
    var r = color[0] * alpha;
    var g = color[1] * alpha;
    var b = color[2] * alpha;

    var p1x, p1y, p2x, p2y;

    if (true) {
        for (i = 1; i < length; i++) {

            var alpha2 = 1.0;
            var alpha3 = 1.0;
            p1x = points[(i - 1) * 2];
            p1y = points[(i - 1) * 2 + 1];

            p2x = points[i * 2];
            p2y = points[i * 2 + 1];

            var dx = p2x - p1x;
            var dy = p2y - p1y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            dx /= dist;
            dy /= dist;
            dx *= myGui.shadowWidth;
            dy *= myGui.shadowWidth;

            alpha2 *= myGui.shadowAlpha;;
            alpha3 *= myGui.shadowAlpha;;
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


        for (i = 1; i < length; i++) {

            var alpha2 = 1.0;
            var alpha3 = 1.0;
            p1x = points[(i - 1) * 2];
            p1y = points[(i - 1) * 2 + 1];

            p2x = points[i * 2];
            p2y = points[i * 2 + 1];

            var dx = p2x - p1x;
            var dy = p2y - p1y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            dx /= dist;
            dy /= dist;
            dx *= myGui.shadowWidth;
            dy *= myGui.shadowWidth;

            alpha2 *= myGui.shadowAlpha;;
            alpha3 *= myGui.shadowAlpha;;
            if (i == 1) {
                verts.push(p1x, p1y);
                verts.push(0.0, 0.0, 0.0, alpha2);

            }
            verts.push(p1x, p1y);
            verts.push(0.0, 0.0, 0.0, alpha2);



            verts.push(p1x + dy, p1y - dx);
            verts.push(0.0, 0.0, 0.0, 0.0);


            verts.push(p2x, p2y);
            verts.push(0.0, 0.0, 0.0, alpha3);



            verts.push(p2x + dy, p2y - dx);
            verts.push(0.0, 0.0, 0.0, 0.0);


            if (i == length - 1) {
                verts.push(p2x + dy, p2y - dx);
                verts.push(1.0, 1.0, 1.0, 0.0);

            }
        }
    }



    for (i = 1; i < length; i++) {


        var alpha2 = 1.0; //(i - 1) / length;
        var alpha3 = 1.0; //i / length;
        p1x = points[(i - 1) * 2];
        p1y = points[(i - 1) * 2 + 1];

        p2x = points[i * 2];
        p2y = points[i * 2 + 1];

        var dx = p2x - p1x;
        var dy = p2y - p1y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        dx /= dist;
        dy /= dist;
        dx *= myGui.lineWidth;
        dy *= myGui.lineWidth;

        alpha2 *= 1.0;
        alpha3 *= 1.0;

        if (i == 1) {
            verts.push(p1x - dy, p1y + dx);
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

            gl.uniformMatrix3fv(shader.uniforms.translationMatrix._location, false, graphics.worldTransform.toArray(true));
            gl.uniformMatrix3fv(shader.uniforms.projectionMatrix._location, false, renderer.currentRenderTarget.projectionMatrix.toArray(true));
            gl.uniform3fv(shader.uniforms.tint._location, utils.hex2rgb(graphics.tint));
            gl.uniform1f(shader.uniforms.alpha._location, graphics.worldAlpha);
            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
            gl.vertexAttribPointer(shader.attributes.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.attributes.aColor, 4, gl.FLOAT, false, 4 * 6, 2 * 4);


            if (webGLData.drawNativeLine) {

                if (webGLData.points.length == 0) return;


                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, webGLData.points.length / 6);
            } else {
                // set the index buffer!
                console.log("hi");
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
                gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
            }
            //gl.bindTexture(gl.TEXTURE_2D, null);

        }
    }
};
//------------------------------------------------------------------------------------------------------


// this is for loading the data 

var loadedJson = false;

// keep track of what we've requested and where it's at: 

requestStatus = {};

function updateProgress(evt) {
    if (evt.lengthComputable) {

        var percentComplete = (evt.loaded / evt.total);

        // check each element for progess: 
        for (var key in requestStatus) {
            if (evt.srcElement.responseURL.includes(key)) {
                requestStatus[key] = percentComplete;
            }
        }

    } else {
        //console.log("don't know length");
    }
}

// Generic function to load a file asynchronously
function readTextFile(file, callback) {
    loadedJson = false;

    var rawFile = new XMLHttpRequest();

    requestStatus[file] = 0.0;

    rawFile.onprogress = updateProgress;
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);

    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {

            for (var key in requestStatus) {
                if (rawFile.responseURL.includes(key)) {
                    requestStatus[key] = 1.0;
                }
            }


            //console.log(rawFile);
            callback(rawFile.status, rawFile.responseText);
        }
    }
    rawFile.send(null);
}



// Update DOM elements with new data
function updateMetadata(data) {
    var line1 = data['line-1'] || '';
    var line2 = data['line-2'] || '';
    var attribution = data['attribution'] || '';
    var url = data['url'] || '';

    document.getElementById('info-link').innerHTML = line1 + "<br>" + line2;
    document.getElementById('info-link').href = url;
    document.getElementById('info-attribution').innerText = attribution;

    ga('send', 'event', 'Draw', 'draw', data['line-1'] + ' ' + data['line-2']);
}


// this is vp related 

var vptrees = [];
var polylines = [];
var polylineCount = [];

function loadNextTree() {

    readTextFile('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/site/www/draw/data/' + vpTreeToLoad + '.json', loadVPTree);
}

Array.prototype.append = function(array) {
    this.push.apply(this, array)
}


var jsonData;
var dataParseCount = 0;
var parseWorkToDo = false;
var polylinesTemp = [];

function parseLoadVPTree() {

    if (!parseWorkToDo) {
        return;
    }

    // otherwise let's do some work (across frames) 

    var start = dataParseCount;
    var end = Math.min(jsonData["polylines"].length, dataParseCount + 50);

    //------------------------------------------------ do some work 
    var polylinePoints = jsonData["polylines"];

    for (j = start; j < end; j++) {
        dataobj.push(polylinePoints[j]);
        ptsTemp = [];
        var x = 0;
        var y = 0;
        for (k = 0; k < polylinePoints[j].length / 2; k++) {
            x = polylinePoints[j][k * 2]; // converted to be relative...
            y = polylinePoints[j][k * 2 + 1];
            pt = [];
            pt[0] = x;
            pt[1] = y;
            ptsTemp.push(pt);
        }
        var p = createPolyline(ptsTemp);
        p.init(true);
        polylinesTemp.push(p);
        polylines.push(p);
    }


    dataParseCount = end;

    //------------------------------------------------ 
    if (end === jsonData["polylines"].length) { // we did it! 

        parseWorkToDo = false;
        polylineCount.push(polylinePoints.length);
        vpTreeString = eval('(' + jsonData["vpTree"] + ')');
        vptrees.push(VPTreeFactory.load(polylinesTemp, dist, vpTreeString));
        vpTreeToLoad++;
        if (vpTreeToLoad < 5) {
            window.setTimeout(loadNextTree, 10000);
        }
    }

}

function loadVPTree(code, data) {

    polylinesTemp = [];
    jsonData = JSON.parse(data);
    dataParseCount = 0;
    parseWorkToDo = true;


}

var vpTreeToLoad = 0;
readTextFile('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/site/www/draw/data/' + vpTreeToLoad + '.json', loadVPTree);

//----------------------------------------------------------



// Load a list of existing meta data ids since the filenames are actually indexed
// from 0 - 1521 instead of using the id as the filename
var metadata = {};
var metadataIDList = [];
readTextFile('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/site/www/draw/metadata-id-list.json', function(code, data) {
    metadataIDList = JSON.parse(data);
});
readTextFile('https://storage.googleapis.com/navigator-media-usa/media/connected_line/v2/site/www/draw/metadata-converted.json', function(code, data) {
    metadata = JSON.parse(data);
});


//-------------------------------------------------------------------
//------------------------------------------------------------------- GUI

var guiSettings = {
    "preset": "Default",
    "remembered": {
        "Default": {
            "0": {}
        },
        "Takashi": {
            "0": {
                "folders": {
                    "line": {
                        "preset": "Default",
                        "closed": false,
                        "folders": {}
                    },
                    "pulse": {
                        "preset": "Default",
                        "closed": false,
                        "folders": {}
                    },
                    "scale/translate": {
                        "preset": "Default",
                        "closed": false,
                        "folders": {}
                    },
                    "fade": {
                        "preset": "Default",
                        "closed": false,
                        "folders": {}

                    },
                    "match": {
                        "preset": "Default",
                        "closed": false,
                        "folders": {}
                    }
                },
            },
            "closed": false,
            "folders": {}
        }
    }
};

var Gui = function() {
    this.lineColor = 0xe8f700;
    this.lineOpacity = 0.75;
    this.lineWidth = 2;
    //this.lineShadow = false;
    this.shadowWidth = 11;
    this.shadowAlpha = 0.6;
    this.lineSpeedSplit = 10;

    this.pulseWidth = 2;
    this.pulseSpeed = 10;
    this.pulseOpacityLow = 0.2;
    this.pulseOpacityHigh = 0.9;
    this.pulseWaitTime = 1;

    this.scaleSize = 0.22;
    this.scaleSpeed = 0.021;
    this.translateSpeed = 0.01;
    this.showEnclosingCircle = false;
    this.maxImageScale = 1.3;

    this.imgFadeInSpeed = 0.04;
    this.imgFadeOutSpeed = 0.01;
    this.bgFadeInSpeed = 0.01;
    this.bgFadeOutSpeed = 0.01;
    this.bgOpacity = 0.46;
    this.metadata = 0.15;

    this.badMatchThreshold = 0.25;

    this.numMaxCuts = 4;
    this.cutThreshold = 0.1;
    this.cutPct = 0.06;

    this.loadFromCloud = true;

    // this.imageResolution = 2;
};
var myGui = new Gui();

var isDevMode = (window.location.hash.indexOf('dev') == -1) ? false : true;

window.onload = function() {

    if (isDevMode) {
        var gui = new dat.GUI();
        var f1 = gui.addFolder('line');
        f1.addColor(myGui, 'lineColor');
        f1.add(myGui, 'lineOpacity', 0, 1);
        f1.add(myGui, 'lineWidth', 1, 10);
        //var shadowToggle = f1.add(myGui, 'lineShadow');
        f1.add(myGui, 'shadowWidth', 0, 100);
        f1.add(myGui, 'shadowAlpha', 0, 1);

        f1.add(myGui, 'lineSpeedSplit', 1, 100);

        var f2 = gui.addFolder('pulse');
        f2.add(myGui, 'pulseWidth', 1, 10);
        f2.add(myGui, 'pulseOpacityLow', 0, 1);
        f2.add(myGui, 'pulseOpacityHigh', 0, 1);
        f2.add(myGui, 'pulseSpeed', 1, 20);
        f2.add(myGui, 'pulseWaitTime', 0, 3);

        var f3 = gui.addFolder('scale/translate');
        f3.add(myGui, 'scaleSize', 0.2, 0.5);
        f3.add(myGui, 'scaleSpeed', 0, 0.5);
        f3.add(myGui, 'translateSpeed', 0, 0.5);
        f3.add(myGui, 'showEnclosingCircle');
        f3.add(myGui, 'maxImageScale', 0.01, 4.01);

        var f4 = gui.addFolder('fade');
        f4.add(myGui, 'imgFadeInSpeed', 0, 0.2);
        f4.add(myGui, 'imgFadeOutSpeed', 0, 0.2);
        f4.add(myGui, 'bgFadeInSpeed', 0, 0.2);
        f4.add(myGui, 'bgFadeOutSpeed', 0, 0.2);
        f4.add(myGui, 'bgOpacity', 0, 1);
        f4.add(myGui, 'metadata', 0, 1);


        var f4 = gui.addFolder('match');
        f4.add(myGui, 'badMatchThreshold', 0.0, 1.0);

        f4.add(myGui, 'numMaxCuts', 1, 20);
        f4.add(myGui, 'cutThreshold', 0.0, 1.0);
        f4.add(myGui, 'cutPct', 0.0, 1.0);


        //var f5 = gui.addFolder('resolution');
        //f5.add(myGui, 'imageResolution', 0, 2).step(1);
        // gui.add(myGui, 'loadFromCloud');

        gui.remember(myGui);

        //shadowToggle.onFinishChange(updateLineShadow);
    }

};



//-------------------------------------------------------------------
//------------------------------------------------------------------- drawing related stuff
var drawnCircle;
var angleMatch = 0;
var infoobj = JSON.parse(info);
var dataobj = []; ///= JSON.parse(data);

var animatingCircle = {};
var matchedMetadata = {};
var textureHasLoaded = false;
var metadataTargetOpacity = 0;
var drawingAlpha = 1.0;
var drawingAlphaTarget = 1.0;
var pulseComplete = false;
var pulseTimer;

function returnPathForCircle(simpleArray) {
    canvasPoints = [];
    for (var i = 0; i < simpleArray.length / 2; i++) {
        var tempX = simpleArray[i * 2];
        var tempY = simpleArray[i * 2 + 1];
        canvasPoints.push({
            x: tempX,
            y: tempY
        });
    }
    return canvasPoints;
}

function returnPathForArray(simpleArray) {
    var path = [];
    for (var i = 0; i < simpleArray.length / 2; i++) {
        path[i] = {
            x: simpleArray[i * 2],
            y: simpleArray[i * 2 + 1]
        };
    }
    return path;
}

function createPolyline(points) {
    ratio1D = 0.9;
    rotationInvariance = Math.PI * 2;
    normalPointCount = 80;
    normalSize = 200;
    var polyline = new Polyline(points);
    polyline.ratio1D = this.ratio1D;
    polyline.rotationInvariance = this.rotationInvariance;
    polyline.normalPointCount = this.normalPointCount;
    polyline.normalSize = this.normalSize;
    return polyline;
}

function returnNestedArray(simpleArray) {
    var path = [];
    for (var i = 0; i < simpleArray.length / 2; i++) {
        input = [];
        input[0] = simpleArray[i * 2];
        input[1] = simpleArray[i * 2 + 1];
        path.push(input);
    }
    return path;
}



function dist(a, b) {
    return Utils.cosDistance(a.vector, b.vector);
}


function rotate(vector1, radians) {
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    for (var i = 0; i < vector1.length / 2; i++) {
        x = vector1[i * 2];
        y = vector1[i * 2 + 1];
        //var p = this.points[i];
        var qx = x * cos - y * sin;
        var qy = x * sin + y * cos;
        vector1[i * 2] = qx;
        vector1[i * 2 + 1] = qy;
    }
}


function distNormalizedLines(vector1, vector2) {
    var a = vector1;
    var b = vector2;
    var distance = 0;
    var weight = 0;
    for (var i = 0; i < a.length / 2; i++) {
        var pct = i / (a.length / 2);
        var scalar = 1.0 + (1.0 - Math.sin(pct * Math.PI)) * 100.0;
        distance += scalar * Math.sqrt((b[i * 2] - a[i * 2]) * (b[i * 2] - a[i * 2]) + (b[i * 2 + 1] - a[i * 2 + 1]) * (b[i * 2 + 1] - a[i * 2 + 1]));
        weight += scalar;
    }
    return distance / weight;
}


var drawing = false;
var pts = [];
var results = [];
var ptsNew = [];

var matched = false;
pts = [];
var linePulseCounter = 0;
var bAmDrawing = false;
var updateGraphics = false;
var sprites = [];
var backgroundImages = [];
var resolutionScale = 1.0;


// Create the Renderer
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

renderer.view.style.display = "block";
document.body.appendChild(renderer.view);

// Create the Stage, which is our root node of the scene
var stage = new PIXI.Stage(0xFFFFFF, true);
stage.interactive = true;
stage.hitArea = new PIXI.Rectangle(0, 0, dimensions.width, dimensions.height);


//var brt = new PIXI.BaseRenderTexture(w, h, PIXI.SCALE_MODES.LINEAR, 1);
var renderTexture = new PIXI.RenderTexture(renderer, dimensions.width, dimensions.height);
//renderTexture.render(container);
var offscreen = new PIXI.Sprite(renderTexture);


window.onresize = function(event) {
    var w = window.innerWidth;
    var h = window.innerHeight; //this part resizes the canvas but keeps ratio the same    
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px"; //this part adjusts the ratio:    
    renderer.resize(w, h);

    // offscreen.destroy();
    renderTexture.resize(w, h, true);

    stage.hitArea = new PIXI.Rectangle(0, 0, w, h);

    // offscreen = new PIXI.Sprite(renderTexture);

}

stage.addChild(offscreen);

// Prevent the page from scrolling if swipe up/down with your finger on elements
// like the Draw/Swipe nav or the metadata info on the bottom
document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
});


// user drawing: 

var drawing = new PIXI.Graphics();

//stage.addChild(drawing);
drawing.position.x = 0;
drawing.position.y = 0;


var finishedLoading = false;

var circleOffsetX;
var circleOffsetY;
var circleScaleRatio;
var touchID;


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
var firstTouch = true;
stage.mousedown = stage.touchstart = function(moveData) {

    // Remove the instruction animation on first touch
    if (firstTouch) {
        firstTouch = false;
        document.getElementById('loading').removeChild(document.getElementById('instruction'));
    }


    if (bAmDrawing === true) {
        return;
    }

    if (moveData.data.identifier === undefined) {
        touchID = 0;
    } else {
        touchID = moveData.data.identifier;
    }


    matched = false;
    bAmDrawing = true;
    linePulseCounter = 0;
    textureHasLoaded = false;
    metadataTargetOpacity = 0;
    pulseComplete = false;
    clearTimeout(pulseTimer);
    pulseTimer = setTimeout(function() {
        pulseComplete = true;
    }, myGui.pulseWaitTime * 1000);

    pts = [];
    pts.push(moveData.data.global.x);
    pts.push(moveData.data.global.y);

    drawingAlpha = 1.0;
    drawingAlphaTarget = 1.0;

};

stage.mousemove = stage.touchmove = function(moveData) {



    if (bAmDrawing === true) {

        if (moveData.data.identifier !== undefined) {
            if (touchID !== moveData.data.identifier) {
                return;
            }
        }

        // add points
        var x = moveData.data.global.x;
        var y = moveData.data.global.y;
        var lastX = pts[pts.length - 2];
        var lastY = pts[pts.length - 1];
        var diffx = x - lastX;
        var diffy = y - lastY;
        var len = Math.sqrt(diffx * diffx + diffy * diffy);
        if (len < myGui.lineSpeedSplit) {
            pts.push(moveData.data.global.x);
            pts.push(moveData.data.global.y);

            if (pts.length > 60 * 2) {
                pts.shift();
                pts.shift();
            }
        } else {

            var count = Math.round(len / myGui.lineSpeedSplit);
            if (count < 1) count = 1;
            for (var i = 0; i < count; i++) {
                pts.push(lastX + (i + 1) * (diffx / count));
                pts.push(lastY + (i + 1) * (diffy / count));

                if (pts.length > 60 * 2) {
                    pts.shift();
                    pts.shift();
                }
            }
        }



        updateGraphics = true;
    }

};


// ---------
//
function getBestMatch(ptsToTest) {
    var obj = {};

    // resample if we need to: 
    var ptsResampled = [];

    if (ptsToTest.length != 120) {
        var xPts = [];
        var yPts = [];
        for (var i = 0; i < ptsToTest.length / 2; i++) {
            x = ptsToTest[i * 2];
            y = ptsToTest[i * 2 + 1];
            xPts[i] = x;
            yPts[i] = y;
        }
        //ptsResampled = [];       
        var xSmooth = Smooth(xPts);
        var ySmooth = Smooth(yPts);
        for (var i = 0; i < 60; i++) {
            pctMe = i / 59.0;
            var newX = xSmooth(pctMe * (xPts.length - 1));
            var newY = ySmooth(pctMe * (yPts.length - 1));
            ptsResampled[i * 2] = newX;
            ptsResampled[i * 2 + 1] = newY;
        }
    } else {
        for (var i = 0; i < ptsToTest.length; i++) {
            ptsResampled.push(ptsToTest[i]);
        }
    }

    ptsTemp = [];
    for (j = 0; j < ptsResampled.length / 2; j++) {
        x = ptsResampled[j * 2];
        y = ptsResampled[j * 2 + 1];
        pt = [];
        pt[0] = x;
        pt[1] = y;
        ptsTemp.push(pt);
    }

    ptsTemp2 = [];
    for (j = 0; j < ptsResampled.length / 2; j++) {
        x = ptsResampled[j * 2];
        y = ptsResampled[j * 2 + 1];
        pt = [];
        pt[0] = x;
        pt[1] = y;
        ptsTemp2.push(pt);
    }
    ptsTemp2.reverse();

    // make a circle so we can scale this circle 
    drawnCircle = makeCircle(returnPathForArray(ptsResampled));
    var p = createPolyline(ptsTemp);
    var p2 = createPolyline(ptsTemp2);
    p.init(true);
    p2.init(true);
    var resultsA; //= vptree.search(p, 1);
    var resultsB; // = vptree.search(p2, 1);

    if (vptrees.length == 0) {
        console.log("we are still loading data, returning");
        return;
    }

    // check the multiple trees: 
    var minA = 1000000.0;
    var minAindex = -1;
    var minAnum = -1;

    var minB = 1000000.0;
    var minBindex = -1;
    var minBnum = -1;

    for (var i = 0; i < vptrees.length; i++) {

        var multiResultsA = vptrees[i].search(p, 1);
        //console.log('multiResultsA:', multiResultsA[0]);
        var multiResultsB = vptrees[i].search(p2, 1);
        //console.log('multiResultsB:', multiResultsB[0]);

        if (i === 0) {
            resultsA = multiResultsA;
            resultsB = multiResultsB;
        }

        if (multiResultsA[0].d < minA) {
            minA = multiResultsA[0].d;
            minAindex = multiResultsA[0].i;
            minANum = i;
        }

        if (multiResultsB[0].d < minB) {
            minB = multiResultsB[0].d;
            minBindex = multiResultsB[0].i;
            minBNum = i;
        }
    }

    var whichOneA = 0;
    var whichOneB = 0;

    for (var i = 0; i < minANum; i++) {
        whichOneA += polylineCount[i];
    }
    whichOneA += minAindex;

    for (var i = 0; i < minBNum; i++) {
        whichOneB += polylineCount[i];
    }
    whichOneB += minBindex;

    resultsA[0].i = whichOneA;
    resultsA[0].d = minA;

    resultsB[0].i = whichOneB;
    resultsB[0].d = minB;

    if (resultsB[0].d < resultsA[0].d) {

        obj.result = resultsB;

        obj.flip = true;

        for (j = 0; j < ptsResampled.length / 2; j++) {
            ptsResampled[j * 2] = ptsTemp2[j][0];
            ptsResampled[j * 2 + 1] = ptsTemp2[j][1];
        }

    } else {

        obj.result = resultsA;
        obj.flip = false;

    }

    obj.ptsResampled = ptsResampled;

    return obj;
}



stage.mouseup = stage.mouseupoutside = stage.touchend = stage.touchendoutside = function(moveData) {


    if (moveData.data.identifier !== undefined) {
        if (touchID !== moveData.data.identifier) {
            return;
        }
    }

    // if we weren't drawing (gui, etc) return;
    if (bAmDrawing === false) {
        return;
    }

    bAmDrawing = false;

    if (pts.length < 10) {
        return;
    }



    var match = {}; //getBestMatch(pts);

    var countMatching = 0;
    var ptsCopy = pts.slice(0);
    var d = 1.0;

    while (d > myGui.cutThreshold && countMatching < myGui.numMaxCuts) {
        //console.log(ptsCopy);
        match = getBestMatch(ptsCopy);
        d = match.result[0].d;
        //console.log("attempt " + countMatching + " res " + d);
        countMatching++;
        var len = ptsCopy.length / 2;
        var toDel = Math.round(len * myGui.cutPct);
        if (len > 5) {
            ptsCopy.splice(0, toDel * 2);
        } else {
            countMatching = 5;
        }

    }

    results = match.result;
    var ptsResampled = match.ptsResampled;

    var ptsScaled = ptsResampled.slice();
    var scaleMe = scale = 250.0 / drawnCircle.r;
    for (j = 0; j < ptsScaled.length / 2; j++) {
        ptsScaled[j * 2] -= drawnCircle.x;
        ptsScaled[j * 2 + 1] -= drawnCircle.y;
        ptsScaled[j * 2] *= scaleMe;
        ptsScaled[j * 2 + 1] *= scaleMe;

    }



    var bestAngle = 0;
    var smallestDiff = 10000000;
    for (var i = 0; i < 300; i++) {
        var angle = (i / 300.0) * Math.PI * 2;
        var ptsRotated = dataobj[results[0].i].slice(0);

        rotate(ptsRotated, angle);
        rotatedDist = distNormalizedLines(ptsScaled, ptsRotated);

        if (rotatedDist < smallestDiff) {
            smallestDiff = rotatedDist;
            bestAngle = angle;
        }

    }

    //console.log("smallestDiff " + smallestDiff + " results d " + results[0].d);

    if (results[0].d > myGui.badMatchThreshold) {
        drawingAlphaTarget = 0.0; // fade out weird stuff 
    }
    // Pull ID from info obj, which actually stores IDs starting from 0
    var id = infoobj[results[0].i][0];
    //console.log("loading metadata for id " + id);
    // Convert filename-based ID to "real" ID from spreadsheet


    id = metadataIDList[id].toString();
    matchedMetadata = metadata[id];

    angleMatch = bestAngle;
    updateGraphics = true;


    //console.log('TextureCache:', PIXI.utils.TextureCache);

    var random = Math.floor(Math.random() * 1000);

    // Create a new Texture and Sprite from the matched image
    var url = 'https://storage.googleapis.com/navigator-media-usa/media/draw/v1/full/';

    if (isMobile) {
        if (myGui.loadFromCloud)
            url = 'https://storage.googleapis.com/navigator-media-usa/media/draw/v3/900/';
        else
            url = '/';

        resolutionScale = 1800 / 900;
    } else {
        /*else if (myGui.imageResolution === 1){ */
        //https://storage.googleapis.com/navigator-media-usa/media/draw/v3/1260/3.jpg
        if (myGui.loadFromCloud)
            url = 'https://storage.googleapis.com/navigator-media-usa/media/draw/v3/1260/';
        else
            url = '/';

        resolutionScale = 1800 / 1260;
    }


    PIXI.loader.reset();

    //console.log("loading num : " + infoobj[results[0].i][0]);

    var texture = PIXI.Texture.fromImage(url + '' + infoobj[results[0].i][0] + '.jpg');
    var sprite = new PIXI.Sprite(texture);
    sprite.alpha = 0;

    // Add the new Sprite to the stage
    // Old Sprites will fade out, calculated in animate()
    sprites.push(sprite);
    stage.addChild(sprite);

    // Move drawn line on top of images
    stage.removeChild(offscreen);
    stage.addChild(offscreen);

    // Positioning for matched image
    sprite.position.x = drawnCircle.x;
    sprite.position.y = drawnCircle.y;
    sprite.rotation = angleMatch;
    sprite.scale.x = drawnCircle.r / infoobj[results[0].i][3];
    sprite.scale.y = drawnCircle.r / infoobj[results[0].i][3];

    sprite.scale.x *= resolutionScale;
    sprite.scale.y *= resolutionScale;


    xPosOrig = infoobj[results[0].i][1];
    yPosOrig = infoobj[results[0].i][2];

    sprite.anchor.x = xPosOrig / 1800.0;
    sprite.anchor.y = yPosOrig / 1200.0;

    sprite.originalPosition = {};
    sprite.originalPosition.x = sprite.position.x;
    sprite.originalPosition.y = sprite.position.y;
    sprite.originalScale = sprite.scale.x;

    animatingCircle.x = drawnCircle.x;
    animatingCircle.y = drawnCircle.y;
    animatingCircle.r = drawnCircle.r;
    animatingCircle.origR = drawnCircle.r;



    // Update background image
    PIXI.loader.reset();
    //https://storage.googleapis.com/navigator-media-usa/media/draw/v3/blurredImages/2.jpg
    url = 'https://storage.googleapis.com/navigator-media-usa/media/draw/v3/';
    var bg = new PIXI.Sprite.fromImage(url + 'blurredImages/' + infoobj[results[0].i][0] + '.jpg');
    bg.alpha = 0;

    // fill bg

    var aspectScreen = renderer.view.width / renderer.view.height;
    var aspectImage = 900 / 600;

    bg.anchor.x = 0.5;
    bg.anchor.y = 0.5;

    bg.position.x = renderer.view.width / 2;
    bg.position.y = renderer.view.height / 2;

    if (aspectScreen > aspectImage) { // width of screen is greater, scale to width
        bg.width = renderer.view.width;
        bg.height = renderer.view.width * (1 / aspectImage);
    } else {
        bg.height = renderer.view.height;
        bg.width = renderer.view.height * (aspectImage);
    }


    backgroundImages.push(bg);
    stage.addChildAt(bg, 0);

    matched = true;

    //----------------------------

};


if (isDevMode) {
    var stats = new Stats();
    stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
}

var counter = 0;
//------------------------------------------------------------------------------------------------

animate();
//requestAnimationFrame(animate);

if (isDevMode) {
    stats.begin();
}
//console.log(sprite1.texture);

var timef = 0;

function animate() {


    // if (Math.random() > 0.99){
    //      console.log(requestStatus);
    // }

    if (vptrees.length === 0) {
        // we are preloading, let's do some math. 
        var pctData = 0.0;
        var pctMetaData = 0.0;
        var pctParsed = 0.0;

        if ("data/0.json" in requestStatus) {
            pctData = requestStatus["data/0.json"];
        }

        if ("metadata-id-list.json" in requestStatus) {
            pctMetaData = requestStatus["metadata-id-list.json"];
        }

        if (parseWorkToDo) {
            pctParsed = dataParseCount / jsonData["polylines"].length;
        }

        var preloadPct = pctData * 0.7 + pctMetaData * 0.1 + pctParsed * 0.2;


        if (document.getElementById("progress") != null) {
            document.getElementById("progress").innerHTML = "Loading</br>" + Math.round(preloadPct * 100) + " / 100";
        }
        //document.getElementById("progress").innerHTML = "Loading " + preloadPct;
        //console.log("PRELOAD " + pctData + " " + pctMetaData + " " + pctParsed + " " + preloadPct);

    }


    parseLoadVPTree(); // always try to parse ! 

    if (vptrees.length > 0) {
        if (!finishedLoading) {
            finishedLoading = true;
            // Remove 'Loading' text
            var elem = document.getElementById('loading');
            elem.removeChild(document.getElementById('progress'));

            // Stop using the loading div to block input
            elem.style.pointerEvents = 'none'

            // Temporarily clear & restore img src so that gif animation resets to beginning
            elem = document.getElementById('instruction');
            elem.src = '../img/instruction-draw@2x.gif';
            elem.style.display = 'block';
        }
    }


    if (drawing === false &&
        matched === true) {
        updateGraphics === true;
    }

    var pulseOpacity = 1.0;
    //------------------------------------------------------- drawing
    if (updateGraphics === true) {
        drawing.clear();

        drawingAlpha = 0.98 * drawingAlpha + 0.02 * drawingAlphaTarget;
        //drawing.alpha = drawingAlpha;

        if (!matched) {

            drawing.lineStyle(1.0, myGui.lineColor, myGui.lineOpacity);

            if (pts.length >= 4) {
                for (var i = 0; i < pts.length / 2; i++) {
                    if (i == 0) {
                        drawing.moveTo(pts[0], pts[1]);
                    } else {
                        drawing.lineTo(pts[i * 2], pts[i * 2 + 1]);
                    }
                }

            }


            // Fade out old images to halfway
            for (var i = 0; i < sprites.length; i++) {
                if (sprites[i].alpha >= 0.5) {
                    sprites[i].alpha -= myGui.imgFadeOutSpeed;
                }
            }


            // Fade out background images
            for (var i = 0; i < backgroundImages.length; i++) {
                backgroundImages[i].alpha -= myGui.bgFadeOutSpeed;
            }

        } else {

            // Update metadata UI when the texture loads

            var lastSprite = sprites[sprites.length - 1];
            if (lastSprite.texture.baseTexture &&
                lastSprite.texture.baseTexture.hasLoaded) {

                if (!textureHasLoaded && pulseComplete) {
                    //console.log('Texture just finished loading!');
                    textureHasLoaded = true;
                    updateMetadata(matchedMetadata);
                    metadataTargetOpacity = 1;
                }
            }

            // Set the line style based on our state
            // If the texture is loading, then it should pulse
            // Otherwise it's solid
            if (textureHasLoaded) {
                drawing.lineStyle(1.0, myGui.lineColor, myGui.lineOpacity * drawingAlpha);
            } else {
                linePulseCounter += (0.01 * myGui.pulseSpeed);
                var sine = Math.sin(linePulseCounter);
                var thickness = Utils.remap(sine, -1, 1, myGui.lineWidth - myGui.pulseWidth, myGui.lineWidth + myGui.pulseWidth);
                var opacity = Utils.remap(sine, -1, 1, myGui.pulseOpacityLow, myGui.pulseOpacityHigh);
                pulseOpacity = opacity;

                drawing.lineStyle(1.0, myGui.lineColor, opacity * drawingAlpha);
            }



            var translateSpeed = myGui.translateSpeed;
            var scaleSpeed = myGui.scaleSpeed;

            var targetX = renderer.view.width * 0.5;
            var targetY = renderer.view.height * 0.5;
            if (renderer.view.width > renderer.view.height)
                var targetR = renderer.view.height * myGui.scaleSize;
            else
                var targetR = renderer.view.width * myGui.scaleSize;



            ///var targetR = renderer.view.height * myGui.scaleSize;
            if (sprites.length > 0) {
                var goToScale = sprites[sprites.length - 1].originalScale * (targetR / drawnCircle.r);
                if (goToScale > myGui.maxImageScale * resolutionScale) {

                    // 1.0 = A * (B / C); // solve for B
                    // 1.0/A = (B/C);
                    // B = (1.0/A) * C;
                    // omg algebra

                    targetR = (myGui.maxImageScale * resolutionScale / sprites[sprites.length - 1].originalScale) * drawnCircle.r;
                }
            }



            // Make sure the most recent matched image has loaded
            // Then begin calculating a lerped toward the target

            //console.log("scale factor = " + animatingCircle.origR + " " + targetR + " "  + 1.0 / (animatingCircle.origR / targetR));

            if (textureHasLoaded) {
                animatingCircle.x = Utils.lerp(animatingCircle.x, targetX, translateSpeed);
                animatingCircle.y = Utils.lerp(animatingCircle.y, targetY, translateSpeed);
                animatingCircle.r = Utils.lerp(animatingCircle.r, targetR, scaleSpeed);
            }

            // Update offsets/scale ratios to move drawing line & image toward center
            circleOffsetX = animatingCircle.x - drawnCircle.x;
            circleOffsetY = animatingCircle.y - drawnCircle.y;
            circleScaleRatio = animatingCircle.r / drawnCircle.r;

            if (pts.length >= 4)
                for (var i = 0; i < pts.length / 2; i++) {

                    // this is how we could scale and change the offset of the line.  zooming in to center seems good
                    // image can do the same thing since it's also set by drawn circle (above the end of mouse released)

                    var x = pts[i * 2] - drawnCircle.x;
                    var y = pts[i * 2 + 1] - drawnCircle.y;

                    x *= circleScaleRatio;
                    y *= circleScaleRatio;

                    x += drawnCircle.x;
                    y += drawnCircle.y;

                    x += circleOffsetX;
                    y += circleOffsetY;


                    if (i == 0) {
                        drawing.moveTo(x, y);
                    } else {
                        drawing.lineTo(x, y);
                    }
                }

            // Draw enclosing circle
            if (myGui.showEnclosingCircle) {
                drawing.lineStyle(1.0, 0xff0000, 0.5);
                drawing.drawCircle(animatingCircle.x, animatingCircle.y, animatingCircle.r);
            }
        }

        // Fade out old images
        if (sprites.length) {
            var endingIndex = bAmDrawing ? sprites.length - 1 : sprites.length - 2;
            for (var i = 0; i <= endingIndex; i++) {
                sprites[i].alpha -= myGui.imgFadeOutSpeed;
            }
            // Fade in most recent image
            if (sprites[sprites.length - 1].alpha < 1 && textureHasLoaded) {
                sprites[sprites.length - 1].alpha += myGui.imgFadeInSpeed;

                // Make sure it doesn't exceed 1.0
                if (sprites[sprites.length - 1].alpha > 1)
                    sprites[sprites.length - 1].alpha = 1;
            }

            // Remove invisible Sprites
            // Work in reverse to avoid the delete-while-iterating problem
            for (var i = sprites.length - 1; i >= 0; i--) {
                if (sprites[i].alpha < 0) {
                    // Delete 1 element at this index
                    stage.removeChild(sprites[i]);

                    // do I remove this texture?
                    var amIsolo = true;
                    for (var j = 0; j < sprites.length; j++) {
                        if (j !== i) {
                            if (sprites[i].texture.baseTexture === sprites[j].texture.baseTexture) {
                                amIsolo = false;
                            }
                        }
                    }

                    if (amIsolo === true) {
                        sprites[i].texture.destroy(true);
                        sprites[i].destroy();
                    }

                    sprites.splice(i, 1);
                }
            }
        }

        // Fade background images
        if (backgroundImages.length && textureHasLoaded) {
            var endingIndex = bAmDrawing ? backgroundImages.length - 1 : backgroundImages.length - 2;
            for (var i = 0; i <= endingIndex; i++) {
                backgroundImages[i].alpha -= myGui.bgFadeOutSpeed;
            }
            // Fade in most recent image
            if (backgroundImages[backgroundImages.length - 1].alpha < myGui.bgOpacity) {
                backgroundImages[backgroundImages.length - 1].alpha += myGui.bgFadeInSpeed;

                // Make sure it doesn't exceed 1.0
                if (backgroundImages[backgroundImages.length - 1].alpha > 1)
                    backgroundImages[backgroundImages.length - 1].alpha = 1;
            }

            // Remove invisible Sprites
            // Work in reverse to avoid the delete-while-iterating problem
            for (var i = backgroundImages.length - 1; i >= 0; i--) {
                if (backgroundImages[i].alpha <= 0) {
                    // Delete 1 element at this index
                    stage.removeChild(backgroundImages[i]);
                    backgroundImages[i].destroy();
                    backgroundImages.splice(i, 1);
                }
            }
        }

        // Scale & translate most recent matched image toward center
        if (sprites.length && !bAmDrawing) {
            var index = sprites.length - 1;
            sprites[index].position.x = sprites[index].originalPosition.x + circleOffsetX;
            sprites[index].position.y = sprites[index].originalPosition.y + circleOffsetY;

            var scale = sprites[index].originalScale * circleScaleRatio;

            //console.log("scale ???? " + sprites[index].originalScale );
            sprites[index].scale.set(scale, scale);
        }

        var infoElem = document.getElementById('info');
        if (Math.abs(metadataTargetOpacity - infoElem.style.opacity) > .01) {
            infoElem.style.opacity = Utils.lerp(infoElem.style.opacity, metadataTargetOpacity, myGui.metadata);
        }


        // Only update graphics on next pass if there is something to animate
        updateGraphics = false;

        if (bAmDrawing && sprites.length > 0) updateGraphics = true;
        else if (sprites.length > 1) updateGraphics = true;
        else if (sprites.length && !sprites[sprites.length - 1].texture.baseTexture.hasLoaded) updateGraphics = true;
        else if (Math.abs(animatingCircle.x - targetX) > 1) updateGraphics = true;
        else if (Math.abs(animatingCircle.y - targetY) > 1) updateGraphics = true;
        else if (Math.abs(animatingCircle.r - targetR) > 1) updateGraphics = true;
    }


    //console.log(drawingAlpha);
    renderTexture.clear();

    renderTexture.render(drawing);


    offscreen.alpha = drawingAlpha * pulseOpacity;


    if (drawingAlpha < 0.95) {
        offscreen.blendMode = PIXI.BLEND_MODES.ADD;
    } else {
        offscreen.blendMode = PIXI.BLEND_MODES.NORMAL;
    }



    renderer.render(stage);

    if (isDevMode) {
        stats.end();
    }

    requestAnimationFrame(animate);



}

// See which images are popular for people checking out on Google Maps
document.getElementById('info-link').onclick = function(e) {
    ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: e.target.href
    });
}