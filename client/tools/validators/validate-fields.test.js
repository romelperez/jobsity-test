import vulcanval from 'vulcanval';
import validateFields from './validate-fields';

vulcanval.addMethod('validateFields', validateFields);

describe('vulcanval validateFields()', function () {

  it('Validation of list of fields', function () {
    const vv = vulcanval({
      fields: [
        { name: 'f0', required: true },
        { name: 'f1', required: true },
        { name: 'f2', required: true },
        { name: 'f3', required: true }
      ]
    });
    const map = { f0: '', f1: '', f2: '', f3: '' };
    const actual = vv.validateFields(['f0', 'f2'], map);
    expect(actual).to.be.an('array').to.eql([
      { name: 'f0', message: 'Please fill out this field.' },
      { name: 'f2', message: 'Please fill out this field.' }
    ]);
  });

  it('Validation of one field', function () {
    const vv = vulcanval({
      fields: [
        { name: 'f0', required: true },
        { name: 'f1', required: true },
        { name: 'f2', required: true },
        { name: 'f3', required: true }
      ]
    });
    const map = { f0: '', f1: '', f2: '', f3: '' };
    const actual = vv.validateFields('f1', map);
    expect(actual).to.be.an('array').to.eql([
      { name: 'f1', message: 'Please fill out this field.' }
    ]);
  });

  it('Validation of affected fields', function () {
    const vv = vulcanval({
      fields: [
        { name: 'f0', required: true },
        { name: 'f1', required: true, listenTo: ['f0', 'f3'] },
        { name: 'f2', required: true, listenTo: ['f0'] },
        { name: 'f3', required: true },
        { name: 'f4', required: true }
      ]
    });
    const map = { f0: '', f1: '', f2: '', f3: '', f4: '' };
    const actual = vv.validateFields(['f0', 'f1'], map);
    expect(actual).to.be.an('array').to.eql([
      { name: 'f0', message: 'Please fill out this field.' },
      { name: 'f1', message: 'Please fill out this field.' },
      { name: 'f2', message: 'Please fill out this field.' }
    ]);
  });

});
