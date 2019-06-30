const pluginName = 'htmlAfterPlugin'
const hackCode = `(function() {
  var check = document.createElement('script');
  if (!('noModule' in check) && 'onbeforeload' in check) {
    var support = false;
    document.addEventListener('beforeload', function(e) {
      if (e.target === check) {
        support = true;
      } else if (!e.target.hasAttribute('nomodule') || !support) {
        return;
      }
      e.preventDefault();
    }, true);

    check.type = 'module';
    check.src = '.';
    document.head.appendChild(check);
    check.remove();
  }
}());`

class HtmlAfterPlugin {
  constructor ({isHack} = options) {
    this.isHack = isHack
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (htmlPluginDate, cb) => {
        htmlPluginDate.body.forEach((tag) => {
          if(tag.tagName === 'script') {
            if (/.bundle./.test(tag.attributes.src)) {
              delete tag.attributes.type
              tag.attributes.nomodule = ''
            } else {
              tag.attributes.type = 'module'
            }
          }
          if (this.isHack) {
            htmlPluginDate.body.push({
              tagName: 'script',
              closeTag: true,
              innerHTML: hackCode
            })
          }
          cb(null, htmlPluginDate)
        })
      })
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, (htmlPluginDate) => {
        htmlPluginDate.html = htmlPluginDate.html.replace(/\snomodule=""/g, ' nomodule')
      })
    });
  }
}

module.exports = HtmlAfterPlugin