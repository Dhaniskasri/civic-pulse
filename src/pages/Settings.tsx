import { Shield, Bell, User, Lock, Database, Globe, Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your admin preferences and system configuration</p>
      </div>

      {[
        {
          title: "Admin Profile",
          icon: User,
          fields: [
            { label: "Full Name", value: "Admin User", type: "text" },
            { label: "Email", value: "admin@civicfix.gov", type: "email" },
            { label: "Admin ID", value: "ADM-001", type: "text", disabled: true },
          ],
        },
        {
          title: "Security",
          icon: Lock,
          fields: [
            { label: "Current Password", value: "", type: "password" },
            { label: "New Password", value: "", type: "password" },
            { label: "Confirm Password", value: "", type: "password" },
          ],
        },
        {
          title: "Notifications",
          icon: Bell,
          toggles: [
            { label: "Critical Alert Emails", checked: true },
            { label: "Daily Report Summary", checked: true },
            { label: "Cleaner Status Updates", checked: false },
            { label: "AI Insight Alerts", checked: true },
          ],
        },
        {
          title: "System",
          icon: Database,
          toggles: [
            { label: "Auto-assign Complaints", checked: false },
            { label: "AI Prediction Engine", checked: true },
            { label: "Real-time Alerts", checked: true },
          ],
        },
      ].map((section, si) => (
        <div key={si} className="bg-card rounded-xl card-shadow border border-border overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <section.icon className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
          </div>
          <div className="p-5 space-y-4">
            {section.fields?.map((f, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.value}
                  disabled={f.disabled}
                  className="w-full h-9 px-3 rounded-lg bg-muted/60 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            ))}
            {section.toggles?.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">{t.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={t.checked} className="sr-only peer" />
                  <div className="w-10 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5 after:shadow-sm" />
                </label>
              </div>
            ))}
          </div>
          {section.fields && (
            <div className="px-5 pb-5">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
