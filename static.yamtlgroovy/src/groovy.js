import {define} from "ace-builds";

define("ace/mode/groovy_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {


var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var GroovyHighlightRules = function() {

    var keywords = (
        "assert|with|abstract|continue|for|new|switch|" +
        "assert|default|goto|package|synchronized|" +
        "boolean|do|if|private|this|" +
        "break|double|implements|protected|throw|" +
        "byte|else|import|public|throws|" +
        "case|enum|instanceof|return|transient|" +
        "catch|extends|int|short|try|" +
        "char|final|interface|static|void|" +
        "class|finally|long|strictfp|volatile|" +
        "def|float|native|super|while" + 
        // YAMTL
        "query|rule|ruleStore|helperStore|header|in|out|inOut|" +
        "staticAttribute|staticOperation|contextualOperation|YAMTLModule" +
        "filter|globalFilter|derivedWith||endWith|inheritsFrom|isAbstract|" +
        "isLazy|isUniqueLazy|isTransient|using|overriding|drop|freeze|unfreeze|" +
        "priority|fetch|toMany" +
        // YAMTL QUERY DSL
        "context|where"
    );

    var buildinConstants = (
        "null|Infinity|NaN|undefined"
    );

    var langClasses = (
        "AbstractMethodError|AssertionError|ClassCircularityError|"+
        "ClassFormatError|Deprecated|EnumConstantNotPresentException|"+
        "ExceptionInInitializerError|IllegalAccessError|"+
        "IllegalThreadStateException|InstantiationError|InternalError|"+
        "NegativeArraySizeException|NoSuchFieldError|Override|Process|"+
        "ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|"+
        "SuppressWarnings|TypeNotPresentException|UnknownError|"+
        "UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|"+
        "InstantiationException|IndexOutOfBoundsException|"+
        "ArrayIndexOutOfBoundsException|CloneNotSupportedException|"+
        "NoSuchFieldException|IllegalArgumentException|NumberFormatException|"+
        "SecurityException|Void|InheritableThreadLocal|IllegalStateException|"+
        "InterruptedException|NoSuchMethodException|IllegalAccessException|"+
        "UnsupportedOperationException|Enum|StrictMath|Package|Compiler|"+
        "Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|"+
        "NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|"+
        "NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|"+
        "Character|Boolean|StackTraceElement|Appendable|StringBuffer|"+
        "Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|"+
        "StackOverflowError|OutOfMemoryError|VirtualMachineError|"+
        "ArrayStoreException|ClassCastException|LinkageError|"+
        "NoClassDefFoundError|ClassNotFoundException|RuntimeException|"+
        "Exception|ThreadDeath|Error|Throwable|System|ClassLoader|"+
        "Cloneable|Class|CharSequence|Comparable|String|Object"
    );

    // TODO var importClasses = "";

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "support.function": langClasses,
        "constant.language": buildinConstants
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string.regexp",
                regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
            }, {
                token : "string",
                regex : '"""',
                next  : "qqstring"
            }, {
                token : "string",
                regex : "'''",
                next  : "qstring"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language.boolean",
                regex : "(?:true|false)\\b"
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\?:|\\?\\.|\\*\\.|<=>|=~|==~|\\.@|\\*\\.@|\\.&|as|in|is|!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token : "lparen",
                regex : "[[({]"
            }, {
                token : "rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ],
        "qqstring" : [
            {
                token : "constant.language.escape",
                regex : /\\(?:u[0-9A-Fa-f]{4}|.|$)/
            }, {
                token : "constant.language.escape",
                regex : /\$[\w\d]+/
            }, {
                token : "constant.language.escape",
                regex : /\$\{[^"\}]+\}?/
            }, {
                token : "string",
                regex : '"{3,5}',
                next : "start"
            }, {
                token : "string",
                regex : '.+?'
            }
        ],
        "qstring" : [
            {
                token : "constant.language.escape",
                regex : /\\(?:u[0-9A-Fa-f]{4}|.|$)/
            }, {
                token : "string",
                regex : "'{3,5}",
                next : "start"
            }, {
                token : "string",
                regex : ".+?"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(GroovyHighlightRules, TextHighlightRules);

exports.GroovyHighlightRules = GroovyHighlightRules;
});

define("ace/mode/groovy",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/groovy_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var groovyHighlightRules = require("./groovy_highlight_rules").GroovyHighlightRules;

var Mode = function() {
    this.HighlightRules = groovyHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/groovy";
    this.snippetFileId = "ace/snippets/groovy";
}).call(Mode.prototype);

exports.Mode = Mode;
});