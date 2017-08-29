/**
 * Validate the fields provided and their affected fields, returning an array
 * with each field status.
 * @param  {String|Array} namesList - An array with the names of the fields to validate
 * or just one field name.
 * @param  {Object} map - The map to validate.
 * @return {Array} - A pair with the field name as `name` and status by `message`.
 */
export default function (namesList, map) {

  const fields = [];
  const names = Array.isArray(namesList) ? namesList : [namesList];

  const validate = (name) => {
    if (fields.find(el => el.name === name)) return;
    const message = this.validateField(name, map);
    fields.push({ name, message });
  };

  names.forEach(name => {

    validate(name);

    this.settings.fields.forEach(field => {
      const isListener = (field.listenTo || []).find(el => el === name);
      if (isListener) {
        validate(field.name);
      }
    });
  });

  return fields;
}
