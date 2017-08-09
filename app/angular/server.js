require("zone.js/dist/zone-node")
const fs = require("fs")
const glob = require("glob")
const [_, mobile, server] = require("./.angular-cli.json").apps

const [bundle] = glob.sync(`${server.outDir}/main*bundle.js`)
const { renderModuleFactory } = require("@angular/platform-server")
const { AppServerModuleNgFactory } = require(bundle)

const index = `${mobile.outDir}/index.html`
const document = fs.readFileSync(index, "utf8")

renderModuleFactory(AppServerModuleNgFactory, { document, url: "/" }).then(html => {
  fs.writeFileSync(index, html)
  console.log("Rendered index.html")
})
