import { ApiHelper } from "../ApiHelper";
import type { PlanInterface, PlanItemInterface, PlanItemContentInterface, ExternalVenueRefInterface } from "../interfaces";
import type { VenuePlanItemsResponseInterface, VenueActionResponseInterface } from "../interfaces/Lessons";
import type { ContentProviderInterface } from "./ContentProvider";

export class LessonsContentProvider implements ContentProviderInterface {
  readonly providerId = "lessons";

  private lessonsUrl: string;

  constructor(lessonsUrl: string = "https://lessons.church") {
    this.lessonsUrl = lessonsUrl;
  }

  canHandle(plan: PlanInterface, planItem: PlanItemInterface): boolean {
    // Handles: action, addOn, lessonSection, and items with relatedId when plan has lesson
    const lessonTypes = ["action", "addOn", "lessonSection"];
    const hasLessonPlan = plan?.contentType === "venue" || plan?.contentType === "externalVenue";

    if (lessonTypes.includes(planItem.itemType) && planItem.relatedId) return true;
    if (planItem.itemType === "item" && planItem.relatedId && hasLessonPlan) return true;

    return false;
  }

  async fetchContent(
    plan: PlanInterface,
    planItems: PlanItemInterface[]
  ): Promise<Map<string, PlanItemContentInterface>> {
    const result = new Map<string, PlanItemContentInterface>();

    // Group by type for efficient batching
    const actions = planItems.filter(p => p.itemType === "action" && p.relatedId);
    const addOns = planItems.filter(p => p.itemType === "addOn" && p.relatedId);
    const sections = planItems.filter(p =>
      (p.itemType === "lessonSection" || p.itemType === "item") && p.relatedId
    );

    const externalRef = this.getExternalRef(plan);

    // Build embed URLs for each item
    for (const item of actions) {
      result.set(item.id, {
        provider: this.providerId,
        embedUrl: externalRef
          ? `${this.lessonsUrl}/embed/external/${externalRef.externalProviderId}/action/${item.relatedId}`
          : `${this.lessonsUrl}/embed/action/${item.relatedId}`
      });
    }

    for (const item of addOns) {
      result.set(item.id, {
        provider: this.providerId,
        embedUrl: externalRef
          ? `${this.lessonsUrl}/embed/external/${externalRef.externalProviderId}/addon/${item.relatedId}`
          : `${this.lessonsUrl}/embed/addon/${item.relatedId}`
      });
    }

    for (const item of sections) {
      result.set(item.id, {
        provider: this.providerId,
        embedUrl: externalRef
          ? `${this.lessonsUrl}/embed/external/${externalRef.externalProviderId}/section/${item.relatedId}`
          : `${this.lessonsUrl}/embed/section/${item.relatedId}`
      });
    }

    return result;
  }

  // Fetch venue plan items (for preview mode)
  async fetchVenuePlanItems(plan: PlanInterface): Promise<VenuePlanItemsResponseInterface> {
    if (!this.hasAssociatedLesson(plan)) return { items: [] };
    const externalRef = this.getExternalRef(plan);
    if (externalRef) return await ApiHelper.getAnonymous(`/externalProviders/${externalRef.externalProviderId}/venue/${externalRef.venueId}/planItems`, "LessonsApi");
    return await ApiHelper.getAnonymous(`/venues/public/planItems/${plan.contentId}`, "LessonsApi");
  }

  // Fetch venue actions (for expanding sections)
  async fetchVenueActions(plan: PlanInterface): Promise<VenueActionResponseInterface> {
    if (!this.hasAssociatedLesson(plan)) return { sections: [] };
    const externalRef = this.getExternalRef(plan);
    if (externalRef) return await ApiHelper.getAnonymous(`/externalProviders/${externalRef.externalProviderId}/venue/${externalRef.venueId}/actions`, "LessonsApi");
    return await ApiHelper.getAnonymous(`/venues/public/actions/${plan.contentId}`, "LessonsApi");
  }

  hasAssociatedLesson(plan: PlanInterface): boolean {
    return (plan?.contentType === "venue" || plan?.contentType === "externalVenue") && !!plan?.contentId;
  }

  isExternalVenue(plan: PlanInterface): boolean {
    return plan?.contentType === "externalVenue";
  }

  getExternalRef(plan: PlanInterface): ExternalVenueRefInterface | null {
    if (!this.isExternalVenue(plan) || !plan?.contentId) return null;
    try {
      return JSON.parse(plan.contentId);
    } catch {
      return null;
    }
  }

  getVenueId(plan: PlanInterface): string | null {
    if (!this.hasAssociatedLesson(plan)) return null;
    if (this.isExternalVenue(plan)) {
      return this.getExternalRef(plan)?.venueId || null;
    }
    return plan.contentId || null;
  }
}
