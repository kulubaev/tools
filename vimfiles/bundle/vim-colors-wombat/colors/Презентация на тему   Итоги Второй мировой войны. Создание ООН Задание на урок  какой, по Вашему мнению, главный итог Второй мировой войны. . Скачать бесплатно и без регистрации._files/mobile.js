function adv_rem() {
    document.getElementById('btw_adv').style.display='none';
}
(function () {

if (document.getElementById('btw_adv')) {
    return;
}
if (window.m_up == undefined || m_up instanceof Array != true) {
    return;
}
if (window!=window.top) {
    return;
}
var ismobile = navigator.userAgent.match(
    /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i
)
var istablet = navigator.userAgent.match(
    /ipad|android 3|Silk-Accelerated|sch-i800|playbook|tablet|kindle|gt-p1000|GT-P|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i
)

if (ismobile == null && istablet == null) {
    return;
}


// определяем размеры устройства и подходящего блока
screen_size = [
    {'w':600, 'h':100},
    {'w':450, 'h':75},
    {'w':300, 'h':50},
    {'w':216, 'h':36},
    {'w':168, 'h':28},
    {'w':120, 'h':20},
];
screen_size.sort(function (item1, item2) {
   return item1['w'] < item2['w'];
});
block_size = false;
for (var i = 0; i<screen_size.length; i++) {
    if (document.body.clientWidth > screen_size[i]['w'] && document.body.clientHeight > screen_size[i]['h']) {
        block_size = screen_size[i];
        break;
    }
}
if (block_size == false) {
    // нет подходящих размеров
    return;
}


var baseURL = ('https:' == document.location.protocol ? 'https://' : 'http://')
            + 'ads.betweendigital.com/'; // This URL should be changed.
// Get TZ offset
var tzOffset = new Date().getTimezoneOffset();
// Get major flash version
var flashVersion = 0;
if (typeof navigator.plugins != undefined
    && typeof navigator.plugins["Shockwave Flash"] == "object" ) {
    var d = navigator.plugins["Shockwave Flash"].description;
    if (d && !(typeof navigator.mimeTypes != undefined
        && navigator.mimeTypes["application/x-shockwave-flash"]
        && !navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
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
section = 0;
// Add user-defined params to final URL
if (m_up instanceof Array ) {
    for (var i=0; i< m_up.length; i++) {
        if (!m_up[i] instanceof Array) continue;
        switch (m_up[i][0]) {
            case 's':
                section = m_up[i][1];
                break;
        }
    }
}
// Store all data
var params = [
    'ref='+refererURL,
    'tz='+tzOffset,
    'fl='+flashVersion,
    'w='+block_size['w'],
    'h='+block_size['h'],
    's='+section
];
var embedType = 'adj';
baseURL += embedType + '?' + params.join('&');
document.write(
    "<div id='btw_adv' style='z-index: 9999;position:fixed; bottom:0px;left:50%;margin-left:-"+(block_size['w']/2)+"px;'>"
    + "<div style='position:absolute; top:2px; left:5px;'>"
       + "<a style='background-image:url(http://cache.betweendigital.com/code/close.png);background-repeat: no-repeat;padding:0px 8px;' href='javascript:void(0)' onclick='adv_rem()'></a>"
       + "</div><script type='text/javascript' src='"+ baseURL +"'></script>"
       + "</div>");
})();
