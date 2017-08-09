import * as url from "url"
import * as pathResolver from "path"

export const path = (dir: string) => pathResolver.join(__dirname, "..", dir)

export const index = () => {
  return url.format({
    pathname: path("assets/desktop/index.html"),
    protocol: "file:",
    slashes: true
  })
}
