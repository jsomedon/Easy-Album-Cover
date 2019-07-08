/**
 * author: jay.somedon@outlook.com
 *
 * urls to album covers on bandcamp are structured like this:
 *
 * <div id="tralbumArt">
 *   <a class="popupImage" href="urlmax"> <-- we want this shit
 *     <img src="url to some lower res img"> <-- not the shit we want
 *
 * this script will parse that urlmax out
 */

// yeah I know it's a terrible name,
// but we are referring to THE element a,
// the link element containing urlmax
const a = () => document.querySelector("div#tralbumArt a.popupImage");

const extract_url = () => a().href;

browser.runtime.onMessage.addListener(
    (req_msg, sender, response) =>
        req_msg == "EXTRACTOR" ?
            response({
                "type": "EXTRACTOR",
                "value": extract_url()
            }) :
            undefined);