import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: {
        id: string;
        role: string;
      };
    }>();

    if (!request.user?.id) {
      throw new UnauthorizedException(
        'Authentification requise.',
      );
    }

    if (request.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Acces reserve aux administrateurs.',
      );
    }

    return true;
  }
}