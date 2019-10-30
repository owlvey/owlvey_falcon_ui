import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NbComponentShape, NbComponentSize, NbBadgePosition, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'owlvey-tile',
  styleUrls: ['./tile.component.scss'],
  templateUrl: './tile.component.html',
})
export class OwlveyTileComponent {

  imageBackgroundStyle: SafeStyle;

  
  @Input() name: string = 'Anonymous';

  
  @Input() title: string;
  
  @Input()
  set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Color of the area shown when no picture specified
   * @type string
   */
  @Input() color: string;

  /**
   * Size of the component.
   * Possible values: `tiny`, `small`, `medium` (default), `large`, 'giant'.
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Shape of the picture box.
   * Possible values: `rectangle`, `semi-round`, `round`.
   */
  @Input() shape: NbComponentShape = 'round';

  /**
   * Whether to show a user name or not
   */
  @Input()
  get showName(): boolean {
    return this._showName;
  }
  set showName(val: boolean) {
    this._showName = this.convertToBoolProperty(val);
  }
  private _showName: boolean = true;
  /**
   * Whether to show a user title or not
   * @type boolean
   */
  @Input()
  get showTitle(): boolean {
    return this._showTitle;
  }
  set showTitle(val: boolean) {
    this._showTitle = this.convertToBoolProperty(val);
  }
  private _showTitle: boolean = true;

  /**
   * Whether to show a user initials (if no picture specified) or not
   * @type boolean
   */
  @Input()
  get showInitials(): boolean {
    return this._showInitials;
  }
  set showInitials(val: boolean) {
    this._showInitials = this.convertToBoolProperty(val);
  }
  private _showInitials: boolean = true;

  /**
   * Whether to show only a picture or also show the name and title
   * @type boolean
   */
  @Input()
  get onlyPicture(): boolean {
    return !this.showName && !this.showTitle;
  }
  set onlyPicture(val: boolean) {
    this.showName = this.showTitle = !this.convertToBoolProperty(val);
  }

  /**
   * Badge text to display
   * @type string
   */
  @Input() badgeText: string;

  /**
   * Badge status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   * @param {string} val
   */
  @Input() badgeStatus: NbComponentStatus;

  /**
   * Badge position.
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() badgePosition: NbBadgePosition;

  @HostBinding('class.size-tiny')
  get tiny(): boolean {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant(): boolean {
    return this.size === 'giant';
  }

  @HostBinding('class.shape-rectangle')
  get rectangle(): boolean {
    return this.shape === 'rectangle';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound(): boolean {
    return this.shape === 'semi-round';
  }

  @HostBinding('class.shape-round')
  get round(): boolean {
    return this.shape === 'round';
  }

  constructor(private domSanitizer: DomSanitizer) { }

  convertToBoolProperty(val: any): boolean {
    if (typeof val === 'string') {
      val = val.toLowerCase().trim();  
      return (val === 'true' || val === '');
    }  
    return !!val;
  }

  getInitials(): string {
    if (this.name) {
      const names = this.name.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}
