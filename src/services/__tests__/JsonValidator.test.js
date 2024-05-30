const { JsonValidator } = require('../JsonValidator');

describe('JsonValidator', () => {
    test('should return valid for correct JSON', () => {
        const result = JsonValidator.validate('{"name": "Mikhail"}');
        expect(result.isValid).toBe(true);
        expect(result.error).toBeNull();
    });

    test('should return error for incorrect JSON', () => {
        const result = JsonValidator.validate('{"name": "Mikhail"');
        expect(result.isValid).toBe(false);
        expect(result.error).not.toBeNull();
    });

    test('should return error for empty string', () => {
        const result = JsonValidator.validate('');
        expect(result.isValid).toBe(false);
        expect(result.error).not.toBeNull();
    });

    test('should return error for JSON with extra comma', () => {
        const result = JsonValidator.validate('{"name": "Mikhail",}');
        expect(result.isValid).toBe(false);
        expect(result.error).not.toBeNull();
    });

    test('should return valid for JSON with array of objects', () => {
        const result = JsonValidator.validate('[{"name": "Mikhail"}, {"name": "John"}]');
        expect(result.isValid).toBe(true);
        expect(result.error).toBeNull();
    });

    test('should return valid for JSON with nested objects', () => {
        const result = JsonValidator.validate('{"name": "Mikhail", "details": {"age": 30, "city": "Moscow"}}');
        expect(result.isValid).toBe(true);
        expect(result.error).toBeNull();
    });
});