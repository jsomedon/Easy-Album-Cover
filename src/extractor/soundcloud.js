/**
 * author: jay.somedon@outlook.com
 *
 * urls to album covers on soundcloud are structured like this:
 *
 * assume we are on song's page..
 * 
 * <div class=l-listen-hero>    <---- the huge player interface
 *   <...children...>
 *     <span class="sc-artwork" style="
 *       background-image: url("urlmax");   <--- the shit we want
 *     ">
 * <div class=l-listen-wrapper> <---- the long comment interface
 *
 * this script will parse that urlmax out
 */

const span = () =>
    document.querySelector('div.l-listen-hero span.sc-artwork.image__full');

// extract url from span's background-image property
const cover_url = (span) =>
    span.style["background-image"].split("\"")[1];

const extract_url = () => cover_url(span());

browser.runtime.onMessage.addListener(
    (req_msg, sender, response) =>
        req_msg == "EXTRACTOR" ?
            response({
                "type": "EXTRACTOR",
                "value": extract_url()
            }) :
            undefined);