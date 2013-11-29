var Calc = (function() {
    var MIN_RESULT_FONT_SIZE = 16;
    var MAX_CHARS_SHOWABLE_IN_RESULT_INPUT = 1000;

    var resultInput = null;
    var basicTable = null;
    var credits = null;
    var container = null;
    var viewportWidth = null;
    var viewportHeight = null;
    var keyboard = null;

    var calcStr = "";

    /**
     * Calc class constructor
     * @constructor
     */
    return new function() {
        var _self = this;

        /**
         * APP init
         */
        this.init = function() {
            resultInput = document.getElementById("resultInput");

            basicTable = document.getElementById("basic");
            credits = document.getElementById("credits");
            container = document.getElementById("container");

            document.addEventListener('touchstart', function(event) {

                switch (event.target.id) {
                    case 'backspace':
                        _self.backspace();
                        break;
                    case 'equals':
                        _self.equals();
                        break;
                    case 'clear':
                        _self.clear();
                        break;
                    case 'memset':
                        _self.memSet();
                        break;
                    case 'memret':
                        _self.memRet();
                        break;
                    default:
                        _self.append(event.target.attributes['data-char'].value);
                };
            }, false);

            _self.redraw();
        }

        /**
         * Redraw display po zmene velikosti
         */
        this.redraw = function() {
            // viewport: http://javascript.about.com/od/browserobjectmodel/a/bom10.htm, http://www.quirksmode.org/dom/w3c_cssom.html#windowview
            viewportWidth = parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10);
            viewportHeight = parseInt((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.98, 10);
            container.style.width = viewportWidth + "px";
            container.style.height = viewportHeight + "px";
            // font size
            var fontSize = parseInt(resultInput.offsetHeight * 0.9, 10);
            if (MIN_RESULT_FONT_SIZE > fontSize) fontSize = MIN_RESULT_FONT_SIZE;
            document.body.style.fontSize = fontSize + "px";
            MAX_CHARS_SHOWABLE_IN_RESULT_INPUT = parseInt(1.7 * resultInput.offsetWidth / fontSize, 10) - 1;
            // table width 
            basicTable.style.width = (viewportWidth < basicTable.offsetHeight ? parseInt(viewportWidth * 0.99, 10) : basicTable.offsetHeight) + "px";
        };

        /**
         * Update display / vola se po provedeni operace
         */
        this.update_result_display = function() {
            if (calcStr.length >= MAX_CHARS_SHOWABLE_IN_RESULT_INPUT)
                resultInput.value = calcStr.substr(calcStr.length - MAX_CHARS_SHOWABLE_IN_RESULT_INPUT);
            else
                resultInput.value = calcStr;
        };

        /**
         * Add value to display
         * @param {string} value - single char po keypress
         */
        this.append = function(value) {
            calcStr += value;
            _self.update_result_display();
        };

        /**
         * CLS / clear key handler
         */
        this.clear = function() {
            calcStr = "";
            _self.update_result_display();
        };

        /**
         * Set display to local storage
         */
        this.memSet = function() {
            window.localStorage.calcmem = calcStr;
            _self.update_result_display();
        };

        /**
         * Get value from local storage / set it to display
         */
        this.memRet = function() {
            calcStr = window.localStorage.calcmem !== undefined ? window.localStorage.calcmem : calcStr;
            _self.update_result_display();
        };

        /**
         * Backspace key handler
         */
        this.backspace = function() {
            if (1 <= calcStr.length)
                calcStr = calcStr.substr(0, calcStr.length - 1);
            _self.update_result_display();
        };


        /**
         * Eval display value
         * otestovat displej a zobrazit vypoctenou hodnotu
         */
        this.equals = function() {
            var str = resultInput.value;
            str = str.replace(/x/g, "*");
            if (_self.validateMathExp(resultInput.value)) {
                calcStr = eval(str);
                _self.update_result_display();
            }
        }

        /**
         * Pred vypoctem pomoci eval kontrola povolenych znaku
         * @param {string} formula - vzorec smi obsahovat pouze znaky 0-9+-/x.
         */
        this.validateMathExp = function(formula) {
            var mathRegExp = /^[0-9x\.\+-\/]*$/;
            return mathRegExp.test(formula);
        };


    }
})();

window.addEventListener('load', Calc.init, false);
window.addEventListener('resize', Calc.redraw, false);
