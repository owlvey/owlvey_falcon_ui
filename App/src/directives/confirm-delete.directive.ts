import { Directive, Input, Output, ElementRef, OnInit, HostListener, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { concat } from 'rxjs-compat/operator/concat';
@Directive({
  selector: '[appConfirmDelete]'
})
export class ConfirmDeleteDirective {
  @Input() confirmAction: any;
  @Input() item: any;
  @Input() title: string;
  @Input() titleHeader: string;
  @Input() buttonText: string;
  @Input() actionType: string;
  @Input() actionConfirmWord: string;
  @Output() callParentMethod = new EventEmitter();

  e: any;
  parent: any;
  modal: any;
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    let html: string = "";
    if (!this.actionType) {
      this.actionType = "delete"
    }
    if (!this.title) {
      this.title = 'Are you sure to delete this item?';
    }
    if (!this.titleHeader) {
      this.titleHeader = 'Deletion Confirmation';
    }
    if (!this.buttonText) {
      this.buttonText = 'Delete';
    }
    if (!this.actionConfirmWord) {
      this.actionConfirmWord = 'DELETE';
    }
    this.e = $(this.el.nativeElement);
    this.parent = this.e.parent();

    html =
      `<div deleteModal id aria-hidden="false" aria-labelledby="myBasicModalLabel" class="modal fade in show" role="dialog" tabindex="-1" style="display: block;">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">` + this.titleHeader + `</div>
            <div class="modal-body">
              <p class="text-left">` + this.title + `</p>`;

    if (this.actionType === 'delete') {
      html +=
        `<div class="form-group">
              <label>Type <b>"${this.actionConfirmWord.toUpperCase()}"</b> to confirm</label>
              <input type="text" confirmDeleteInput class="form-control"/>
              <small class="form-text text-muted" style="display: none">Please type "<b>${this.actionConfirmWord.toUpperCase()}</b>" to confirm.</small>
            </div>`;
    }

    html +=
      `</div>
          <div class="modal-footer text-right">
            <button closeBtn class="btn btn-main" type="button">Close</button>
            <button confirmDeleteBtn class="btn btn-danger" ` + (this.actionType.toLowerCase() === 'delete' ? 'disabled' : '') + `>` + this.buttonText + `</button>
          </div>
          </div>
        </div>
      </div>`;

    this.modal = $(html);

    this.initEvents();
  }

  closeModal() {
    console.log("Close Modal");
    $("[deleteModal]").remove();
    $("[confirmDeleteBackdrop]").remove();
  }

  enableModalButtons() {
    $("[confirmDeleteBtn]").removeAttr("disabled");
    $("[closeBtn]").removeAttr("disabled");
  }

  initEvents() {
    if (this.actionType === 'delete') {
      this.modal.find("[confirmDeleteInput]").on("keyup", () => {
        if (this.modal.find("[confirmDeleteInput]").val().toLowerCase() === this.actionConfirmWord.toLowerCase()) {
          this.modal.find("[confirmDeleteBtn]").attr("disabled", null);
        } else {
          this.modal.find("[confirmDeleteBtn]").attr("disabled", "");
        }
      })
    }

    this.modal.find("[closeBtn]").on("click", () => {
      this.modal.remove();
      $("[confirmDeleteBackdrop]").remove();
    });

    this.modal.find("[confirmDeleteBtn]").off("click");
    this.modal.find("[confirmDeleteBtn]").on("click", () => {
      this.modal.find("[confirmDeleteBtn]").attr("disabled", "");
      this.modal.find("[closeBtn]").attr("disabled", "");
      if (this.actionType === "delete" && this.modal.find("[confirmDeleteInput]").val().toLowerCase() !== this.actionConfirmWord.toLowerCase()) {
        this.modal.find("[confirmDeleteInput]").siblings(".form-text").show();
      } else {
        this.modal.find("[confirmDeleteInput]").siblings(".form-text").hide();
        this.callParentMethod.next(this.item);
      }
    });
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    $("body").append($('<div confirmDeleteBackdrop class="fade in show modal-backdrop"></div>'));
    $("body").append(this.modal);
    this.initEvents();
  }
}
