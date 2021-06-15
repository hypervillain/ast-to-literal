const t = require('@babel/types')

const easyPeasies = ['BooleanLiteral', 'StringLiteral', 'NumericLiteral']

function toJs(node) {
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
		return node.elements.map(toJs)
  }
}

function computeProps(props) {
  return props.reduce((acc, prop) => {
    const val = toJs(prop.value)
    return {
      ...acc,
      [prop.key.name]: val
    }
    return acc
  }, {})
}

module.exports = toJs