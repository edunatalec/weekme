export class JwtPayloadModel {
  readonly sub: string;
  readonly fullName: string;
  readonly avatarUrl: string | null;
  readonly iat?: number;
  readonly exp?: number;
}
