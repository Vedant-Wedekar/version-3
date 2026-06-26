import { Star, Clock } from "lucide-react";

export default function AdminTestimonials() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Testimonials</h1>
        <p className="mt-1 text-sm text-slate-500">
          Customer reviews and approvals
        </p>
      </div>

      <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50">
          <Clock className="h-6 w-6 text-amber-600" />
        </div>
        <h2 className="font-display text-xl font-bold text-slate-900">Coming Soon</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          The testimonial submission system is being built. Once users can submit reviews
          after their trips, you'll be able to approve, edit, and feature them here.
        </p>

        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-slate-50 p-4 text-left text-xs">
          <p className="font-bold text-slate-900">When ready, you'll have:</p>
          <ul className="mt-2 space-y-1.5 text-slate-600">
            <li className="flex items-start gap-2">
              <Star className="mt-0.5 h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
              Approval queue for new submissions
            </li>
            <li className="flex items-start gap-2">
              <Star className="mt-0.5 h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
              Edit text and ratings before approving
            </li>
            <li className="flex items-start gap-2">
              <Star className="mt-0.5 h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
              Feature select testimonials on the homepage
            </li>
            <li className="flex items-start gap-2">
              <Star className="mt-0.5 h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
              Reply to customer reviews
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}