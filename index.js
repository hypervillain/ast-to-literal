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
		return node.elements.reduce((acc, element) =>
      [
        ...acc,
        ...element.type === 'SpreadElement' ? toJs(element.argument) : [toJs(element)]
      ],
      [],
    )
  }
}

function computeProps(props) {
  return props.reduce((acc, prop) => {
    if (prop.type === 'SpreadElement') {
      return {
        ...acc,
        ...toJs(prop.argument),
      }
    } else if (prop.type !== 'ObjectMethod') {
      const val = toJs(prop.value)
      if (val !== undefined) {
        return {
          ...acc,
          [prop.key.name]: val
        }
      }
    }
    return acc
  }, {})
}

module.exports = toJs
