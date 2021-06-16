const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')

const toJs = require('..')

const sampleObject = require('./sample')
const sampleCode = fs.readFileSync(path.join(__dirname, 'sample.js'), 'utf8')

delete sampleObject.func
delete sampleObject.spreadedFunc
delete sampleObject.method

test('compared objects are deeply equal', () => {
  const ast = parser.parse(sampleCode)
  const object = ast.program.body[0].expression.right
  expect(toJs(object)).toEqual(sampleObject)
})
