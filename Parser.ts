/* Letter Parser: Recursive Descent Implementation */

// TokenType describes the “kind” of token
export enum TokenType {
  // Single-character tokens
  EQUAL = "EQUAL",
  PLUS = "PLUS",
  MINUS = "MINUS",
  STAR = "STAR",
  SLASH = "SLASH",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  COMMA = "COMMA",
  COLON = "COLON",

  // Multi character tokens
  IDENT = "IDENT",
  NUMBER = "NUMBER",

  // Special tokens
  EOF = "EOF",
}

// Interface for a single token object
export interface Token {
  type: TokenType;
  lexeme: string; // Raw text, e.g. "SUM", "3.14", "+"
  line: number;
  column: number;
}

// The Lexer walks through the text one character at a time, and converts it into structured meaning (ie: tokens)
export class Lexer {
  private sourceText: string;
  private cursorIndex: number = 0; // Cursor for the lexer
  private line: number = 1; // For error reporting, 1-indexed
  private column: number = 1; // For error reporting, 1-indexed

  constructor(sourceText: string) {
    this.sourceText = sourceText;
  }

  // Main public entry point
  // Calls nextToken() repeatedly, collects tokens and stops when EOF is produced

  public tokenize(): Token[] {
    // 01 - Initialize empty array to store tokens
    const tokens: Token[] = [];

    while (!this.isAtEnd()) {
      const token = this.nextToken();
      tokens.push(token);
      if (token.type === TokenType.EOF) break;
    }

    return tokens;
  }

  // Checks whether the cursor has reached the end of the sourceText
  private isAtEnd(): boolean {
    return this.cursorIndex >= this.sourceText.length;
  }

  // Returns the current character under the lexer cursor
  private currentChar(): string | null {
    if (this.isAtEnd()) return null;
    return this.sourceText[this.cursorIndex];
  }

  // Moves cursor to the next character and returns the consumed character
  private advance(): string | null {
    let consumedCharacter = this.currentChar();
    if (consumedCharacter === null) return null;

    this.cursorIndex++;

    if (consumedCharacter === "\n") {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }

    return consumedCharacter;
  }

  // Core scanning engine to return exactly ONE token per call
  private nextToken(): Token {
    // placeholder: we'll fill this in
    return {
      type: TokenType.EOF,
      lexeme: "",
      line: this.line,
      column: this.column,
    };
  }

  ///////// HELPERS //////////
  private isWhitespace(char: string | null): boolean {
    if (char === null) return false;
    return char === " " || char === "\t" || char === "\n" || char === "\r";
  }

  //   private isDigit(ch: string | null): boolean {
  //     // TODO
  //   }

  //   private isLetter(ch: string | null): boolean {
  //     // TODO
  //   }
}

function isWhitespace(char: string | null): boolean {
  if (char === null) return false;
  return char === " " || char === "\t" || char === "\n" || char === "\r";
}

function isDigit(char: string | null): boolean {
  return char !== null && char >= "0" && char <= "9";
}

console.log(isDigit("5"));
