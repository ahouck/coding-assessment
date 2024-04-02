import { v4 as uuid } from "uuid";

export class Note {
  id: string;
  /**
   * The plain text of a note
   */
  plainText: string;
  /**
   * The rich text content of the note containing HTML formatting
   */
  displayText: string;
  createdAt: Date;

  constructor({
    plainText,
    displayText,
  }: {
    plainText: string;
    displayText: string;
  }) {
    this.id = uuid();
    this.plainText = plainText;
    this.displayText = displayText;
    this.createdAt = new Date();
  }

  setDisplayText(text: string) {
    this.displayText = this.displayText;
  }

  setPlainText(text: string) {
    this.plainText = text;
  }
}
