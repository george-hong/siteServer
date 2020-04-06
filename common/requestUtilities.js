const requestUtilities = {
  // 抽取对象中的一部分字段生成一个新对象
  // object 需要抽取字段的对象
  // fields {Array, String} 需要抽取的字段，如果是String则以逗号分隔
  extractFieldsAsAObject(object, fields) {
    const result = [];
    let fieldsArr = fields;
    if (typeof fields === 'string') {
      fieldsArr = fields.split(',');
    }
    fieldsArr.forEach(fieldName => {
      const value = object[fieldName];
      result[fieldName] = value;
    });
    return result;
  }
};

module.exports = requestUtilities;