'use client';

import { useState } from 'react';

type Recommendation = {
  id: string;
  name: string;
  categoryType?: 'restaurant' | 'experience' | 'attraction' | 'photo-spot' | 'general';
  visible: boolean;
  specialty?: string;
  priceRange?: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  distance?: string;
  phone?: string;
  contactType?: 'call' | 'whatsapp' | 'both';
  openingHours?: string;
  description?: string;
  pricePerPerson?: string;
  duration?: string;
  bestTime?: string;
  contactName?: string;
  contactInfo?: string;
  contactMethod?: 'call' | 'whatsapp' | 'website';
  hostTip?: string;
  photo?: string;
  entryFee?: string;
  howToAccess?: string;
  proTip?: string;
};

type RecommendationsTabContentProps = {
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;
  isRecommendationModalOpen: boolean;
  setIsRecommendationModalOpen: (open: boolean) => void;
  editingRecommendation: Recommendation | null;
  setEditingRecommendation: (recommendation: Recommendation | null) => void;
};

export function RecommendationsTabContent({
  recommendations,
  setRecommendations,
  isRecommendationModalOpen,
  setIsRecommendationModalOpen,
  editingRecommendation,
  setEditingRecommendation,
}: RecommendationsTabContentProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Recommendations</h2>
        <button
          onClick={() => {
            setEditingRecommendation({
              id: Date.now().toString(),
              name: '',
              visible: true,
              categoryType: 'general',
            });
            setIsRecommendationModalOpen(true);
          }}
          className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Add Recommendation
        </button>
      </div>

      {/* Recommendations List */}
      {recommendations.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No recommendations yet. Add your first recommendation to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((item, index) => (
            <div
              key={item.id}
              className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Reorder buttons */}
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                  <button
                    onClick={() => {
                      if (index > 0) {
                        const newRecommendations = [...recommendations];
                        [newRecommendations[index - 1], newRecommendations[index]] = [
                          newRecommendations[index],
                          newRecommendations[index - 1],
                        ];
                        setRecommendations(newRecommendations);
                      }
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => {
                      if (index < recommendations.length - 1) {
                        const newRecommendations = [...recommendations];
                        [newRecommendations[index], newRecommendations[index + 1]] = [
                          newRecommendations[index + 1],
                          newRecommendations[index],
                        ];
                        setRecommendations(newRecommendations);
                      }
                    }}
                    disabled={index === recommendations.length - 1}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  >
                    ↓
                  </button>
                </div>

                {/* Item Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {item.categoryType && (
                        <span className="inline-block px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground mt-1 capitalize">
                          {item.categoryType}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Visibility toggle */}
                      <button
                        onClick={() => {
                          const newRecommendations = recommendations.map((r) =>
                            r.id === item.id ? { ...r, visible: !r.visible } : r
                          );
                          setRecommendations(newRecommendations);
                        }}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title={item.visible ? 'Hide from guests' : 'Show to guests'}
                      >
                        <svg
                          className={`w-4 h-4 ${item.visible ? 'text-foreground' : 'text-muted-foreground'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {item.visible ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          )}
                        </svg>
                      </button>
                      {/* Edit button */}
                      <button
                        onClick={() => {
                          setEditingRecommendation({ ...item });
                          setIsRecommendationModalOpen(true);
                        }}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      {/* Delete button */}
                      <button
                        onClick={() => {
                          setRecommendations(recommendations.filter((r) => r.id !== item.id));
                        }}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  {item.description && <p className="text-sm text-muted-foreground mb-2">{item.description}</p>}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {item.distance && <span>📍 {item.distance}</span>}
                    {item.bestTime && <span>🕐 {item.bestTime}</span>}
                    {item.pricePerPerson && <span>💰 {item.pricePerPerson}</span>}
                    {item.priceRange && <span>💰 {item.priceRange}</span>}
                  </div>
                  {item.hostTip && (
                    <div className="mt-2 bg-accent/10 border-l-2 border-accent rounded px-3 py-2">
                      <p className="text-xs text-foreground">
                        <span className="font-medium">Host Tip:</span> {item.hostTip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECOMMENDATION MODAL */}
      {isRecommendationModalOpen && editingRecommendation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6">
              <h3 className="text-xl font-semibold text-foreground">
                {recommendations.find((r) => r.id === editingRecommendation.id) ? 'Edit Recommendation' : 'Add Recommendation'}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={editingRecommendation.name}
                  onChange={(e) => setEditingRecommendation({ ...editingRecommendation, name: e.target.value })}
                  placeholder="e.g. The Spice Route"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={editingRecommendation.description || ''}
                  onChange={(e) => setEditingRecommendation({ ...editingRecommendation, description: e.target.value })}
                  placeholder="Brief description..."
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {/* Distance / Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Distance / Location</label>
                <input
                  type="text"
                  value={editingRecommendation.distance || ''}
                  onChange={(e) => setEditingRecommendation({ ...editingRecommendation, distance: e.target.value })}
                  placeholder="e.g. 1.2 km (15 min walk)"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Best Time to Visit */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Best Time to Visit</label>
                <input
                  type="text"
                  value={editingRecommendation.bestTime || ''}
                  onChange={(e) => setEditingRecommendation({ ...editingRecommendation, bestTime: e.target.value })}
                  placeholder="e.g. Morning (8 AM - 11 AM)"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                <input
                  type="text"
                  value={editingRecommendation.pricePerPerson || editingRecommendation.priceRange || ''}
                  onChange={(e) =>
                    setEditingRecommendation({
                      ...editingRecommendation,
                      pricePerPerson: e.target.value,
                    })
                  }
                  placeholder="e.g. ₹500 or ₹₹₹"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={editingRecommendation.phone || editingRecommendation.contactInfo || ''}
                  onChange={(e) =>
                    setEditingRecommendation({
                      ...editingRecommendation,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Host Tip */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Host Tip</label>
                <textarea
                  value={editingRecommendation.hostTip || ''}
                  onChange={(e) => setEditingRecommendation({ ...editingRecommendation, hostTip: e.target.value })}
                  placeholder="What makes this place special?"
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="font-medium text-foreground">Visible to Guests</div>
                  <div className="text-sm text-muted-foreground">Show this recommendation in the guidebook</div>
                </div>
                <button
                  onClick={() =>
                    setEditingRecommendation({ ...editingRecommendation, visible: !editingRecommendation.visible })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingRecommendation.visible ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingRecommendation.visible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsRecommendationModalOpen(false);
                  setEditingRecommendation(null);
                }}
                className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingRecommendation.name.trim()) return;
                  const exists = recommendations.find((r) => r.id === editingRecommendation.id);
                  if (exists) {
                    setRecommendations(
                      recommendations.map((r) => (r.id === editingRecommendation.id ? editingRecommendation : r))
                    );
                  } else {
                    setRecommendations([...recommendations, editingRecommendation]);
                  }
                  setIsRecommendationModalOpen(false);
                  setEditingRecommendation(null);
                }}
                disabled={!editingRecommendation.name.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {recommendations.find((r) => r.id === editingRecommendation.id) ? 'Save Changes' : 'Add Recommendation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
