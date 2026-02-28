'use client';

import { useState } from 'react';

type LocalContact = {
  id: string;
  icon: string;
  name: string;
  phone: string;
  contactVia: 'call' | 'whatsapp' | 'both';
  note?: string;
  visible: boolean;
};

type HostProfile = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  availabilityHours: string;
  responseTime: string;
  role: 'host' | 'manager' | 'caretaker';
};

type ContactsTabContentProps = {
  localContacts: LocalContact[];
  setLocalContacts: (contacts: LocalContact[]) => void;
  isLocalContactModalOpen: boolean;
  setIsLocalContactModalOpen: (open: boolean) => void;
  editingLocalContact: LocalContact | null;
  setEditingLocalContact: (contact: LocalContact | null) => void;
};

export function ContactsTabContent({
  localContacts,
  setLocalContacts,
  isLocalContactModalOpen,
  setIsLocalContactModalOpen,
  editingLocalContact,
  setEditingLocalContact,
}: ContactsTabContentProps) {
  const [newLocalContact, setNewLocalContact] = useState<LocalContact>({
    id: '',
    icon: '📞',
    name: '',
    phone: '',
    contactVia: 'call',
    note: '',
    visible: true,
  });

  // Mock host profiles data (in real app, this would come from props or API)
  const hostProfiles: HostProfile[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      whatsapp: '+1 (555) 123-4567',
      availabilityHours: '9 AM - 9 PM',
      responseTime: 'Within 1 hour',
      role: 'host',
    },
    {
      id: '2',
      name: 'Mike Anderson',
      phone: '+1 (555) 987-6543',
      whatsapp: '+1 (555) 987-6543',
      availabilityHours: '24/7',
      responseTime: 'Within 30 mins',
      role: 'manager',
    },
  ];

  const [primaryContactId, setPrimaryContactId] = useState<string>('');
  const [additionalContactIds, setAdditionalContactIds] = useState<string[]>([]);

  // Host Profile Modal State
  const [isHostProfileModalOpen, setIsHostProfileModalOpen] = useState(false);
  const [newHostProfile, setNewHostProfile] = useState<HostProfile>({
    id: '',
    name: '',
    phone: '',
    whatsapp: '',
    availabilityHours: '',
    responseTime: '',
    role: 'host',
  });

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

  const handleToggleAdditionalContact = (profileId: string) => {
    if (additionalContactIds.includes(profileId)) {
      setAdditionalContactIds(additionalContactIds.filter(id => id !== profileId));
    } else {
      setAdditionalContactIds([...additionalContactIds, profileId]);
    }
  };

  const handleSaveHostProfile = () => {
    if (!newHostProfile.name.trim() || !newHostProfile.phone.trim()) {
      alert('Please fill in required fields: Name and Phone');
      return;
    }

    // In a real app, this would save to the database
    // For now, we'll just close the modal
    // TODO: Add the new profile to hostProfiles array
    console.log('New host profile created:', newHostProfile);

    setIsHostProfileModalOpen(false);
    setNewHostProfile({
      id: '',
      name: '',
      phone: '',
      whatsapp: '',
      availabilityHours: '',
      responseTime: '',
      role: 'host',
    });
  };

  const handleSaveLocalContact = () => {
    if (editingLocalContact) {
      setLocalContacts(
        localContacts.map((contact) =>
          contact.id === editingLocalContact.id ? newLocalContact : contact
        )
      );
    } else {
      setLocalContacts([
        ...localContacts,
        { ...newLocalContact, id: Date.now().toString() },
      ]);
    }
    setIsLocalContactModalOpen(false);
    setNewLocalContact({
      id: '',
      icon: '📞',
      name: '',
      phone: '',
      contactVia: 'call',
      note: '',
      visible: true,
    });
    setEditingLocalContact(null);
  };

  const handleEditLocalContact = (contact: LocalContact) => {
    setEditingLocalContact(contact);
    setNewLocalContact(contact);
    setIsLocalContactModalOpen(true);
  };

  const handleDeleteLocalContact = (id: string) => {
    setLocalContacts(localContacts.filter((contact) => contact.id !== id));
  };

  const handleToggleLocalContactVisibility = (id: string) => {
    setLocalContacts(
      localContacts.map((contact) =>
        contact.id === id ? { ...contact, visible: !contact.visible } : contact
      )
    );
  };

  const handleReorderLocalContact = (id: string, direction: 'up' | 'down') => {
    const index = localContacts.findIndex((contact) => contact.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === localContacts.length - 1)
    )
      return;

    const newContacts = [...localContacts];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newContacts[index], newContacts[newIndex]] = [
      newContacts[newIndex],
      newContacts[index],
    ];
    setLocalContacts(newContacts);
  };

  const primaryContact = hostProfiles.find(p => p.id === primaryContactId);
  const availableAdditionalProfiles = hostProfiles.filter(p => p.id !== primaryContactId);

  return (
    <div className="space-y-6">
      {/* Property Contacts Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-1">
            Property Contacts
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose contacts from your host profiles to display to guests
          </p>
        </div>

        <div className="space-y-6">
          {/* Primary Contact */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Primary Contact</h3>
                <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded-full font-medium">Required</span>
              </div>
              <button
                onClick={() => setIsHostProfileModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Profile
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This contact will be shown prominently to guests as the main point of contact
            </p>

            {primaryContactId && primaryContact ? (
              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{getRoleIcon(primaryContact.role)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{primaryContact.name}</h4>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleBadgeColor(primaryContact.role)}`}>
                        {primaryContact.role.charAt(0).toUpperCase() + primaryContact.role.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{primaryContact.phone}</span>
                      <span>•</span>
                      <span>{primaryContact.availabilityHours}</span>
                      <span>•</span>
                      <span>{primaryContact.responseTime}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPrimaryContactId('')}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Remove primary contact"
                  >
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border-2 border-dashed border-border p-6">
                <p className="text-sm text-muted-foreground mb-4 text-center">Select a primary contact from your host profiles</p>
                <div className="space-y-2">
                  {hostProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => setPrimaryContactId(profile.id)}
                      className="w-full bg-background hover:bg-muted rounded-lg p-3 border border-border transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">{getRoleIcon(profile.role)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-medium text-foreground">{profile.name}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleBadgeColor(profile.role)}`}>
                              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{profile.phone}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Contacts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-foreground">Additional Contacts</h3>
              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full font-medium">Optional</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Add other contacts that guests can reach out to for different needs
            </p>

            {availableAdditionalProfiles.length === 0 ? (
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {primaryContactId
                    ? "No other host profiles available. All profiles are either selected or you need to create more profiles."
                    : "Please select a primary contact first"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {availableAdditionalProfiles.map((profile) => {
                  const isSelected = additionalContactIds.includes(profile.id);
                  return (
                    <div
                      key={profile.id}
                      className={`bg-card rounded-lg p-4 border transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleAdditionalContact(profile.id)}
                          className="w-5 h-5 rounded border-input text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                        />
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">{getRoleIcon(profile.role)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{profile.name}</h4>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleBadgeColor(profile.role)}`}>
                              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span>{profile.phone}</span>
                            <span>•</span>
                            <span>{profile.availabilityHours}</span>
                            <span>•</span>
                            <span>{profile.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {additionalContactIds.length > 0 && (
              <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{additionalContactIds.length}</span> additional {additionalContactIds.length === 1 ? 'contact' : 'contacts'} selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local Contacts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Local Contacts
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Essential local contacts for your guests
            </p>
          </div>
          <button
            onClick={() => setIsLocalContactModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            + Add Contact
          </button>
        </div>

        <div className="space-y-2">
          {localContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
            >
              <button
                onClick={() =>
                  handleToggleLocalContactVisibility(contact.id)
                }
                className={`text-2xl transition-opacity ${
                  contact.visible ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {contact.visible ? '👁️' : '👁️‍🗨️'}
              </button>
              <span className="text-2xl">{contact.icon}</span>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
                {contact.note && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {contact.note}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReorderLocalContact(contact.id, 'up')}
                  className="p-1 hover:bg-muted rounded"
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
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleReorderLocalContact(contact.id, 'down')}
                  className="p-1 hover:bg-muted rounded"
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleEditLocalContact(contact)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteLocalContact(contact.id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
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
          ))}
        </div>
      </div>

      {/* Local Contact Modal */}
      {isLocalContactModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                {editingLocalContact ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              <button
                onClick={() => {
                  setIsLocalContactModalOpen(false);
                  setNewLocalContact({
                    id: '',
                    icon: '📞',
                    name: '',
                    phone: '',
                    contactVia: 'call',
                    note: '',
                    visible: true,
                  });
                  setEditingLocalContact(null);
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

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Icon
                </label>
                <input
                  type="text"
                  value={newLocalContact.icon}
                  onChange={(e) =>
                    setNewLocalContact({
                      ...newLocalContact,
                      icon: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="📞"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newLocalContact.name}
                  onChange={(e) =>
                    setNewLocalContact({
                      ...newLocalContact,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Emergency Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={newLocalContact.phone}
                  onChange={(e) =>
                    setNewLocalContact({
                      ...newLocalContact,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Via
                </label>
                <select
                  value={newLocalContact.contactVia}
                  onChange={(e) =>
                    setNewLocalContact({
                      ...newLocalContact,
                      contactVia: e.target.value as 'call' | 'whatsapp' | 'both',
                    })
                  }
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="call">Call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Note
                </label>
                <textarea
                  value={newLocalContact.note}
                  onChange={(e) =>
                    setNewLocalContact({
                      ...newLocalContact,
                      note: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Additional information..."
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsLocalContactModalOpen(false);
                  setNewLocalContact({
                    id: '',
                    icon: '📞',
                    name: '',
                    phone: '',
                    contactVia: 'call',
                    note: '',
                    visible: true,
                  });
                  setEditingLocalContact(null);
                }}
                className="px-4 py-2 border border-input rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLocalContact}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                {editingLocalContact ? 'Save Changes' : 'Add Contact'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Host Profile Modal */}
      {isHostProfileModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                Create New Host Profile
              </h3>
              <button
                onClick={() => {
                  setIsHostProfileModalOpen(false);
                  setNewHostProfile({
                    id: '',
                    name: '',
                    phone: '',
                    whatsapp: '',
                    availabilityHours: '',
                    responseTime: '',
                    role: 'host',
                  });
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newHostProfile.name}
                  onChange={(e) => setNewHostProfile({ ...newHostProfile, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={newHostProfile.phone}
                  onChange={(e) => setNewHostProfile({ ...newHostProfile, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={newHostProfile.whatsapp}
                  onChange={(e) => setNewHostProfile({ ...newHostProfile, whatsapp: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Availability Hours
                </label>
                <input
                  type="text"
                  value={newHostProfile.availabilityHours}
                  onChange={(e) => setNewHostProfile({ ...newHostProfile, availabilityHours: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="9 AM - 9 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Response Time
                </label>
                <input
                  type="text"
                  value={newHostProfile.responseTime}
                  onChange={(e) => setNewHostProfile({ ...newHostProfile, responseTime: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Within 1 hour"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role
                </label>
                <select
                  value={newHostProfile.role}
                  onChange={(e) => setNewHostProfile({ ...newHostProfile, role: e.target.value as 'host' | 'manager' | 'caretaker' })}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="host">Host</option>
                  <option value="manager">Manager</option>
                  <option value="caretaker">Caretaker</option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsHostProfileModalOpen(false);
                  setNewHostProfile({
                    id: '',
                    name: '',
                    phone: '',
                    whatsapp: '',
                    availabilityHours: '',
                    responseTime: '',
                    role: 'host',
                  });
                }}
                className="px-4 py-2 border border-input rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHostProfile}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
