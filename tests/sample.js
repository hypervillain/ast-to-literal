module.exports = {
  ...{ spreaded: 'foo' },
  ...{ spreadedFunc: () => {} },
  bool: true,
  str: "my-string",
  obj: {
    isObjectExpression: true,
  },
  arr: [...['spreaded'], 1, true, "str", { key: "value" }],
  func: () => {},
  method() {},
};
