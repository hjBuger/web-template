import sanitizeHtml from 'sanitize-html'
import merge from 'lodash.merge'

const defaultOptions = {
    allowedTags: [
        'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4',
        'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div',
        'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre',
        'ul', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn',
        'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp',
        'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'caption',
        'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
    ],
    disallowedTagsMode: 'discard',
    // allow all attributes
    allowedAttributes: false,
    // Lots of these won't come up by default because we don't allow them
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    // URL schemes we permit
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false
}
/**
 * 消毒html字符串
 * @param {string | { html: string, options?: object }} value html字符串
 * @returns {string}
 * @doc https://github.com/apostrophecms/sanitize-html
 */
function safeHtml (value) {
    if (typeof value === 'string') {
        return sanitizeHtml(value, defaultOptions)
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
        const options = merge({}, defaultOptions, value.options || {})
        return sanitizeHtml(value.html, options)
    }
    return ''
}

function sanitizeHtmlDirectiveFn (el, { value, modifiers }) {
    const allowedTags = Object.keys(modifiers)
    if (allowedTags.length) {
        el.innerHTML = safeHtml({
            html: value,
            options: {
                allowedTags
            }
        })
    } else {
        el.innerHTML = safeHtml(value)
    }
}

/**
 * 消毒html指令
 * @example
 * v-safe-html="html"
 * 允许a标签、img标签
 * v-safe-html.a.img="html"
 */
const sanitizeHtmlDirective = {
    bind: sanitizeHtmlDirectiveFn,
    update: sanitizeHtmlDirectiveFn
}

export {
    sanitizeHtmlDirective,
    safeHtml
}

