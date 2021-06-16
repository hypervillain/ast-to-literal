module.exports = {
  ...{ spreaded: 'foo' },
  ...{ spreadedFunc: () => {} },
  bool: true,
  false: false,
  undef: undefined,
  null: null,
  num: 8,
  str: "my-string",
  obj: {
    isObjectExpression: true,
  },
  arr: [...['spreaded'], 1, true, "str", { key: "value" }],
  func: () => {},
  method() {},
};
