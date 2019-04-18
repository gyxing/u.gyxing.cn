const path = require("path");

module.exports = function(env, options) {
    return {
        entry: {
            index: path.resolve(__dirname, "./src/main.js")
        },
        html_name: "",
        template: "",
        product_dir: path.resolve(__dirname,"../../../dist/tables"),
        product_html_dir: path.resolve(__dirname,"../../../dist/tables"),
        product_public_path: "",
        plugins: []
    };
};