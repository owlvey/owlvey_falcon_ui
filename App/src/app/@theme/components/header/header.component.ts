import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';

import { DeclareFunctionStmt, FunctionCall } from '@angular/compiler';

import { IdentityService } from './../../../core/identity/identity.service';
import { Identity } from './../../../core/identity/identity.class';
import { AuthService } from './../../../core/auth/auth.service';

import { switchMap, debounceTime, finalize, tap } from 'rxjs/operators';
import { EventHandlerService } from 'src/app/event-handler.service';
import { RealtimeService } from '../../../core/realtime/realtime.service';

import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { UtilsService } from '../../../utils.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [IdentityService, AuthService]
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  name: string;
  isLoggedIn: boolean;

  usersForm: FormGroup;
  isLoading: boolean;
  filteredUsers: any[];
  notifications: any[] = [];

  applicationName: string = '';
  notificationsCount: number = 0;
  notificationsCountBadge: string = '';
  notificationsList: any = [
    {
      type: 'project',
      name: null,
      id: null,
      lastSuccessActivity: null,
      finished: false
    },
    {
      type: 'service',
      name: null,
      id: null,
      lastSuccessActivity: null,
      finished: false
    },
    {
      type: 'feature',
      name: null,
      id: null,
      lastSuccessActivity: null,
      finished: false
    },
  ];
  realTimeEvents: any[] = [];

  @ViewChild("sidebarAction") public sidebarAction: ElementRef;
  config: IndividualConfig = {
    positionClass: "toast-top-right",
    toastClass: "notification-toast"
  };

  toolBarModel: any;

  constructor(
    private route: ActivatedRoute,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private identityService: IdentityService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventHandlerService: EventHandlerService,
    private realtimeService: RealtimeService,
    private toastrService: ToastrService,
    private utils: UtilsService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.applicationName = environment.applicationName;
    this.configure();
    this.listenEvents();

    this.eventHandlerService.event.subscribe((event) => {
      if (event.name == 'toolBardChanged') {
        this.toolBarModel = event.data;
        console.log(this.toolBarModel);
      }
    });

  }

  private configure() {
    if (this.isLoggedIn) {
      const userId = this.authService.getUserId();

      // console.log(this.authService.getUser());

      // const f1 = this.authService.getFirstName().charAt(0).toUpperCase();
      // const f2 = this.authService.getLastName().charAt(0).toUpperCase();

      this.name = this.authService.getUserName();
    }
  }

  private listenEvents() {
    this.eventHandlerService.event.subscribe((val: any) => {
      let event: any = val.data;
      if (val.name === 'onCreateProjectSuccess' || val.name === 'onCreateServiceSuccess') {
        this.realTimeEvents.splice(0, 0, {
          type: event.type,
          name: event.name,
          id: event.id,
          currentStep: event.display,
          status: 'In Progress',
          eventData: null
        });

        this.utils.saveLocalItem('__realTimeEvents__', this.realTimeEvents);
      } else if (val.name === 'onUpdateProjectStatus' || val.name === 'onUpdateProjectServiceStatus') {

        this.notificationsCount++;
        event = JSON.parse(event);

        this.realTimeEvents.forEach((el: any, i: number) => {
          if (el.type === 'service' && el.id === event.serviceId) {
            this.toastrService.show(`Update from Service ${el.name}`, '', this.config);
            el.currentStep = event.activityName;
            el.status = event.status;
            el.eventData = event;
          } else if (el.type === 'project' && el.id === event.projectId) {
            this.toastrService.show(`Update from Project ${el.name}`, '', this.config);
            el.currentStep = event.activityName;
            el.status = event.status;
            el.eventData = event;
          }
        });

        this.utils.saveLocalItem('__realTimeEvents__', this.realTimeEvents);
      }

      if (this.notificationsCount > 0) {
        this.notificationsCountBadge = this.notificationsCount.toString();
      }
    });
  }

  showSubmenu(event) {
    // console.log(event);
    const el = event.target;
    const navItems = document.getElementsByClassName('nav-item');

    for (let i = 0; i < navItems.length; i++) {
      navItems[i].className = 'nav-item';
    }
    el.className = 'nav-item show-submenu';
  }

  private logout() {
    this.authService.endAuthentication();
  }

  ngOnInit() {

    //this.userService.getUsers()
    //  .subscribe((users: any) => this.user = users.nick);

    //this.user = this.authService.getUser();

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Profile') {
          this.router.navigate(['/profile/me']);
        } else {
          this.logout();
        }
      });

    this.usersForm = this.formBuilder.group({
      entityId: null,
    });

    this.realTimeEvents = this.utils.getLocalItem("__realTimeEvents__") ? this.utils.getLocalItem("__realTimeEvents__") : [];
  }

  selectUser(user: any) {
    this.router.navigate(['/leads/' + user.entityId]);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  openModal(modal) {
    document.getElementById(modal).click();
  }

  openNewProjectModal() {
    const event = {
      name: 'createProject',
      data: {
        organizationId: this.toolBarModel.organizationId,
        needLoad: true,
      }
    };

    this.eventHandlerService.event.next(event);
  }

  openNewPipeModal() {
    const event = {
      name: 'createPipe',
      data: {
        formMode: 'create',
        organizationId: this.toolBarModel.organizationId,
        projectId: this.toolBarModel.projectId,
        needLoad: true,
        cloudProviderType: '',
        gitProviderType: ''
      }
    };

    this.eventHandlerService.event.next(event);
  }

  openNewFeatureModal() {
    const event = {
      name: 'createFeature',
      data: {
        formMode: 'create',
        needLoad: true,
        organizationId: this.toolBarModel.organizationId,
        projectId: this.toolBarModel.projectId,
      }
    };

    this.eventHandlerService.event.next(event);
  }

  toggleNotificationSidebar(event) {
    this.eventHandlerService.event.next("onUpdateProjectStatus")
    if ($("#sidebarAction").hasClass("open")) {
      $("#sidebarAction").removeClass("open");
      $("#sidebarNotifications").removeClass("open");
    } else {
      $("#sidebarAction").addClass("open");
      $("#sidebarNotifications").addClass("open");
    }
  }

  onGotoView(item: any) {
    console.log(item);
    if (item.type === 'project') {
      this.router.navigate(['/organizations/', item.eventData.organizationId, 'projects', item.eventData.projectId]);
    } else if (item.type === 'service') {
      this.router.navigate(['/organizations/', item.eventData.organizationId, 'projects', item.eventData.projectId, 'pipes', item.eventData.serviceId]);
    }

  }

  goToCreateOrganization() {
    this.router.navigate(['organizations/create']);
  }
}
