import { Component, OnInit } from '@angular/core';
import { OrganizationDashboardService } from '../../dashboard/organization-dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersGateway } from './../../@core/data/customers.gateway';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  formViewModel: any;
  isGetStarted: boolean;
  loading: boolean = true;

  constructor(private organizationDashboardService: OrganizationDashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private customersGateway: CustomersGateway
  ) {
    this.formViewModel = {
      stats: {}
    };
    this.loadStats();
  }

  //x() {
  //  this.toastr.info("asdasdasd", "xxxx");
  //}

  ngOnInit() {
    this.customersGateway.getCustomers().subscribe(data=>{

    });
  }

  loadStats() {
    this.organizationDashboardService.getStats()
      .subscribe((data: any) => {
        this.formViewModel.stats = data;
        this.loading = false;

        if (this.formViewModel.stats.currentOrganization === 0) {
          this.router.navigate(['/organizations/create']);
        } else {

          // if (this.formViewModel.stats.currentOrganization == 1) {
          //   this.router.navigate(['/organizations/', this.formViewModel.stats.organizationItems[0].organizationId, 'detail']);
          // }

          this.isGetStarted = false;
        }
      });
  }

}
