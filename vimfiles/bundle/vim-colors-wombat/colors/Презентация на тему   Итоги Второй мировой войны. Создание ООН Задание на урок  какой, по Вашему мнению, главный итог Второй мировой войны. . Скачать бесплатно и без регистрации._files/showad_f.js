(function () {

var baseURL = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ads.betweendigital.com/'; // This URL should be changed.

// Get TZ offset
var tzOffset = new Date().getTimezoneOffset();

// Get major flash version
var flashVersion = 0;

if (typeof navigator.plugins != undefined && typeof navigator.plugins["Shockwave Flash"] == "object" ) {
    var d = navigator.plugins["Shockwave Flash"].description;
    if (d && !(typeof navigator.mimeTypes != undefined && navigator.mimeTypes["application/x-shockwave-flash"] && !navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        flashVersion = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
    }
} else if (typeof window.ActiveXObject != undefined) {
    try {
        var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        if (a) {
            var d = a.GetVariable("$version");
            if (d) {
                d = d.split(" ")[1].split(",");
                flashVerstion = parseInt(d[0], 10);
            }
        }
    }
    catch(e) {}
}

// Get referer
var refererURL = '';
if (top!=self)refererURL = encodeURIComponent(document.referrer);

/* Calculate visibility */
// Add new transparent pixel, so we can get it's offset
document.write(
  "<img id=\"tpix_5259338\" src=\"http:\/\/ads.betweendigital.com\/1x1.gif\" alt=\" \" style=\"display:none\"\/>"
);

// Trying to calculate pixel's offsetY
var pix = document.getElementById ? document.getElementById(tpix_5259338) : document.all[tpix_5259338];
var pos = pix ? pix.offsetTop : 0;
while (pix && (pix.offsetParent != null)) {
   pix = pix.offsetParent;
   pos += pix.offsetTop;
   if (pix.tagName == 'BODY') break;
}

// Trying to calculate browser window height
var winHeight = 0;

if( typeof( window.innerHeight ) == 'number' ) {
    // Non-IE
    winHeight = window.innerHeight;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    // IE 6+ in 'standards compliant mode'
    winHeight = document.documentElement.clientHeight;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    // IE 4 compatible
    winHeight = document.body.clientHeight;
}

// Compare and save
if ( (pos || (pos === 0)) && winHeight ) { // If winHeight === 0, there is something wrong, so report as N/A
    pos > winHeight ? pos='btf' : pos='atf';
} else {
    pos='';
}

// Store all data
var params = [ 'ref='+refererURL, 'tz='+tzOffset, 'fl='+flashVersion, 'pos='+pos ];

var embedType = 'adj'; // serve with 'script' tag by default
var size=[];
// Add user-defined params to final URL
if (_up instanceof Array ) {
    for (var i=0; i< _up.length; i++) {
        if (!_up[i] instanceof Array) continue;
        switch (_up[i][0]) {
            case 'tagType':
                embedType = _up[i][1];
                break;
            case 'w':
                size[0] = _up[i][1];
            case 'h':
                size[1] = _up[i][1];
            default:
                params.push(_up[i][0]+'='+_up[i][1]);
                break;
        }
    }
}

baseURL += embedType + '?' + params.join('&');

if (embedType == 'adj') {
    document.write("<script type='text/javascript' src='"+ baseURL +"'></script>");
} else {
    document.write("<iframe src='"+ baseURL +"' style='border:none;height:"+size[1]+"px;width:"+size[0]+"px' width='" + size[0] +"' height='" + size[1]+ "' border='0'></iframe>");
}

})();