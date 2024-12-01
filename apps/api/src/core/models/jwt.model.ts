export class JwtPayloadModel {
  readonly sub: string;
  readonly fullName: string;
  readonly avatarUrl: string | null;
}
