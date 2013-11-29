(function () {
    'use strict';
    var calc = calc || {},
        MIN_RESULT_FONT_SIZE = 16,
        MAX_CHARS_SHOWABLE_IN_RESULT_INPUT = 1000,
        resultInput = null,
        basicTable = null,
        credits = null,
        container = null,
        viewportWidth = null,
        viewportHeight = null,
        calcStr = '';


    /**
     * APP init
     */
    calc.init = function () {
        resultInput = document.getElementById('resultInput');

        basicTable = document.getElementById('basic');
        credits = document.getElementById('credits');
        container = document.getElementById('container');

        document.addEventListener('touchstart', calc.getButtonHandler, false);

        calc.redraw();
    };

    calc.getButtonHandler = function (event) {

        var handlers = {
            'backspace': calc.backspace,
            'equals': calc.equals,
            'clear': calc.clear,
            'memset': calc.memSet,
            'memret': calc.memRet
        };

        if (handlers[event.target.id]) {
            handlers[event.target.id]();
        } else {
            calc.append(event.target.attributes['data-char'].value);
        }


    };


    /**
     * Redraw display po zmene velikosti
     * by Ramesh Nair (www.hiddentao.com)
     */
    calc.redraw = function () {
        // viewport: http://javascript.about.com/od/browserobjectmodel/a/bom10.htm, http://www.quirksmode.org/dom/w3c_cssom.html#windowview
        viewportWidth = parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10);
        viewportHeight = parseInt((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.98, 10);
        container.style.width = viewportWidth + 'px';
        container.style.height = viewportHeight + 'px';
        // font size
        var fontSize = parseInt(resultInput.offsetHeight * 0.9, 10);
        if (MIN_RESULT_FONT_SIZE > fontSize) fontSize = MIN_RESULT_FONT_SIZE;
        document.body.style.fontSize = fontSize + 'px';
        MAX_CHARS_SHOWABLE_IN_RESULT_INPUT = parseInt(1.7 * resultInput.offsetWidth / fontSize, 10) - 1;
        // table width 
        basicTable.style.width = (viewportWidth < basicTable.offsetHeight ? parseInt(viewportWidth * 0.99, 10) : basicTable.offsetHeight) + 'px';
    };

    /**
     * Update display / vola se po provedeni operace
     */
    calc.updateResultDisplay = function () {
        if (calcStr.length >= MAX_CHARS_SHOWABLE_IN_RESULT_INPUT)
            resultInput.value = calcStr.substr(calcStr.length - MAX_CHARS_SHOWABLE_IN_RESULT_INPUT);
        else
            resultInput.value = calcStr;
    };

    /**
     * Add value to display
     * @param {string} value - single char po keypress
     */
    calc.append = function (value) {
        calcStr += value;
        calc.updateResultDisplay();
    };

    /**
     * CLS / clear key handler
     */
    calc.clear = function () {
        calcStr = '';
        calc.updateResultDisplay();
    };

    /**
     * Set display to local storage
     */
    calc.memSet = function () {
        window.localStorage.calcmem = calcStr;
        calc.updateResultDisplay();
    };

    /**
     * Get value from local storage / set it to display
     */
    calc.memRet = function () {
        calcStr = window.localStorage.calcmem !== undefined ? window.localStorage.calcmem : calcStr;
        calc.updateResultDisplay();
    };

    /**
     * Backspace key handler
     */
    calc.backspace = function () {
        if (1 <= calcStr.length)
            calcStr = calcStr.substr(0, calcStr.length - 1);
        calc.updateResultDisplay();
    };


    /**
     * Eval display value
     * otestovat displej a zobrazit vypoctenou hodnotu
     */
    calc.equals = function () {
        var str = resultInput.value;
        str = str.replace(/x/g, '*');
        if (calc.validateMathExp(resultInput.value)) {
            calcStr = eval(str);
            calc.updateResultDisplay();
        }
    };

    /**
     * Pred vypoctem pomoci eval kontrola povolenych znaku
     * takze se eval nemusime bat az tak moc...
     * @param {string} formula - vzorec smi obsahovat pouze znaky 0-9+-/x.
     */
    calc.validateMathExp = function (formula) {
        var mathRegExp = /^[0-9x\.\+-\/]*$/;
        return mathRegExp.test(formula);
    };



    window.addEventListener('load', calc.init, false);
    window.addEventListener('resize', calc.redraw, false);
}());
