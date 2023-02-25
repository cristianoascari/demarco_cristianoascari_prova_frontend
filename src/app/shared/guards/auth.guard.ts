// Angular modules.
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor() {}

  // ------------------------------------------------------------------------
  // NOTA:
  // Na prática haveria uma validação mais completa para cada rota.
  // ------------------------------------------------------------------------
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }

}
