'use client';

import { useState } from 'react';

type HostProfile = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  availabilityHours: string;
  responseTime: string;
  role: 'host' | 'manager' | 'caretaker';
  guidebookCount: number;
};

type HostProfilesTabProps = {
  hostProfiles: HostProfile[];
  setHostProfiles: (profiles: HostProfile[]) => void;
};

export function HostProfilesTab({ hostProfiles, setHostProfiles }: HostProfilesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<HostProfile | null>(null);
  const [newProfile, setNewProfile] = useState<HostProfile>({
    id: '',
    name: '',
    phone: '',
    whatsapp: '',
    availabilityHours: '',
    responseTime: '',
    role: 'host',
    guidebookCount: 0,
  });

  const handleSaveProfile = () => {
    if (editingProfile) {
      setHostProfiles(
        hostProfiles.map((profile) =>
          profile.id === editingProfile.id ? { ...newProfile, guidebookCount: profile.guidebookCount } : profile
        )
      );
    } else {
      setHostProfiles([
        ...hostProfiles,
        { ...newProfile, id: Date.now().toString(), guidebookCount: 1 },
      ]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewProfile({
      id: '',
      name: '',
      phone: '',
      whatsapp: '',
      availabilityHours: '',
      responseTime: '',
      role: 'host',
      guidebookCount: 0,
    });
    setEditingProfile(null);
  };

  const handleEditProfile = (profile: HostProfile) => {
    setEditingProfile(profile);
    setNewProfile(profile);
    setIsModalOpen(true);
  };

  const handleDeleteProfile = (id: string) => {
    if (confirm('Are you sure you want to delete this host profile?')) {
      setHostProfiles(hostProfiles.filter((profile) => profile.id !== id));
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'host':
        return 'bg-primary/10 text-primary';
      case 'manager':
        return 'bg-accent/10 text-accent';
      case 'caretaker':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'host':
        return '🏠';
      case 'manager':
        return '👔';
      case 'caretaker':
        return '🔧';
      default:
        return '👤';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Host Profiles</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your host profiles and their assignments
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Profile
        </button>
      </div>

      {/* Host Profiles List */}
      <div className="space-y-3">
        {hostProfiles.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl border border-border">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No host profiles yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first host profile to get started
            </p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Add Your First Profile
            </button>
          </div>
        ) : (
          hostProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-card rounded-2xl p-5 border border-border hover:shadow-md transition-all"
            >
              {/* Profile Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{getRoleIcon(profile.role)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{profile.name}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleBadgeColor(profile.role)}`}>
                      {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{profile.guidebookCount} {profile.guidebookCount === 1 ? 'guidebook' : 'guidebooks'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditProfile(profile)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteProfile(profile.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">Phone</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{profile.phone || 'Not set'}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{profile.whatsapp || 'Not set'}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">Availability</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{profile.availabilityHours || 'Not set'}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">Response Time</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{profile.responseTime || 'Not set'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-semibold text-foreground">
                {editingProfile ? 'Edit Host Profile' : 'Add New Host Profile'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={newProfile.phone}
                    onChange={(e) => setNewProfile({ ...newProfile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={newProfile.whatsapp}
                    onChange={(e) => setNewProfile({ ...newProfile, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role *
                </label>
                <select
                  value={newProfile.role}
                  onChange={(e) => setNewProfile({ ...newProfile, role: e.target.value as 'host' | 'manager' | 'caretaker' })}
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="host">Host</option>
                  <option value="manager">Manager</option>
                  <option value="caretaker">Caretaker</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Availability Hours
                  </label>
                  <input
                    type="text"
                    value={newProfile.availabilityHours}
                    onChange={(e) => setNewProfile({ ...newProfile, availabilityHours: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 9 AM - 6 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Response Time
                  </label>
                  <input
                    type="text"
                    value={newProfile.responseTime}
                    onChange={(e) => setNewProfile({ ...newProfile, responseTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Within 30 mins"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-5 py-2.5 border border-input rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={!newProfile.name || !newProfile.phone}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingProfile ? 'Save Changes' : 'Add Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
