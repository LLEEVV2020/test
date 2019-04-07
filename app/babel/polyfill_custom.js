if(document.documentElement.closest === undefined){
    // Element.prototype.matches
   Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
        
        var element = this;
        var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
        var index = 0;

        while (elements[index] && elements[index] !== element) {
            ++index;
        }

        return !!elements[index];
    };

    /**
     * Альтернатива функции parents
     */
    // Element.prototype.closest
    Element.prototype.closest = function closest(selector) {
        var node = this;

        while (node) {
            if (node.matches(selector)) return node;
            else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
        }

        return null;
    };

    /**
     * Альтернатива функции remove. Так как её нет в IE11.
     */
    (function() {
        var arr = [window.Element, window.CharacterData, window.DocumentType];
        var args = [];
      
        arr.forEach(function (item) {
          if (item) {
            args.push(item.prototype);
          }
        });
      
        // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
        (function (arr) {
          arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
              return;
            }
            Object.defineProperty(item, 'remove', {
              configurable: true,
              enumerable: true,
              writable: true,
              value: function remove() {
                this.parentNode.removeChild(this);
              }
            });
          });
        })(args);
      })();
}
