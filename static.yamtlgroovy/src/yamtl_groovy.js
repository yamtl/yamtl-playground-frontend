import {define} from "ace-builds";

define("ace/mode/yamtl_groovy_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules","ace/mode/groovy_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
//var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var GroovyHighlightRules = require("./groovy").GroovyHighlightRules;

var yamtlGroovyHighlightRules = function() {
 
    var keywords = (
        "rule"
    );

    var builtinConstants = (
        ""
    );

    var builtinFunctions = (
        ""
    );

    var dataTypes = (
        ""
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "storage.type": dataTypes
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "text",
            regex : "\\s+"
        } ]
    };
    this.normalizeRules();
};

oop.inherits(yamtlGroovyHighlightRules, GroovyHighlightRules);

exports.yamtlGroovyHighlightRules = yamtlGroovyHighlightRules;
});

define("ace/mode/yamtl_groovy",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/yamtl_groovy_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var yamtlGroovyHighlightRules = require("./yamtl_groovy_highlight_rules").yamtlGroovyHighlightRules;

var Mode = function() {
    this.HighlightRules = yamtlGroovyHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/yamtl_groovy";
    this.snippetFileId = "ace/snippets/yamtl_groovy";
}).call(Mode.prototype);

exports.Mode = Mode;

});
