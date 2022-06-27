export function hex2a(hexx) {
    var hex = hexx.toString();
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

export function parseTime(timestamp) {
    if (timestamp <= -1) return "Invalid time";
    var date = new Date(timestamp * 1000);
    return (
        date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
    );
}

const EXPOLRER = "https://blockchair.com/dogecoin"

export const EXPOLRER_TX = EXPOLRER + "/transaction/";
export const EXPOLRER_ADDR = EXPOLRER + "/address/";
export const IPFS_DATA = "https://ipfs.dogeseeds.io/";
