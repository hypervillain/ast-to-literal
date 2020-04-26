const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const equal = require('deep-equal')

const toJs = require('..')

const sampleObject = require('./sample')
const sampleCode = fs.readFileSync(path.join(__dirname, 'sample.js'), 'utf8')

test('compared objects are deeply equal', () => {
  const ast = parser.parse(sampleCode)
  const object = ast.program.body[0].expression.right
  expect(equal(sampleObject, toJs(object))).toBe(true);
})