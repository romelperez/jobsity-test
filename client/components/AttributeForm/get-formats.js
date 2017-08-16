import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';

export default function (type) {

  if (type === ATTRIBUTES_TYPES.STRING) {
    const formats = ATTRIBUTES_STRING_FORMATS;
    return [
      <MenuItem key={formats.NONE} value={formats.NONE} primaryText='None' />,
      <MenuItem key={formats.NUMBER} value={formats.NUMBER} primaryText='Number' />,
      <MenuItem key={formats.BOOLEAN} value={formats.BOOLEAN} primaryText='Boolean' />,
      <MenuItem key={formats.DATETIME} value={formats.DATETIME} primaryText='DateTime' />,
      <MenuItem key={formats.CDATA} value={formats.CDATA} primaryText='CDATA' />,
      <MenuItem key={formats.URI} value={formats.URI} primaryText='URI' />
    ];
  }

  return [];
}
