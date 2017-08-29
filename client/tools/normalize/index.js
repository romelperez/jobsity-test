import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';

/**
 * Normalize an attribute params object to update.
 * We set only the allowed properties with values in each case.
 * @param  {Object} params
 * @return {Object} - Mutated normalized version of received params.
 */
export default function normalize (params) {

  // If user changes and the type is different from STRING and the format is
  // different from NONE.
  if (params.type !== ATTRIBUTES_TYPES.STRING
  || params.format !== ATTRIBUTES_STRING_FORMATS.NONE) {
    params.enum = [];
  }

  // If user changes and the type is different from STRING and the format is
  // different from NUMBER.
  if (params.type !== ATTRIBUTES_TYPES.STRING
  || params.format !== ATTRIBUTES_STRING_FORMATS.NUMBER) {
    params.unitsOfMeasurement = null;
    params.rangeMin = null;
    params.rangeMax = null;
    params.precision = null;
    params.accuracy = null;
  }

  // If type is STRING but no format is set.
  if (params.type === ATTRIBUTES_TYPES.STRING && !params.format) {
    params.format = ATTRIBUTES_STRING_FORMATS.NONE;
  }

  // If user changes the type to object.
  if (params.type === ATTRIBUTES_TYPES.OBJECT) {
    params.defaultValue = '';
    params.format = '';
  }

  return params;
}
