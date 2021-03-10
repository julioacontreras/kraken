const fs = require('fs')

module.exports = function ({ app, options }) {
  const nodemailer = require('nodemailer')
  const Mustache = require('mustache')

  var transporter = nodemailer.createTransport(
    options.config
  )

  class Email {
    verify () {
      return transporter.verify()
    }

    send (from, to, subject, html) {
      const mailOptions = {
        from,
        to,
        subject: subject,
        html,
        priority: 'high'
      }
      return transporter.sendMail(mailOptions)
    }

    sendTemplateEmail (to, templateName, data) {
      const template = options.templates[templateName]
      const from = template.from
      const templateBody = fs.readFileSync(template.path, { encoding: 'utf8', flag: 'r' })
      const content = Mustache.render(templateBody, data)
      return this.send(from, to, template.subject, content)
    }
  }

  return new Email()
}
