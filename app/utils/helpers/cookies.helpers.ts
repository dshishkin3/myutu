export const cookie = {
    get(name: string) {
        var re = new RegExp('[; ]' + name + '=([^\\s;]*)');
        var sMatch = (' ' + document.cookie).match(re);
        if (name && sMatch) return unescape(sMatch[1]);
        return ''
    },
    set(name: string, value: string) {
        document.cookie = `${name}=${value};`
    }
}