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
"use strict";

var Polyline = function(points) {
    this.points = points || [];
};


var proto = {
    constructor: Polyline,
    id: null,
    name: null,
    points: null,
    origPoints: null,
    ignoreRotate: false,
    originX: 0,
    originY: 0,

    ratio1D: 0.2,
    rotationInvariance: Math.PI / 4,
    normalPointCount: 40,
    normalSize: 200,

    init: function(transform) {
        transform = transform !== false;

        this.origPoints = this.points;
        if (transform) {
            this.points = Utils.resample(this.origPoints, this.normalPointCount);
        }

        this.pointCount = this.points.length;
        this.firstPoint = this.points[0];
        this.centroid = this.getCentroid();
        this.translateTo(this.originX, this.originY);

        this.aabb = Utils.getAABB(this.points);
        if (transform) {
            this.scaleTo(this.normalSize);
            this.angle = this.indicativeAngle();
            // if (this.angle){
            this.rotateBy(-this.angle);
            // }
        }
        this.vector = this.vectorize();
    },

    indicativeAngle: function() {
        //return 0;
        // if (this.ignoreRotate){
        //     return 0;
        // }
        // var iAngle = Math.atan2(this.firstPoint[1] - this.centroid[1], this.firstPoint[0] - this.centroid[0]);
        var iAngle = Math.atan2(this.firstPoint[1], this.firstPoint[0]);
        if (this.rotationInvariance) {
            var r = this.rotationInvariance;
            var baseOrientation = r * Math.floor((iAngle + r / 2) / r);
            return iAngle - baseOrientation;
        }
        return iAngle;
    },

    length: function() {
        return Utils.polylineLength(this.points);
    },

    vectorize: function() {
        var sum = 0;
        var vector = [];
        var len = this.pointCount;
        for (var i = 0; i < len; i++) {
            var x = this.points[i][0],
                y = this.points[i][1];
            vector.push(x);
            vector.push(y);
            sum += x * x + y * y;
        }
        var magnitude = Math.sqrt(sum);
        len <<= 1;
        for (var i = 0; i < len; i++) {
            vector[i] /= magnitude;
        }
        return vector;
    },

    getCentroid: function() {
        var x = 0,
            y = 0;
        for (var i = 0; i < this.pointCount; i++) {
            x += this.points[i][0];
            y += this.points[i][1];
        }
        x /= this.pointCount;
        y /= this.pointCount;
        return [x, y];
    },
    translateTo: function(x, y) {
        var c = this.centroid;
        c[0] -= x;
        c[1] -= y;
        for (var i = 0; i < this.pointCount; i++) {
            var p = this.points[i];
            var qx = p[0] - c[0];
            var qy = p[1] - c[1];
            p[0] = qx;
            p[1] = qy;
        }
    },

    rotateBy: function(radians) {
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < this.pointCount; i++) {
            var p = this.points[i];
            var qx = p[0] * cos - p[1] * sin;
            var qy = p[0] * sin + p[1] * cos;
            p[0] = qx;
            p[1] = qy;
        }
    },

    scale: function(scaleX, scaleY) {
        for (var i = 0; i < this.pointCount; i++) {
            var p = this.points[i];
            var qx = p[0] * scaleX;
            var qy = p[1] * scaleY;
            p[0] = qx;
            p[1] = qy;
        }
        // this.centroid[0] *= scaleX
        // this.centroid[1] *= scaleY
    },

    scaleTo: function(width, height) {
        height = height || width;
        var aabb = this.aabb;
        if (this.ratio1D) {
            var longSide = Math.max(aabb[4], aabb[5]);
            var shortSide = Math.min(aabb[4], aabb[5]);
            var uniformly = shortSide / longSide < this.ratio1D;
            if (uniformly) {
                var scaleX = width / longSide,
                    scaleY = height / longSide;
                return this.scale(scaleX, scaleY);
            }
        }
        var scaleX = width / aabb[4],
            scaleY = height / aabb[5];
        this.scale(scaleX, scaleY);
    },
};


for (var p in proto) {
    Polyline.prototype[p] = proto[p];
}