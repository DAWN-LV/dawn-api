import { generateSpecification, specification } from "./specification"
import { IOptions } from "./types"
import { Express } from "express"
import { metadata } from "./globals"
import path from "path"

abstract class RapidocModule {
  static async createDocument(app: Express, options: IOptions) {
    options.openapi = options.openapi || { enabled: true, publicURL: "http://[publicURl]" } 

    generateSpecification(metadata, options)

    app.get("/specification", (_, res) => res.send(specification))
    app.get(options.basePath, (_, res) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"))
    })
  }
}

export { RapidocModule }