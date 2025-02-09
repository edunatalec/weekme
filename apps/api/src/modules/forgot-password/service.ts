import { Injectable } from '@nestjs/common';
import {
  encodeStringToBase64,
  ForgotPasswordEntity,
  UserEntity,
} from '@repo/core';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/service';
import { MailerService } from 'src/core/services/mailer/service';
import { hashPassword } from 'src/modules/auth/utils/password';
import { generateCode } from 'src/modules/forgot-password/utils/code';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        active: true,
      },
      include: {
        forgotPassword: true,
      },
    });

    if (user) return userToEntity(user);

    return null;
  }

  public async sendCode(user: UserEntity): Promise<void> {
    const code = generateCode();
    const expiresAt = new Date();

    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await this.prisma.forgotPassword.create({
      data: {
        code,
        expiresAt: new Date(expiresAt.toISOString()),
        user: { connect: { id: user.id } },
      },
    });

    const encodedInfo = encodeStringToBase64(
      JSON.stringify({
        email: user.email,
        code,
        expiresAt: expiresAt.toISOString(),
      }),
    );

    const link = `${process.env.WEB_URL}/forgot-password/${encodedInfo}/reset`;

    await this.mailer.send({
      to: {
        email: user.email,
        name: user.fullName,
      },
      subject: 'Recuperar senha',
      message: `Olá,<br>
<br>
Você solicitou a recuperação da sua senha.<br>
Acesse o seguinte link: ${link}<br>
<br>
Este link é válido por 10 minutos.<br>
<br>
Se você não solicitou a recuperação de senha, ignore este e-mail.<br>
<br>
Atenciosamente,<br>
Equipe WeekMe`,
    });
  }

  public async updatePassword(email: string, password: string): Promise<void> {
    const hashedPassword = await hashPassword(password);

    const user = await this.prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
      include: {
        forgotPassword: true,
      },
    });

    await this.deleteCode(user.forgotPassword!.id);
  }

  public validateCode(
    forgotPassword: ForgotPasswordEntity,
  ): ForgotPasswordEntity | null {
    const now = new Date().toISOString();

    if (now < forgotPassword.expiresAt.toISOString()) {
      return forgotPassword;
    }

    return null;
  }

  public async deleteCode(id: string): Promise<void> {
    await this.prisma.forgotPassword.delete({
      where: { id },
    });
  }
}
