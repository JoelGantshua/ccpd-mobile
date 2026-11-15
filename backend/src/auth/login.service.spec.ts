import { describe, expect, it, vi } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';

import { LoginService } from './login.service.js';
import type { UsersService } from '../users/users.service.js';
import type { AuthService } from './auth.service.js';
import type { JwtService } from '@nestjs/jwt';

describe('LoginService - CCPD Mobile', () => {
  function setup(overrides: {
    user?: Record<string, unknown> | null;
    passwordValid?: boolean;
  } = {}) {
    const defaultUser = {
      id: '123e4567-e89b-42d3-a456-426614174000',
      email: 'membre@example.com',
      fullName: 'Membre CCPD',
      passwordHash: '$argon2id$test',
      role: 'MEMBRE',
      provinceId: 'province-test',
      isActive: true,
      emailVerifiedAt: new Date(),
    };

    const user = Object.prototype.hasOwnProperty.call(
      overrides,
      'user',
    )
      ? overrides.user
      : defaultUser;

    const users = {
      findForAuthentication: vi.fn().mockResolvedValue(user),
    };

    const auth = {
      verifyPassword: vi.fn().mockResolvedValue(
        overrides.passwordValid ?? true,
      ),
    };

    const jwt = {
      signAsync: vi.fn().mockResolvedValue('jwt-test-token'),
    };

    const service = new LoginService(
      users as unknown as UsersService,
      auth as unknown as AuthService,
      jwt as unknown as JwtService,
    );

    const dto = {
      email: 'membre@example.com',
      password: 'MotDePasseTest123!',
    };

    return { service, users, auth, jwt, dto };
  }

  it('refuse un utilisateur inexistant', async () => {
    const { service, jwt, dto } = setup({ user: null });

    await expect(service.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('refuse un mot de passe incorrect', async () => {
    const { service, jwt, dto } = setup({
      passwordValid: false,
    });

    await expect(service.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('refuse un compte non active', async () => {
    const { service, jwt, dto } = setup({
      user: {
        id: 'user-test',
        email: 'membre@example.com',
        passwordHash: '$argon2id$test',
        isActive: false,
        emailVerifiedAt: new Date(),
      },
    });

    await expect(service.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('refuse un compte dont email est non verifie', async () => {
    const { service, jwt, dto } = setup({
      user: {
        id: 'user-test',
        email: 'membre@example.com',
        passwordHash: '$argon2id$test',
        isActive: true,
        emailVerifiedAt: null,
      },
    });

    await expect(service.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('delivre un JWT uniquement pour un compte autorise', async () => {
    const { service, jwt, dto } = setup();

    const result = await service.login(dto);

    expect(result.accessToken).toBe('jwt-test-token');
    expect(result.expiresIn).toBe(900);
    expect(result.tokenType).toBe('Bearer');

    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: result.user.id,
      typ: 'access',
    });

    expect(result).not.toHaveProperty('passwordHash');
  });
});

