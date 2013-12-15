
/**!
 * @license prefixer.js v0.2
 * (c) 2014 Giuseppe Scotto Lavina <mailto:gscotto78{at}gmail.com>
 * Available under MIT license 
 */

;(function( name, style, prefixes, len ) {

  "use strict"

  var
    cache    = {},
    idx      = len,
    prefix   = "",
    key      = prefix,
    reg1     = /-+(.)?/g,
    reg2     = /([A-Z])/g,
    reg3     = /[-_\s]+/g,
    camelize = (function( fn1, fn2, nill ) {
      return function camelize( str, noFirst ) {
        return str.replace(reg1, noFirst ? fn1 : fn2)
      }
    })(
      function regMatch1(match, chr, idx) {
        return chr ? (!idx ? chr.toLowerCase() : chr.toUpperCase()) : nill
      },
      function regMatch2(match, chr, idx) {
        return chr ? chr.toUpperCase() : nill
      },
      ""
    )

  function dasherize( str ) {

    return str.trim().replace(reg2, "-$1").replace(reg3, "-").toLowerCase()
  }

  function prefixer( prop, camel ) {

    key = camel ? prop + "C" : prop

    if(!(key in cache) && (idx = len))

      while(idx--) if((prefix = prefixes[idx] + prop) in style || camelize(prefix) in style) {

        cache[key] = camel ? camelize(prefix, idx === 3) : dasherize(prefix)

        break
      }

    return key in cache ? cache[key] : prop
  }

  prefixer.dasherize = dasherize

  prefixer.camelize = camelize

  this[name] = prefixer

}).call(

  this,

  "prefixer",

  document.documentElement.style,

  ["-o-", "-ms-", "-moz-", "-webkit-", ""],

  5
)
