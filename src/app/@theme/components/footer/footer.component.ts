import { Component } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by">
      <b><a href="#" target="_blank">Falcon </a></b> 2019</span
    >
    <div class="socials">
      <a
        href="${environment.githubFalconURL}"
        target="_blank"
        class="ion ion-social-github"
      ></a>
      <a
        href="${environment.facebookFalconURL}"
        target="_blank"
        class="ion ion-social-facebook"
      ></a>
      <a
        href="${environment.twitterFalconURL}"
        target="_blank"
        class="ion ion-social-twitter"
      ></a>
      <a
        href="${environment.linkedinFalconURL}"
        target="_blank"
        class="ion ion-social-linkedin"
      ></a>
    </div>
  `
})
export class FooterComponent {}
