import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../../features/auth/services/permission.service';
import { Permissions } from '../../shared/enums/permissions';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);
  private currentPermission!: Permissions;

  @Input() set appHasPermission(permission: Permissions) {
    this.currentPermission = permission;
    this.updateView();
  }

  private updateView() {
    if (this.permissionService.isAdmin() || this.permissionService.hasPermission(this.currentPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
