import { Component, Input, OnInit } from "@angular/core";
import { Notification } from "../interfaces/notification.interface";
import { DateTime } from "luxon";
import { trackById } from "../../../../utils/track-by";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icChevronRight from "@iconify/icons-ic/twotone-chevron-right";
import icNotificationsOff from "@iconify/icons-ic/twotone-notifications-off";
import icClearAll from "@iconify/icons-ic/twotone-clear-all";
import icShoppingBasket from "@iconify/icons-ic/twotone-shopping-basket";
import icAccountCircle from "@iconify/icons-ic/twotone-account-circle";
import icInsertChart from "@iconify/icons-ic/twotone-insert-chart";
import icCheckCircle from "@iconify/icons-ic/twotone-check-circle";
import icDescription from "@iconify/icons-ic/twotone-description";
import icFeedback from "@iconify/icons-ic/twotone-feedback";
import icVerifiedUser from "@iconify/icons-ic/twotone-verified-user";
import icFileCopy from "@iconify/icons-ic/twotone-file-copy";
import { PopoverRef } from "src/@vex/components/popover/popover-ref";
import { DataService } from "src/app/providers/data.service";

const NOTI_ICONS = {
  NEW_OFFER: { icon: icShoppingBasket, colorClass: "text-primary" },
  SENT_CONTRACT_ACCEPTED: { icon: icAccountCircle, colorClass: "text-orange" },
  SENT_OFFER_REFECTED: { icon: icInsertChart, colorClass: "text-purple" },
  PACKAGE_SHIPPED: { icon: icCheckCircle, colorClass: "text-green" },
  SUBMISSION_REVIEW_NEEDED: { icon: icDescription, colorClass: "text-primary" },
  SUBMISSION_REVIEW_DONE: { icon: icFeedback, colorClass: "text-orange" },
  SOCIAL_MEDIA_CONTENT_UPLOADED: {
    icon: icVerifiedUser,
    colorClass: "text-green",
  },
  PAYMENT_RELEASED: { icon: icFileCopy, colorClass: "text-amber" },
};

@Component({
  selector: "vex-toolbar-notifications-dropdown",
  templateUrl: "./toolbar-notifications-dropdown.component.html",
  styleUrls: ["./toolbar-notifications-dropdown.component.scss"],
})
export class ToolbarNotificationsDropdownComponent implements OnInit {
  @Input() notifications = [];

  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icClearAll = icClearAll;
  icNotificationsOff = icNotificationsOff;
  trackById = trackById;
  icons = NOTI_ICONS;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.notifications$.subscribe((res: Notification[]) => {
      this.notifications = res;
    });
  }

  onClickAction(id: string) {
    this.dataService.setNotificationAction(id);
  }
}
