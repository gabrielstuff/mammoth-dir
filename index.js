var mammoth = require('mammoth')
const klaw = require('klaw')
const fs = require('fs')
const path = require('path')
const settings = require('standard-settings').getSettings()

let convertDocXtoHTML = (docxPath) => {
  if (path.extname(docxPath) === '.docx') {
    mammoth.convertToHtml({path: docxPath})
      .then(function (result) {
        let htmlPath = docxPath.replace('.docx', '.html')
        fs.writeFile(htmlPath, result.value, (err) => {
          if (err) throw err
          console.log(`The file ${htmlPath} has been saved!`)
        })
      })
      .done()
  }
}

klaw(settings.docXdir)
  .on('data', item => convertDocXtoHTML(item.path))
