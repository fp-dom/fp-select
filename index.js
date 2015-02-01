"use strict";

var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

exports.select = select;
var doc = document.body,
    curry = require("fj-curry").curry,
    isDom = require("fd-isDom"),
    ifElse = require("fj-ifelse"),
    and = require("fj-and");

require("6to5/polyfill");

function select(dom, selector) {
  return ifElse(function () {
    return typeof dom === "string";
  }, function () {
    return [].concat(_toArray(doc.querySelectorAll(dom)));
  }, function () {
    return ifElse(and(function () {
      return isDom(dom);
    }, function () {
      return !!selector;
    }), function () {
      return [].concat(_toArray(dom.querySelectorAll(selector)));
    }, function () {
      return curry(select)(dom);
    });
  });
}
exports.__esModule = true;