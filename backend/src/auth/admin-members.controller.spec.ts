
import { describe, expect, it, vi } from 'vitest';
import { ForbiddenException } from '@nestjs/common';

import { AdminMembersController } from './admin-members.controller.js';
import type { AdminMembersService } from './admin-members.service.js';

describe('AdminMembersController - Autorisations CCPD', () => {
  function setup(role: string) {
    const adminMembers = {
      findPending: vi.fn().mockResolvedValue([]),
      approveMember: vi.fn().mockResolvedValue({
        id: 'member-test',
        role: 'MEMBRE',
        isActive: true,
      }),
    };

    const controller = new AdminMembersController(
      adminMembers as unknown as AdminMembersService,
    );

    const request = {
      user: {
        id: 'admin-test',
        role,
        provinceId: null,
      },
    };

    return {
      controller,
      adminMembers,
      request,
    };
  }

  it('autorise ADMIN a consulter les inscriptions', async () => {
    const { controller, adminMembers, request } =
      setup('ADMIN');

    const result = await controller.pending(request);

    expect(result).toEqual([]);
    expect(adminMembers.findPending).toHaveBeenCalledOnce();
  });

  it('interdit a MEMBRE de consulter les inscriptions', async () => {
    const { controller, adminMembers, request } =
      setup('MEMBRE');

    await expect(
      controller.pending(request),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(adminMembers.findPending).not.toHaveBeenCalled();
  });

  it('interdit au responsable provincial d approuver un membre', async () => {
    const { controller, adminMembers, request } =
      setup('RESPONSABLE_PROVINCIAL');

    await expect(
      controller.approve(
        request,
        '123e4567-e89b-42d3-a456-426614174000',
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(adminMembers.approveMember).not.toHaveBeenCalled();
  });

  it('autorise ADMIN a approuver un membre', async () => {
    const { controller, adminMembers, request } =
      setup('ADMIN');

    const id = '123e4567-e89b-42d3-a456-426614174000';

    const result = await controller.approve(request, id);

    expect(result.isActive).toBe(true);
    expect(adminMembers.approveMember).toHaveBeenCalledWith(id);
  });
});
