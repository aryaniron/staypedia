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
  guidebookIds: string[];
};

type HostProfilesTabProps = {
  hostProfiles: HostProfile[];
  setHostProfiles: (profiles: HostProfile[]) => void;
};

export function HostProfilesTab({
  hostProfiles,
  setHostProfiles,
}: HostProfilesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<HostProfile | null>(
    null
  );
  const [newProfile, setNewProfile] = useState<HostProfile>({
    id: '',
    name: '',
    phone: '',
    whatsapp: '',
    availabilityHours: '',
    responseTime: '',
    role: 'host',
    guidebookIds: [],
  });

  // Mock guidebook data for display
  const guidebooks = [
    { id: '1', name: 'Cozy Mountain Cabin' },
    { id: '2', name: 'Beach House Retreat' },
    { id: '3', name: 'Downtown Loft' },
  ];

  const handleSaveProfile = () => {
    if (editingProfile) {
      setHostProfiles(
        hostProfiles.map((profile) =>
          profile.id === editingProfile.id ? newProfile : profile
        )
      );
    } else {
      setHostProfiles([
        ...hostProfiles,
        { ...newProfile, id: Date.now().toString() },
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
      guidebookIds: [],
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
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Host Profiles
            </h2>
            <p className="text-muted-foreground">
              Manage your host profiles and their guidebook assignments
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="px-5 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Host Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {hostProfiles.length}
          </p>
          <p className="text-sm text-muted-foreground">Total Host Profiles</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {hostProfiles.reduce(
              (total, profile) => total + profile.guidebookIds.length,
              0
            )}
          </p>
          <p className="text-sm text-muted-foreground">Total Assignments</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {hostProfiles.filter((p) => p.role === 'host').length}
          </p>
          <p className="text-sm text-muted-foreground">Active Hosts</p>
        </div>
      </div>

      {/* Host Profiles List */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          All Profiles
        </h3>
        {hostProfiles.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No host profiles yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first host profile to get started
            </p>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              Add Your First Profile
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {hostProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all"
              >
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">
                      {getRoleIcon(profile.role)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-foreground">
                        {profile.name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getRoleBadgeColor(
                          profile.role
                        )}`}
                      >
                        {profile.role.charAt(0).toUpperCase() +
                          profile.role.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>
                        Linked to {profile.guidebookIds.length}{' '}
                        {profile.guidebookIds.length === 1
                          ? 'guidebook'
                          : 'guidebooks'}
                      </span>
                    </div>
                    {profile.guidebookIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {profile.guidebookIds.map((id) => {
                          const guidebook = guidebooks.find((g) => g.id === id);
                          return guidebook ? (
                            <span
                              key={id}
                              className="text-xs px-2 py-1 bg-primary/5 text-primary rounded-md border border-primary/20"
                            >
                              {guidebook.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditProfile(profile)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Edit profile"
                    >
                      <svg
                        className="w-4 h-4 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                      title="Delete profile"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Profile Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg
                        className="w-3.5 h-3.5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <p className="text-xs text-muted-foreground">Phone</p>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {profile.phone || 'Not set'}
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg
                        className="w-3.5 h-3.5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {profile.whatsapp || 'Not set'}
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg
                        className="w-3.5 h-3.5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-xs text-muted-foreground">
                        Availability
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {profile.availabilityHours || 'Not set'}
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg
                        className="w-3.5 h-3.5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <p className="text-xs text-muted-foreground">
                        Response Time
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {profile.responseTime || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
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
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, whatsapp: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  onChange={(e) =>
                    setNewProfile({
                      ...newProfile,
                      role: e.target.value as 'host' | 'manager' | 'caretaker',
                    })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="host">🏠 Host</option>
                  <option value="manager">👔 Manager</option>
                  <option value="caretaker">🔧 Caretaker</option>
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
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        availabilityHours: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        responseTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Within 30 mins"
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Assign to Guidebooks
                </label>
                <div className="space-y-2 bg-muted/30 rounded-xl p-4">
                  {guidebooks.map((guidebook) => (
                    <label key={guidebook.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newProfile.guidebookIds.includes(guidebook.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewProfile({
                              ...newProfile,
                              guidebookIds: [...newProfile.guidebookIds, guidebook.id],
                            });
                          } else {
                            setNewProfile({
                              ...newProfile,
                              guidebookIds: newProfile.guidebookIds.filter((id) => id !== guidebook.id),
                            });
                          }
                        }}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{guidebook.name}</span>
                    </label>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-5 py-2.5 border border-input rounded-xl hover:bg-muted transition-colors font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={!newProfile.name || !newProfile.phone}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
