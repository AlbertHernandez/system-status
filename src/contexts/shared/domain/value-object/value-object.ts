// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class ValueObject<T extends Object> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public value(): T {
    return this._value;
  }

  toString() {
    if (this._value) {
      return this._value.toString();
    }

    return this._value;
  }
}
