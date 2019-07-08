/**
 * author: jay.somedon@outlook.com
 *
 * urls to album covers on itunes are structured like this:
 * 
 * <picture>
 *   <source media="smaller_width">
 *   <source media="smaller_width">
 *   <source media="max_width"
 *     srcset="
 *             url1 1x,     <--- low resolution
 *             url2 2x,     <--- low resolution
 *             urlmax maxx  <--- max resolution, we want this!
 *     ">
 * 
 * this script will parse that urlmax out
 */

const picture = () =>
    document.querySelector("picture.we-artwork.product-artwork--captioned");

const sources = (picture) =>
    Array.from(picture.children).filter(elem => elem.tagName == "SOURCE").filter(elem => elem.hasAttribute("media"));

const width = (source) =>
    parseInt(source.media.match(/\d+/));

const wider = (acc, cur) =>
    (width(acc) > width(cur)) ? acc : cur;

const widest_source = (sources) =>
    sources.reduce(wider);

const greater_url_zoom_pair = (acc, cur) =>
    acc[1] > cur[1] ? acc : cur;

const cover_url = (source) =>
    source.srcset.split(',').map(urlzoomstr => urlzoomstr.split(' ')).reduce(greater_url_zoom_pair)[0];

const compose = (...funcs) =>
    arg => funcs.reduce(
        (val, func) => func(val),
        arg
    );

const extract_url = compose(
    picture,
    sources,
    widest_source,
    cover_url
);

browser.runtime.onMessage.addListener(
    (req_msg, sender, response) =>
        req_msg == "EXTRACTOR" ?
            //console.log(sender) 
            response({
                "type": "EXTRACTOR",
                "value": extract_url()
            }) :
            undefined);