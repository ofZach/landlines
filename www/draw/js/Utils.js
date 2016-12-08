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


var CONST = {
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    HALF_PI: Math.PI / 2,
    DOUBLE_PI: Math.PI * 2,
};

var Utils = {

    distance: function(p1, p2) {
        var dx = p2[0] - p1[0];
        var dy = p2[1] - p1[1];
        return Math.sqrt(dx * dx + dy * dy);
    },
    getAABB: function(points) {
        var minX = Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity;
        for (var i = 0, len = points.length; i < len; i++) {
            var p = points[i];
            minX = Math.min(minX, p[0]);
            maxX = Math.max(maxX, p[0]);
            minY = Math.min(minY, p[1]);
            maxY = Math.max(maxY, p[1]);
        }
        return [minX, minY, maxX, maxY, maxX - minX, maxY - minY];
    },

    // dot = [vector1[i] * vector2[i] for i in range(vector1)]
    // sum_vector1 += sum_vector1 + (vector1[i]*vector1[i] for i in range(vector1))
    // sum_vector2 += sum_vector2 + (vector2[i]*vector2[i] for i in range(vector2))
    // dot/( Math.sqrt(sum_vector1*sum_vector2) )

    cosSimilarity: function(vector1, vector2) {
        var dot = 0;
        var sum1 = 0,
            sum2 = 0;
        for (var i = 0; i < vector1.length; i++) {
            var v1 = vector1[i],
                v2 = vector2[i];
            dot += v1 * v2;
            sum1 += v1 * v1;
            sum2 += v2 * v2;
        }
        return dot / Math.sqrt(sum1 * sum2);
    },

    cosDistance: function(vector1, vector2) {
        // return 1-Utils.cosSimilarity(vector1,vector2);
        var a = 0;
        var b = 0;
        for (var i = 0; i < vector1.length; i += 2) {
            a += vector1[i] * vector2[i] + vector1[i + 1] * vector2[i + 1];
            b += vector1[i] * vector2[i + 1] - vector1[i + 1] * vector2[i];
        }
        var angle = Math.atan(b / a);
        var d = Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
        return d;
    },

    polylineLength: function(points) {
        var d = 0;
        for (var i = 1, len = points.length; i < len; i++) {
            d += Utils.distance(points[i - 1], points[i]);
        }
        return d;
    },

    resample: function(points, n) {
        var I = Utils.polylineLength(points) / (n - 1);
        var D = 0;
        var p1 = points[0];
        var newPoints = [
            [p1[0], p1[1]]
        ];
        var len = points.length;
        for (var i = 1; i < len;) {
            var p2 = points[i];
            var d = Utils.distance(p1, p2);
            if ((D + d) >= I) {
                var k = (I - D) / d;
                var qx = p1[0] + k * (p2[0] - p1[0]);
                var qy = p1[1] + k * (p2[1] - p1[1]);
                var q = [qx, qy];
                newPoints.push(q);
                D = 0;
                p1 = q;
            } else {
                D += d;
                p1 = p2;
                i++;
            }
        }
        if (newPoints.length == n - 1) {
            newPoints.push([points[len - 1][0], points[len - 1][1]]);
        }
        return newPoints;
    },

    remap: function(val, inMin, inMax, outMin, outMax) {
        return ((val - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
    },

    lerp: function(val, target, amount) {
        return val * (1 - amount) + target * amount;
    }
};