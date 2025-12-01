export enum TokenKind {
  PLUS,
  MINUS,
  NUMBER,
}

function describe(token: TokenKind): string {
  switch (token) {
    case TokenKind.PLUS:
      return "addition operator";
    case TokenKind.NUMBER:
      return "numeric literal";
    default:
      return "unknown";
  }
}

console.log(describe(TokenKind.PLUS));
