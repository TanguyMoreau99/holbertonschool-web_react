import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('Utils functions', () => {
  describe('getCurrentYear', () => {
    test('returns the correct year', () => {
      const currentYear = new Date().getFullYear();
      expect(getCurrentYear()).toBe(currentYear);
    });
  });

  describe('getFooterCopy', () => {
    test('returns "Holberton School" when argument is true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('returns "Holberton School main dashboard" when argument is false', () => {
      expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
  });

  describe('getLatestNotification', () => {
    test('returns the correct notification string', () => {
      const expectedString = '<strong>Urgent requirement</strong> - complete by EOD';
      expect(getLatestNotification()).toBe(expectedString);
    });
  });
});