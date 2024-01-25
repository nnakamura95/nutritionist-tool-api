import moment from "moment";

export class Validator {
  private readonly data: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.data = data;
  }

  valid() {
    let validationResult: Record<string, any> = {};

    for (const key in this.data) {
      const field = this.data[key];

      // Check max length
      if (
        field.maxLength &&
        field.value.length > field.maxLength
      ) {
        throw new Error(
          `${key} exceeds maximum length`,
        );
      }

      // Check date time format
      if (
        field.dateTimeFormat &&
        !this.isValidDateTime(field.value, field.dateTimeFormat)
      ) {
        throw new Error(`${key} has an invalid date time format`);
      }

      if (
        field.dateFormat &&
        !this.isValidDate(field.value, field.dateFormat)
      ) {
        throw new Error(`${key} has an invalid date format`);
      }

      // Custom function
      if (
        field.handler &&
        typeof field.handler === "function" &&
        !field.handler(field.value)
      ) {
        throw new Error(`${key} is invalid value`);
      }

      // Validation passed, add to result object
      validationResult[key] = field.value;
    }

    return validationResult;
  }

  private isValidDateTime(dateTimeString: string, format: string): boolean {
    return moment(dateTimeString, format).isValid();
  }

  private isValidDate(dateString: string, format: string): boolean {
    return moment(dateString, format).isValid();
  }
}
