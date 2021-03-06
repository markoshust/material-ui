/* eslint-env mocha */
import {assert} from 'chai';
import AutoComplete from './AutoComplete';

describe('<AutoComplete />', () => {
  it('search using fuzzy filter', () => {
    assert.strictEqual(AutoComplete.fuzzyFilter('ea', 'Peach'), true, 'should match Peach with ea');
    assert.strictEqual(AutoComplete.fuzzyFilter('pah', 'Peach'), true, 'should match Peach with pah');
    assert.strictEqual(AutoComplete.fuzzyFilter('peach', 'Peach'), true, 'should match Peach with peach');

    assert.strictEqual(AutoComplete.fuzzyFilter('phc', 'Peach'), false, 'should not match Peach with phc');
    assert.strictEqual(AutoComplete.fuzzyFilter('pp', 'Peach'), false, 'should not match Peach with pp');
    assert.strictEqual(AutoComplete.fuzzyFilter('pb', 'Peach'), false, 'should not match Peach with pb');

    // testing longer string
    const test_string = 'The best thing about a Boolean is even if you are wrong, you are only off by a bit.';

    let search_result = AutoComplete.fuzzyFilter('bOOLEAN', test_string);
    assert.strictEqual(search_result, true, 'should match with case insensitive');

    search_result = AutoComplete.fuzzyFilter('The a Boolean if wrong', test_string);
    assert.strictEqual(search_result, true, 'should match pattern with spaces');

    search_result = AutoComplete.fuzzyFilter(' if ,bit.', test_string);
    assert.strictEqual(search_result, true, 'should match pattern with comma and period');

    search_result = AutoComplete.fuzzyFilter('the best q', test_string);
    assert.strictEqual(search_result, false, 'should not match pattern with letter is not contained in search text');

    search_result = AutoComplete.fuzzyFilter('off bit by', 'off by a bit');
    assert.strictEqual(search_result, false, 'should not match pattern when can not find letters in order ');
  });
});
