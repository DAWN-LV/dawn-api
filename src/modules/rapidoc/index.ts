import path from "path"
import { Express } from "express"
import { IOptions } from "../../types"
import { generateSpecification, specification } from "../../specification"
import { metadata } from "../../globals"

abstract class RapidocModule {
  static async createDocument(app: Express, options: IOptions) {
    options.openapi = options.openapi || { enabled: true, publicURL: "http://[publicURl]" } 

    generateSpecification(metadata, options)

    app.get("/specification", (_, res) => res.send(specification))
    app.get(options.basePath, (_, res) => {
      res.sendFile(path.join(__dirname, "..", "..", "..", "dist", "common", "index.html"))
    })
  }
}

export { RapidocModule }