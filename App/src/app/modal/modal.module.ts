import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./modal/modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ModalSidebarComponent } from "./modal-sidebar/modal-sidebar.component";
import { CreateCustomerComponent } from "../customer/create-customer/create-customer.component";
import { CreateFeatureComponent } from "src/app/feature/create-feature/create-feature.component";
import { FormSquadComponent } from "src/app/squad/form-squad/form-squad.component";

@NgModule({
  declarations: [ModalComponent, ModalSidebarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [ModalComponent, ModalSidebarComponent],
  entryComponents: [
    CreateCustomerComponent,
    CreateFeatureComponent,
    FormSquadComponent
  ]
})
export class ModalModule {}
