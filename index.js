const t = require('@babel/types')

const easyPeasies = ['BooleanLiteral', 'StringLiteral', 'NumericLiteral']

function extractVal(node) {
  if (easyPeasies.includes(node.type)) {
		return node.value
	}

	if (t.isNullLiteral(node) || (node.name === 'undefined' && !node.value)) {
		return null
	}

	if (t.isObjectExpression(node)) {
		return computeProps(node.properties)
	}

	if (t.isArrayExpression(node)) {
		return node.elements.map(extractVal)
  }
  console.error(
    `[ast-to-literal] Node of type "${type}" could not be computed.
Adding the case may be possible: file an issue on Github! 👍\n`
  )
}

function computeProps(props) {
  return props.reduce((acc, prop) => {
    const val = extractVal(prop.value)
    if (val) {
      return {
        ...acc,
        [prop.key.name]: val
      }
    }
    return acc
  }, {})
}

function toJs(node) {
  if (!node || node.type !== 'ObjectExpression') {
    return console.error('[ast-to-literal] Expects a node of type "ObjectExpression" as argument')
  }
  return computeProps(node.properties)
}

module.exports = toJs