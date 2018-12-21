const path = require("path");

module.exports = function(env, options) {
    return {
        entry: {
            index: path.resolve(__dirname, "./src/main.js")
        },
        index_title: "Demo",
        html_name: "",
        template: "",
        product_dir: path.resolve(__dirname,"../../dist/cssprefixer"),
        product_html_dir: path.resolve(__dirname,"../../dist/cssprefixer"),
        product_public_path: "",
        plugins: []
    };
};
