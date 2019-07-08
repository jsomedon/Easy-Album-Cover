/**
 * author: jay.somedon@outlook.com
 *
 * urls to album covers on spotify are structured like this:
 *
 * <...nodes...>
 *   <div class="cover-art-image cover-art-image-loaded" style="
 *     background-image: url("urlmax");   <--- the shit we want
 *   ">
 *
 * this script will parse that urlmax out
 */

const div = () =>
    document.querySelector(".cover-art-image.cover-art-image-loaded");

const cover_url = (div) =>
    div.style["background-image"].split("\"")[1];

const extract_url = () => cover_url(div());

browser.runtime.onMessage.addListener(
    (req_msg, sender, response) =>
        req_msg == "EXTRACTOR" ?
            response({
                "type": "EXTRACTOR",
                "value": extract_url()
            }) :
            undefined);